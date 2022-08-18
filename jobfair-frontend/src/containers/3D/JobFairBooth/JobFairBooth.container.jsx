import * as THREE from 'three';
import { CompanyBoothCanvasComponent } from '../../../components/3D/Booth/CompanyBoothCanvas.component';
import {
  DEFAULT_HUMAN_MODEL_TEXTURE_URL,
  DEFAULT_HUMAN_MODEL_URL,
  DEFAULT_IDLE_HUMAN_MODEL_URL,
  DEFAULT_WALKING_HUMAN_MODEL_URL
} from '../../../constants/3DConst';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import {
  addVideoTexture,
  calculateMeshSize,
  fixTextureOffset,
  loadCharacterModel,
  loadFBXModel,
  loadGLBModel
} from '../../../utils/ThreeJS/threeJSUtil';
import { getCompanyBoothLatestLayout } from '../../../services/jobhub-api/CompanyBoothLayoutControllerService';
import { makeTextSprite } from '../../../utils/ThreeJS/sprite-util';
import { useSelector } from 'react-redux';
import BasicCharacterControl from '../../../utils/ThreeJS/BasicCharacterControl';
import BasicControlInput from '../../../utils/ThreeJS/BasicControlInput';
import React, { useEffect, useRef, useState } from 'react';
import ThirdPersonCamera from '../../../utils/ThreeJS/ThirdPersonCamera';

class CharacterModel extends BasicCharacterControl {
  constructor({ input, animations, target, mixer, thirdPersonCamera, collidableMeshListRef, zoom, geckoClientRef }) {
    super({
      input,
      animations,
      target,
      mixer,
      thirdPersonCamera,
      collidableMeshListRef,
      zoom,
      geckoClientRef
    });
    this.animations.idle.play();
  }

  switchAnimation() {
    if (this._input.keys.right || this._input.keys.forward || this._input.keys.left || this._input.keys.backward) {
      if (this._input.keys.backward) this.animations.walk.timeScale = -1;
      else this.animations.walk.timeScale = 1;

      this.animations.walk.crossFadeTo(this.animations.idle, 2, true);
      this.animations.walk.play();
    } else {
      this.animations.idle.time = 0.0;
      this.animations.idle.enabled = true;
      this.animations.idle.setEffectiveTimeScale(1.0);
      this.animations.idle.setEffectiveWeight(1.0);
      this.animations.idle.crossFadeTo(this.animations.walk, 2, true);
      this.animations.idle.play();
    }
  }
}

