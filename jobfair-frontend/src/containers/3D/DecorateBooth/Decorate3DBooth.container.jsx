/* eslint-disable no-unused-vars */
import { ControlButtonGroup } from '../../../components/customized-components/DecoratedBoothTool/ControlButton/ControlButtonGroup.component';
import { DecorateBooth3DItemMenuContainer } from '../../SampleItemMenu/DecorateBooth3DItemMenu.container';
import { DecorateBoothCanvas } from '../../../components/3D/DecorateBooth/DeoratedBoothCanvas/DecorateBoothCanvas.component';
import { DecoratedBoothSideBarContainer } from './DecorateBoothSideBar.container';
import { GENERIC_BOOTH_LAYOUT_URL } from '../../../constants/DecorateBoothConstant';
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
import { notify } from '../../../utils/toastutil';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import MyBoothLayoutListContainer from '../../MyBoothLayoutList/MyBoothLayoutList.container';

export const Decorate3DBoothContainer = (props) => {
  const { companyBoothId, jobFairId } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { mode, selectedItem } = useSelector((state) => state.decorateBooth);
  const modelUrl = useSelector((state) => state?.decorateBooth?.modelUrl);
  const [modelItems, setModelItems] = useState([]);
  const [myLayoutVisibility, setMyLayoutVisibility] = useState(false);
  const meshGroupRef = useRef();
  const rendererRef = useRef();

  useEffect(async () => {
    let url = modelUrl;
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
  }, [modelUrl]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const uploadVideo = (textureObj, layoutId, itemName) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      if (textureObj.texture.image.src.substring(0, 4) !== 'data') {
        saveLayoutVideoWithUrl({
          layoutId,
          itemName,
          url: textureObj.texture.image.src
        });
      } else {
        const b64data = textureObj.texture.image.src.substring(15 + 7);

        const blob = await b64toBlob(b64data, 'video/mp4');
        const formData = new FormData();
        formData.append('layoutId', layoutId);
        formData.append('file', blob);
        formData.append('itemName', itemName);
        saveLayoutVideoWithFile(formData);
      }
      resolve();
    });

  const saveHandle = async () => {
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
    const response = await saveDecoratedBooth(formData);

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

  const handleOnRotationLeft = (_) => {
    if (selectedItem === undefined) return;

    rotateModelLeft(selectedItem, 10);
  };

  const handleOnRotationRight = (_) => {
    if (selectedItem === undefined) return;

    rotateModelRight(selectedItem, 10);
  };

  const handleDelete = (_) => {
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
    saveHandle,
    reviewHandle,
    openBoothModal
  };
  const sideBarProps = {
    handleOnRotationLeft,
    handleOnRotationRight,
    handleDelete,
    rendererRef
  };

  if (modelItems.length === 0) return <LoadingComponent />;
  return (
    <div style={{ height: 'calc(100vh - 126px)' }}>
      <MyBoothLayoutListContainer
        setMyLayoutVisibility={setMyLayoutVisibility}
        myLayoutVisibility={myLayoutVisibility}
      />
      <DecorateBooth3DItemMenuContainer />
      <Stats />
      <div
        style={{
          display: 'flex',
          height: mode === ModeConstant.ADD ? 'calc(100vh - 126x - 94px)' : 'calc(100vh - 126px)'
        }}>
        <DecoratedBoothSideBarContainer {...sideBarProps} />
        <DecorateBoothCanvas modelItems={modelItems} handleAdd={handleAdd} ref={meshGroupRef} renderRef={rendererRef} />
      </div>

      <ControlButtonGroup {...controlButtonsProps} />
      <ToastContainer />
    </div>
  );
};
