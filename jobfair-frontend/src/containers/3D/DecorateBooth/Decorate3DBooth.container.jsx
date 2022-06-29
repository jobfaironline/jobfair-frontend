import { Button, Form, Input, Modal, notification } from 'antd';
import { ControlButtonGroup } from '../../../components/customized-components/DecoratedBoothTool/ControlButton/ControlButtonGroup.component';
import { DecorateBooth3DItemMenuContainer } from '../../SampleItemMenu/DecorateBooth3DItemMenu.container';
import { DecorateBoothCanvas } from '../../../components/3D/DecorateBooth/DeoratedBoothCanvas/DecorateBoothCanvas.component';
import { DecoratedBoothSideBarContainer } from './DecorateBoothSideBar.container';
import { GENERIC_BOOTH_LAYOUT_URL } from '../../../constants/3DConst';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { ModeConstant } from '../../../constants/AppConst';
import { PATH } from '../../../constants/Paths/Path';
import { Stats } from '@react-three/drei';
import { ToastContainer } from 'react-toastify';
import {
  addVideoTexture,
  b64toBlob,
  extractTexture,
  fixTextureOffset,
  loadGLBModel,
  moveModelDown,
  moveModelUp,
  parseModel,
  rotateModelLeft,
  rotateModelRight
} from '../../../utils/ThreeJS/threeJSUtil';
import { decorateBoothAction } from '../../../redux-flow/decorateBooth/decorate-booth-slice';
import { generatePath, useHistory } from 'react-router-dom';
import {
  getCompanyBoothLatestLayout,
  saveDecoratedBooth,
  saveLayoutVideoWithFile,
  saveLayoutVideoWithUrl
} from '../../../services/jobhub-api/CompanyBoothLayoutControllerService';
import {
  getMyBoothLayoutById,
  saveDecoratedBoothIntoMyBoothLayout,
  saveLayoutVideoWithFileIntoMyBoothLayout,
  saveLayoutVideoWithUrlIntoMyBoothLayout
} from '../../../services/jobhub-api/DecoratorBoothLayoutController';
import { notify } from '../../../utils/toastutil';
import { useDispatch, useSelector } from 'react-redux';
import MyBoothLayoutListContainer from '../../MyBoothLayoutList/MyBoothLayoutList.container';
import React, { useEffect, useRef, useState } from 'react';
import { BREADCUMB_HEIGHT, NAVBAR_HEIGHT } from '../../../styles/custom-theme';