export const JobFairBoothContainer = (props) => {
  const { companyBoothId, geckoClientRef } = props;
  const { userId } = useSelector((state) => state.authentication.user);
  const cameraRef = useRef();
  const sceneMeshRef = useRef();
  const isChangeCamera = useRef(true);
  const name = useSelector((state) => state.authentication.user.fullName);

  const [state, setState] = useState({
    model: undefined,
    characterControl: undefined,
    boothMesh: undefined
  });

  const [user, setUser] = useState([]);

  useEffect(() => {
    process();
  }, []);

  const process = async () => {
    const boothMesh = await getBoothMesh(companyBoothId);

    const floorMesh = boothMesh.children.filter((child) => child.name === 'sand')[0];
    const floorHeight = calculateMeshSize(floorMesh).height;
    //load model
    const model = await loadCharacterModel(DEFAULT_HUMAN_MODEL_URL, DEFAULT_HUMAN_MODEL_TEXTURE_URL);
    const boothSize = calculateMeshSize(boothMesh);

    scalingModel(model, boothSize);

    model.position.setY(floorMesh.position.y + floorHeight / 2);

    model.add(
      makeTextSprite(name, {
        fontsize: 80,
        position: { x: model.position.x, y: model.position.y + 200, z: model.position.z },
        borderColor: { r: 0, g: 0, b: 0, a: 0 },
        backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 },
        scaleFactor: { x: 1.25, y: 0.25, z: 0.75 }
      })
    );

    const modelSize = calculateMeshSize(model);
    //load animation
    const idleModel = await loadFBXModel(DEFAULT_IDLE_HUMAN_MODEL_URL);
    const walkingModel = await loadFBXModel(DEFAULT_WALKING_HUMAN_MODEL_URL);
    const mixer = new THREE.AnimationMixer(model);
    const animations = {
      walk: mixer.clipAction(walkingModel.animations[0]),
      idle: mixer.clipAction(idleModel.animations[0])
    };

    //initial character control
    const thirdPersonCamera = new ThirdPersonCamera({
      cameraRef,
      target: model,
      height: modelSize.height,
      zoom: boothSize.width / 200 / 2.5
    });
    const params = {
      target: model,
      animations,
      mixer,
      thirdPersonCamera,
      collidableMeshListRef: sceneMeshRef,
      zoom: boothSize.width / 200 / 2.5,
      geckoClientRef,
      input: new BasicControlInput()
    };

    const characterControl = new CharacterModel({ ...params });

    //initialize gecko
    // eslint-disable-next-line no-console
    console.log('initialize gecko');
    geckoClientRef.current.on('init', async (data) => {
      const obj = JSON.parse(data);
      const userState = [];
      for (const state of obj) {
        const newState = await createNewCharacterModel(state, boothSize);
        userState.push(newState);
      }
      setUser(userState);
    });
    geckoClientRef.current.on('new-user-connect', async (data) => {
      // eslint-disable-next-line no-console
      console.log('new-user-connect', data);
      let obj = JSON.parse(data);
      obj = await createNewCharacterModel(obj, boothSize);
      isChangeCamera.current = false;
      setUser((prevState) => [...prevState, obj]);
    });
    geckoClientRef.current.on('user-left', (data) => {
      // eslint-disable-next-line no-console
      console.log('user-left', data);
      isChangeCamera.current = false;

      setUser((prevState) => prevState.filter((state) => state.id !== data));
    });
    geckoClientRef.current.on('move', (data) => {
      isChangeCamera.current = false;
      setUser((prevState) => {
        const state = prevState.filter((abc) => abc.id === data.userId)[0];
        state?.model.position.set(data.position.x, data.position.y, data.position.z);
        state?.model.quaternion.set(data.quaternion.x, data.quaternion.y, data.quaternion.z, data.quaternion.w);
        if (state !== undefined) state.isMoving = true;

        return prevState;
      });
    });
    geckoClientRef.current.on('stop', (data) => {
      isChangeCamera.current = false;
      setUser((prevState) => {
        const state = prevState.filter((abc) => abc.id === data.id)[0];
        if (state !== undefined) state.isMoving = false;

        return prevState;
      });
    });

    const initialPosition = {
      x: 0,
      y: floorMesh.position.y + floorHeight / 2,
      z: 0
    };
    const initialQuaternion = new THREE.Quaternion();

    geckoClientRef.current.joinChannel(companyBoothId, userId, name, initialPosition, initialQuaternion);

    setState((prevState) => ({
      ...prevState,
      boothMesh,
      model,
      characterControl
    }));
  };

  const scalingModel = (model, boothSize) => {
    model.scale.setScalar(boothSize.width / 200 / 2.5);
    model.children.forEach((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.side = THREE.FrontSide;
      }
    });
  };

  const createNewCharacterModel = async (characterState, boothSize) => {
    const data = JSON.parse(JSON.stringify(characterState));
    const model = await loadCharacterModel(DEFAULT_HUMAN_MODEL_URL, DEFAULT_HUMAN_MODEL_TEXTURE_URL);
    const idleModel = await loadFBXModel(DEFAULT_IDLE_HUMAN_MODEL_URL);
    const walkingModel = await loadFBXModel(DEFAULT_WALKING_HUMAN_MODEL_URL);
    const mixer = new THREE.AnimationMixer(model);
    const animations = {
      walk: mixer.clipAction(walkingModel.animations[0]),
      idle: mixer.clipAction(idleModel.animations[0])
    };
    animations.idle.play();
    scalingModel(model, boothSize);
    model.position.set(data.position.x, data.position.y, data.position.z);
    model.quaternion.set(data.quaternion.x, data.quaternion.y, data.quaternion.z, data.quaternion.w);
    model.add(
      makeTextSprite(characterState.fullName, {
        fontsize: 80,
        position: { x: model.position.x, y: model.position.y + 200, z: model.position.z },
        borderColor: { r: 0, g: 0, b: 0, a: 0 },
        backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 },
        scaleFactor: { x: 1.25, y: 0.25, z: 0.75 }
      })
    );

    data.model = model;
    data.mixer = mixer;
    data.animations = animations;
    return data;
  };

  const getBoothMesh = async (companyBoothId) => {
    const response = await getCompanyBoothLatestLayout(companyBoothId);
    const companyBoothLayoutVideos = {};
    const url = response.data.url;
    response.data.companyBoothLayoutVideos?.forEach((data) => {
      companyBoothLayoutVideos[data.itemName] = data.url;
    });
    const glb = await loadGLBModel(url);
    for (const mesh of glb.scene.children) {
      addVideoTexture(mesh, companyBoothLayoutVideos);
      fixTextureOffset(mesh);
    }
    return glb.scene;
  };

  if (state.boothMesh === undefined) return <LoadingComponent isWholePage={true} />;
  const boothSize = calculateMeshSize(state.boothMesh);
  const cProps = {
    boothMesh: state.boothMesh,
    model: state.model,
    characterControl: state.characterControl,
    cameraRef,
    sceneMeshRef,
    zoom: boothSize.width / 200 / 2.5,
    user,
    isChangeCamera,
    geckoClientRef
  };
  return (
    <>
      <CompanyBoothCanvasComponent {...cProps} />
    </>
  );
};
