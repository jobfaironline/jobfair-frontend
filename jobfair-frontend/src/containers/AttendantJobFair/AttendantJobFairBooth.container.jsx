import React, {useEffect, useRef, useState} from 'react'
import {
  addVideoTexture,
  calculateMeshSize,
  fixTextureOffset,
  loadFBXModel,
  loadGLBModel
} from '../../utils/ThreeJS/threeJSUtil'
import {CompanyBoothCanvasComponent} from '../../components/AttendantJobFair/CompanyBoothCanvas.component'
import {getCompanyBoothLatestLayout} from '../../services/company-booth-layout-controller/CompanyBoothLayoutControllerService'
import * as THREE from "three";
import ThirdPersonCamera from "../../utils/ThreeJS/ThirdPersonCamera";
import BasicCharacterControl from "../../utils/ThreeJS/BasicCharacterControl";
import {InventoryContainer} from "../../components/AttendantJobFair/Inventory.container";
import {LoadingComponent} from "../../components/JobFairParkMap/Loading.component";
import {Button, Modal} from "antd";


class CharacterModel extends BasicCharacterControl {
  constructor({animations, target, mixer, thirdPersonCamera, collidableMeshListRef}) {
    super({animations, target, mixer, thirdPersonCamera, collidableMeshListRef});
    this.animations.idle.play();
  }

  switchAnimation() {
    if (this._input.keys.right || this._input.keys.forward || this._input.keys.left || this._input.keys.backward) {
      if (this._input.keys.backward) {
        this.animations.walk.timeScale = -1;
      } else {
        this.animations.walk.timeScale = 1;
      }
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

export const AttendantJobFairBoothContainer = props => {
  const {companyBoothId} = props
  const cameraRef = useRef();
  const sceneMeshRef = useRef();
  const [state, setState] = useState({
    model: undefined,
    characterControl: undefined,
    boothMesh: undefined,
  })

  const getBoothMesh = async (companyBoothId) => {
    const response = await getCompanyBoothLatestLayout(companyBoothId)
    const companyBoothLayoutVideos = {}
    const url = response.data.url
    response.data.companyBoothLayoutVideos?.forEach(data => {
      companyBoothLayoutVideos[data.itemName] = data.url;
    })
    const glb = await loadGLBModel(url)
    for (const mesh of glb.scene.children) {
      addVideoTexture(mesh, companyBoothLayoutVideos)
      fixTextureOffset(mesh)
    }
    return glb.scene;
  }

  useEffect(async () => {

    const boothMesh = await getBoothMesh(companyBoothId);

    const floorMesh = boothMesh.children.filter(child => child.name === "sand")[0];
    const floorHeight = calculateMeshSize(floorMesh).height
    //load model
    const model = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx");
    //const model = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking (5).fbx");

    model.scale.setScalar(0.07 / 2);
    //model.position.setY(center * 2)
    model.children.forEach(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material.side = THREE.FrontSide
      }
    })
    model.position.setY(floorMesh.position.y + floorHeight / 2)

    const modelSize = calculateMeshSize(model);
    //load animation
   /* const idleModel = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Standing Idle (1).fbx");
    const walkingModel = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking4.fbx")*/
    const idleModel = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/ModelIdle.fbx");
    const walkingModel = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx")
    const mixer = new THREE.AnimationMixer(model);
    const animations = {
      'walk': mixer.clipAction(walkingModel.animations[0]),
      'idle': mixer.clipAction(idleModel.animations[0])
    }

    //initial character control
    const thirdPersonCamera = new ThirdPersonCamera({
      cameraRef: cameraRef,
      target: model,
      height: modelSize.height,
    });
    const params = {
      target: model,
      animations: animations,
      mixer: mixer,
      thirdPersonCamera: thirdPersonCamera,
      collidableMeshListRef: sceneMeshRef
    }
    const characterControl = new CharacterModel({...params});



    setState(prevState => {
      return {
        ...prevState,
        boothMesh: boothMesh,
        model: model,
        characterControl: characterControl
      }
    })

  }, [])



  if (state.boothMesh === undefined) return <LoadingComponent/>;
  const cProps = {
    boothMesh: state.boothMesh,
    model: state.model,
    characterControl: state.characterControl,
    cameraRef,
    sceneMeshRef
  }
  return (
    <>

      <InventoryContainer/>
      <CompanyBoothCanvasComponent {...cProps}/>
    </>
  )
}