export const Decorate3DBoothContainer = (props) => {
  const { companyBoothId, jobFairId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { mode, selectedItem } = useSelector((state) => state.decorateBooth);
  const modelId = useSelector((state) => state?.decorateBooth?.modelId);
  const [modelItems, setModelItems] = useState([]);
  const [myLayoutVisibility, setMyLayoutVisibility] = useState(false);
  const meshGroupRef = useRef();
  const rendererRef = useRef();

  useEffect(async () => {
    let url = GENERIC_BOOTH_LAYOUT_URL;
    const companyBoothLayoutVideos = {};
    try {
      const response = await getCompanyBoothLatestLayout(companyBoothId);
      url = response.data.url;
      response.data.companyBoothLayoutVideos?.forEach((data) => {
        companyBoothLayoutVideos[data.itemName] = data.url;
      });
    } catch (err) {
      //handle error in here
    }
    //parse file and get items
    const glb = await loadGLBModel(url);
    const result = glb.scene.children;
    for (const mesh of result) {
      addVideoTexture(mesh, companyBoothLayoutVideos);
      fixTextureOffset(mesh);
    }
    setModelItems(result);
  }, []);

  useEffect(async () => {
    if (modelId === undefined) return;
    let url = GENERIC_BOOTH_LAYOUT_URL;
    const companyBoothLayoutVideos = {};
    try {
      const response = await getMyBoothLayoutById(modelId);
      url = response.data.url;
      response.data.companyBoothLayoutVideos?.forEach((data) => {
        companyBoothLayoutVideos[data.itemName] = data.url;
      });
    } catch (err) {
      notification['info']({
        message: `Info:`,
        description: `The default layout will be used.`,
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
    setModelItems(result);
  }, [modelId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const uploadVideo = async (textureObj, layoutId, itemName, isSaveInMyBoothLayout) => {
    if (textureObj.texture.image.src.substring(0, 4) !== 'data') {
      if (isSaveInMyBoothLayout) {
        return saveLayoutVideoWithUrlIntoMyBoothLayout({
          layoutId,
          itemName,
          url: textureObj.texture.image.src
        });
      } else {
        return saveLayoutVideoWithUrl({
          layoutId,
          itemName,
          url: textureObj.texture.image.src
        });
      }
    }
    const b64data = textureObj.texture.image.src.substring(15 + 7);
    const blob = await b64toBlob(b64data, 'video/mp4');
    const formData = new FormData();
    formData.append('layoutId', layoutId);
    formData.append('file', blob);
    formData.append('itemName', itemName);
    if (isSaveInMyBoothLayout) return saveLayoutVideoWithFileIntoMyBoothLayout(formData);
    else return saveLayoutVideoWithFile(formData);
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
    formData.append('companyBoothId', companyBoothId);
    formData.append('file', glbData);
    let response;
    if (isSaveInMyBoothLayout) {
      formData.append('name', layoutName);
      response = await saveDecoratedBoothIntoMyBoothLayout(formData);
    } else response = await saveDecoratedBooth(formData);

    //upload video
    const videoUploadPromises = [];
    for (const textureObj of textureList) {
      const promise = uploadVideo(textureObj, response.data.id, textureObj.meshName);
      videoUploadPromises.push(promise);
    }
    await Promise.all(videoUploadPromises);
    notify(2, 'Save successfully');
  };

  const addMoreComponentHandle = () => {
    if (mode === ModeConstant.ADD) dispatch(decorateBoothAction.setMode(ModeConstant.SELECT));
    else dispatch(decorateBoothAction.setMode(ModeConstant.ADD));
  };

  const reviewHandle = () => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {
      jobFairId
    });
    history.push(url);
  };

  const handleOnRotationLeft = () => {
    if (selectedItem === undefined) return;

    rotateModelLeft(selectedItem, 10);
  };

  const handleOnRotationRight = () => {
    if (selectedItem === undefined) return;

    rotateModelRight(selectedItem, 10);
  };

  const handleDelete = () => {
    setModelItems((prevState) => prevState.filter((itemMesh) => itemMesh.uuid !== selectedItem.uuid));
  };

  const handleAdd = (mesh) => {
    setModelItems((prevState) => [...prevState, mesh]);
  };

  const handleKeyDown = (event) => {
    if (selectedItem === undefined) return;

    switch (event.keyCode) {
      case 37: //KEY LEFT
        event.preventDefault();
        handleOnRotationLeft();
        break;
      case 38: //KEY UP
        event.preventDefault();
        moveModelUp(selectedItem, 0.1);
        break;
      case 39: //KEY RIGHT
        event.preventDefault();
        handleOnRotationRight();
        break;
      case 40: //KEY DOWN
        event.preventDefault();
        moveModelDown(selectedItem, 0.1);
        break;
      case 46: //KEY DEL
        event.preventDefault();
        handleDelete();
        break;
    }
  };

  const openBoothModal = () => {
    setMyLayoutVisibility(true);
  };

  const controlButtonsProps = {
    addMoreComponentHandle,
    saveHandle: () => saveHandle(),
    reviewHandle,
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
    }
  };
  const sideBarProps = {
    handleOnRotationLeft,
    handleOnRotationRight,
    handleDelete,
    rendererRef
  };

  if (modelItems.length === 0) return <LoadingComponent />;
  return (
    <div style={{ height: `calc(100vh - ${NAVBAR_HEIGHT})` }}>
      <MyBoothLayoutListContainer
        setMyLayoutVisibility={setMyLayoutVisibility}
        myLayoutVisibility={myLayoutVisibility}
      />
      <DecorateBooth3DItemMenuContainer />
      <Stats />
      <div
        style={{
          display: 'flex',
          height: `calc(100vh - ${NAVBAR_HEIGHT} - ${BREADCUMB_HEIGHT})`
        }}>
        <DecoratedBoothSideBarContainer {...sideBarProps} />
        <DecorateBoothCanvas modelItems={modelItems} handleAdd={handleAdd} ref={meshGroupRef} renderRef={rendererRef} />
      </div>

      <ControlButtonGroup {...controlButtonsProps} />
      <ToastContainer />
    </div>
  );
};

const InputLayoutNameForm = ({ saveHandle }) => {
  //for layout name form
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Form
        form={form}
        onFinish={() => {
          setLoading(true);
          saveHandle(true, form.getFieldValue('name')).then(() => {
            setLoading(false);
            Modal.destroyAll();
          });
        }}>
        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Please input the name!' }]}>
          <Input />
        </Form.Item>
        <Button type='primary' htmlType='submit' loading={loading} style={{ marginRight: '1rem' }}>
          Save
        </Button>
        <Button onClick={() => Modal.destroyAll()} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </>
  );
};
