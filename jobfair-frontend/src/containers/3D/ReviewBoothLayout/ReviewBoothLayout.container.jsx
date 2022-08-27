import { BasicMesh } from '../../../components/3D/ThreeJSBaseComponent/ChildMesh.component';
import { BoothLayoutType } from '../../../constants/LayoutConstant';
import { CameraControls } from '../../../components/3D/ThreeJSBaseComponent/CameraControls.component';
import { Canvas } from '@react-three/fiber';
import { InputLayoutNameForm } from '../DecorateBooth/Decorate3DBooth.container';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { Modal, Typography, notification } from 'antd';
import { PATH_COMPANY_EMPLOYEE } from '../../../constants/Paths/Path';
import { ReviewDecorateControlButtonGroup } from '../../../components/customized-components/DecoratedBoothTool/ReviewButtons/ReviewDecorateControlButtonGroup.component';
import { Stage } from '@react-three/drei';
import {
  addVideoTexture,
  b64toBlob,
  extractTexture,
  fixTextureOffset,
  loadGLBModel,
  parseModel
} from '../../../utils/ThreeJS/threeJSUtil';
import { getCompanyBoothLatestLayout } from '../../../services/jobhub-api/CompanyBoothLayoutControllerService';
import {
  getMyBoothLayoutById,
  saveDecoratedBoothIntoMyBoothLayout,
  saveLayoutVideoWithFileIntoMyBoothLayout,
  saveLayoutVideoWithUrlIntoMyBoothLayout
} from '../../../services/jobhub-api/DecoratorBoothLayoutController';
import { notify } from '../../../utils/toastutil';
import { useHistory } from 'react-router-dom';
import MyBoothLayoutListContainer from '../../MyBoothLayoutList/MyBoothLayoutList.container';
import React, { Suspense, useEffect, useRef, useState } from 'react';

export const ReviewBoothLayoutContainer = ({ id, type, isPage = false }) => {
  const history = useHistory();
  const [boothItems, setBoothItems] = useState();
  const [notYetDesign, setNotYetDesign] = useState(false);
  const [myLayoutVisibility, setMyLayoutVisibility] = useState(false);
  const meshGroupRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const companyBoothLayoutVideos = {};
    let url;
    try {
      switch (type) {
        //check Layout.js constant to know the type usage
        case BoothLayoutType.GENERAL: {
          const response = await getCompanyBoothLatestLayout(id);
          url = response.data.url;
          response.data.companyBoothLayoutVideos?.forEach((data) => {
            companyBoothLayoutVideos[data.itemName] = data.url;
          });
          break;
        }
        case BoothLayoutType.DECORATOR: {
          const response = await getMyBoothLayoutById(id);
          url = response.data.url;
          response.data.companyBoothLayoutVideos?.forEach((data) => {
            companyBoothLayoutVideos[data.itemName] = data.url;
          });
          break;
        }
        default:
          throw new Error('Invalid type');
      }
    } catch (err) {
      if (err.response.status === 404 && type === BoothLayoutType.GENERAL) {
        setNotYetDesign(true);
        return;
      }

      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
    //parse file and get items
    const glb = await loadGLBModel(url);
    const result = glb.scene.children;
    for (const mesh of result) {
      addVideoTexture(mesh, companyBoothLayoutVideos);
      fixTextureOffset(mesh);
    }
    setBoothItems(result);
  };

  const openBoothModal = () => {
    setMyLayoutVisibility(true);
  };

  const onClose = () => {
    const url = PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE;
    history.push(url);
  };

  const uploadVideo = async (textureObj, layoutId, itemName) => {
    if (textureObj.texture.image.src.substring(0, 4) !== 'data') {
      return saveLayoutVideoWithUrlIntoMyBoothLayout({
        layoutId,
        itemName,
        url: textureObj.texture.image.src
      });
    }
    const b64data = textureObj.texture.image.src.substring(15 + 7);
    const blob = await b64toBlob(b64data, 'video/mp4');
    const formData = new FormData();
    formData.append('layoutId', layoutId);
    formData.append('file', blob);
    formData.append('itemName', itemName);
    return saveLayoutVideoWithFileIntoMyBoothLayout(formData);
  };

  const saveHandle = async (isSaveInMyBoothLayout, layoutName) => {
    let sceneNode = meshGroupRef.current.parent;
    while (sceneNode.type !== 'Scene') sceneNode = sceneNode.parent;

    const sceneNodeCopy = sceneNode.clone(false);
    sceneNodeCopy.name = 'Scene';
    sceneNodeCopy.clear();
    const copyNode = meshGroupRef.current.children.map((mesh) => mesh.clone());

    //extract video texture and push children to copyNode
    let textureList = [];
    copyNode.forEach((mesh) => {
      sceneNodeCopy.children.push(mesh);
      textureList = [...textureList, ...extractTexture(mesh, mesh.name)];
    });

    //upload model layout
    const glbData = await parseModel(sceneNodeCopy);
    const formData = new FormData();
    formData.append('companyBoothId', id);
    formData.append('file', glbData);
    let response;
    formData.append('name', layoutName);
    // eslint-disable-next-line prefer-const
    response = await saveDecoratedBoothIntoMyBoothLayout(formData);

    //upload video
    const videoUploadPromises = [];
    for (const textureObj of textureList) {
      const promise = uploadVideo(textureObj, response.data.id, textureObj.meshName);
      videoUploadPromises.push(promise);
    }
    await Promise.all(videoUploadPromises);
    notify(2, 'Save successfully');
  };

  const controlButtonsProps = {
    openBoothModal,
    saveIntoMyBoothLayout: () => {
      Modal.info({
        centered: true,
        okButtonProps: { style: { display: 'none' } },
        title: 'Your layout name',
        content: (
          <>
            <InputLayoutNameForm saveHandle={saveHandle} />
          </>
        )
      });
    },
    onClose,
    display: isPage
  };

  if (boothItems === undefined) {
    if (type === BoothLayoutType.GENERAL && notYetDesign) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Typography.Title level={1}>This booth has no design</Typography.Title>
        </div>
      );
    }

    return <LoadingComponent />;
  }

  return (
    <>
      <MyBoothLayoutListContainer
        setMyLayoutVisibility={setMyLayoutVisibility}
        myLayoutVisibility={myLayoutVisibility}
        choosable={false}
        deletable={true}
      />
      <ReviewDecorateControlButtonGroup {...controlButtonsProps} />
      <Suspense fallback={<LoadingComponent />}>
        <Canvas dpr={[1, 2]} camera={{ fov: 40, zoom: 1.2, position: [-1, 1, -1] }}>
          <CameraControls />
          <Stage adjustCamera={false} preset='rembrandt' intensity={0.4} environment='city' contactShadow={false}>
            <group dispose={null} ref={meshGroupRef}>
              {boothItems.map((mesh) => (
                <BasicMesh key={mesh.uuid} mesh={mesh} />
              ))}
            </group>
          </Stage>
        </Canvas>
      </Suspense>
    </>
  );
};
