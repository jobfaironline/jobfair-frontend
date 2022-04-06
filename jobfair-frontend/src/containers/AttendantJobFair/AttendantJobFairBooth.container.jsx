import React, { useEffect, useRef, useState } from 'react'
import {
  addVideoTexture,
  calculateMeshSize,
  fixTextureOffset,
  loadFBXModel,
  loadGLBModel
} from '../../utils/ThreeJS/threeJSUtil'
import { CompanyBoothCanvasComponent } from '../../components/AttendantJobFair/Booth/CompanyBoothCanvas.component'
import { getCompanyBoothLatestLayout } from '../../services/company-booth-layout-controller/CompanyBoothLayoutControllerService'
import * as THREE from 'three'
import ThirdPersonCamera from '../../utils/ThreeJS/ThirdPersonCamera'
import BasicCharacterControl from '../../utils/ThreeJS/BasicCharacterControl'
import { LoadingComponent } from '../../components/JobFairParkMap/Loading.component'
import { useSelector } from 'react-redux'
import BasicControlInput from '../../utils/ThreeJS/BasicControlInput'

class CharacterModel extends BasicCharacterControl {
  constructor({
    input,
    animations,
    target,
    mixer,
    thirdPersonCamera,
    collidableMeshListRef,
    zoom,
    geckoClientRef
  }) {
    super({
      input,
      animations,
      target,
      mixer,
      thirdPersonCamera,
      collidableMeshListRef,
      zoom,
      geckoClientRef
    })
    this.animations.idle.play()
  }

  switchAnimation() {
    if (
      this._input.keys.right ||
      this._input.keys.forward ||
      this._input.keys.left ||
      this._input.keys.backward
    ) {
      if (this._input.keys.backward) {
        this.animations.walk.timeScale = -1
      } else {
        this.animations.walk.timeScale = 1
      }
      this.animations.walk.crossFadeTo(this.animations.idle, 2, true)
      this.animations.walk.play()
    } else {
      this.animations.idle.time = 0.0
      this.animations.idle.enabled = true
      this.animations.idle.setEffectiveTimeScale(1.0)
      this.animations.idle.setEffectiveWeight(1.0)
      this.animations.idle.crossFadeTo(this.animations.walk, 2, true)
      this.animations.idle.play()
    }
  }
}

export const AttendantJobFairBoothContainer = props => {
  const { companyBoothId, geckoClientRef, handleOpenDetail } = props
  const { userId } = useSelector(state => state.authentication.user)
  const cameraRef = useRef()
  const sceneMeshRef = useRef()
  const isChangeCamera = useRef(true)

  const [state, setState] = useState({
    model: undefined,
    characterControl: undefined,
    boothMesh: undefined
  })

  const [user, setUser] = useState([])

  const getBoothMesh = async companyBoothId => {
    const response = await getCompanyBoothLatestLayout(companyBoothId)
    const companyBoothLayoutVideos = {}
    const url = response.data.url
    response.data.companyBoothLayoutVideos?.forEach(data => {
      companyBoothLayoutVideos[data.itemName] = data.url
    })
    const glb = await loadGLBModel(url)
    for (const mesh of glb.scene.children) {
      addVideoTexture(mesh, companyBoothLayoutVideos)
      fixTextureOffset(mesh)
    }
    return glb.scene
  }

  const process = async () => {
    const boothMesh = await getBoothMesh(companyBoothId)

    const floorMesh = boothMesh.children.filter(
      child => child.name === 'sand'
    )[0]
    const floorHeight = calculateMeshSize(floorMesh).height
    //load model
    const model = await loadFBXModel(
      'https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx'
    )
    //const model = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking (5).fbx");

    const boothSize = calculateMeshSize(boothMesh)

    model.scale.setScalar(boothSize.width / 200 / 2.5)
    //model.position.setY(center * 2)
    model.children.forEach(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        child.material.side = THREE.FrontSide
      }
    })

    model.position.setY(floorMesh.position.y + floorHeight / 2)

    const modelSize = calculateMeshSize(model)
    //load animation
    /* const idleModel = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Standing Idle (1).fbx");
    const walkingModel = await loadFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking4.fbx")*/
    const idleModel = await loadFBXModel(
      'https://d3polnwtp0nqe6.cloudfront.net/FBX/ModelIdle.fbx'
    )
    const walkingModel = await loadFBXModel(
      'https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx'
    )
    const mixer = new THREE.AnimationMixer(model)
    const animations = {
      walk: mixer.clipAction(walkingModel.animations[0]),
      idle: mixer.clipAction(idleModel.animations[0])
    }

    //initial character control
    const thirdPersonCamera = new ThirdPersonCamera({
      cameraRef: cameraRef,
      target: model,
      height: modelSize.height,
      zoom: boothSize.width / 200 / 2.5
    })
    const params = {
      target: model,
      animations: animations,
      mixer: mixer,
      thirdPersonCamera: thirdPersonCamera,
      collidableMeshListRef: sceneMeshRef,
      zoom: boothSize.width / 200 / 2.5,
      geckoClientRef: geckoClientRef,
      input: new BasicControlInput()
    }

    const characterControl = new CharacterModel({ ...params })

    //initialize gecko
    console.log('initialize gecko')
    geckoClientRef.current.on('init', async data => {
      const obj = JSON.parse(data)
      const userState = []
      for (const state of obj) {
        const model = await loadFBXModel(
          'https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx'
        )
        const idleModel = await loadFBXModel(
          'https://d3polnwtp0nqe6.cloudfront.net/FBX/ModelIdle.fbx'
        )
        const walkingModel = await loadFBXModel(
          'https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx'
        )
        const mixer = new THREE.AnimationMixer(model)
        const animations = {
          walk: mixer.clipAction(walkingModel.animations[0]),
          idle: mixer.clipAction(idleModel.animations[0])
        }
        animations.idle.play()
        model.scale.setScalar(boothSize.width / 200 / 2.5)
        model.children.forEach(child => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material.side = THREE.FrontSide
          }
        })
        model.position.set(state.position.x, state.position.y, state.position.z)
        model.quaternion.set(
          state.quaternion.x,
          state.quaternion.y,
          state.quaternion.z,
          state.quaternion.w
        )
        state.model = model
        state.mixer = mixer
        state.animations = animations
        userState.push(state)
      }
      setUser(userState)
    })
    geckoClientRef.current.on('new-user-connect', async data => {
      console.log('new-user-connect', data)
      const obj = JSON.parse(data)
      const model = await loadFBXModel(
        'https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx'
      )
      const idleModel = await loadFBXModel(
        'https://d3polnwtp0nqe6.cloudfront.net/FBX/ModelIdle.fbx'
      )
      const walkingModel = await loadFBXModel(
        'https://d3polnwtp0nqe6.cloudfront.net/FBX/WalkingModel.fbx'
      )
      const mixer = new THREE.AnimationMixer(model)
      const animations = {
        walk: mixer.clipAction(walkingModel.animations[0]),
        idle: mixer.clipAction(idleModel.animations[0])
      }
      animations.idle.play()
      model.scale.setScalar(boothSize.width / 200 / 2.5)
      model.children.forEach(child => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          child.material.side = THREE.FrontSide
        }
      })
      model.position.set(obj.position.x, obj.position.y, obj.position.z)
      model.quaternion.set(
        obj.quaternion.x,
        obj.quaternion.y,
        obj.quaternion.z,
        obj.quaternion.w
      )

      obj.model = model
      obj.mixer = mixer
      obj.animations = animations
      isChangeCamera.current = false
      setUser(prevState => {
        return [...prevState, obj]
      })
    })
    geckoClientRef.current.on('user-left', data => {
      console.log('user-left', data)
      isChangeCamera.current = false

      setUser(prevState => {
        return prevState.filter(state => state.id !== data)
      })
    })
    geckoClientRef.current.on('move', data => {
      isChangeCamera.current = false
      setUser(prevState => {
        const state = prevState.filter(abc => abc.id === data.userId)[0]
        state?.model.position.set(
          data.position.x,
          data.position.y,
          data.position.z
        )
        state?.model.quaternion.set(
          data.quaternion.x,
          data.quaternion.y,
          data.quaternion.z,
          data.quaternion.w
        )
        state.isMoving = true
        /*state?.animations.walk.crossFadeTo(state?.animations.idle, 0.5, true);
        state?.animations.walk.play();*/
        return prevState
      })
    })
    geckoClientRef.current.on('stop', data => {
      isChangeCamera.current = false
      setUser(prevState => {
        const state = prevState.filter(abc => abc.id === data.id)[0]
        state.isMoving = false

        /*state.animations.idle.crossFadeTo(state.animations.walk, 2, true);
        state.animations.idle.play();*/

        return prevState
      })
    })

    const initialPosition = {
      x: 0,
      y: floorMesh.position.y + floorHeight / 2,
      z: 0
    }
    const initialQuaternion = new THREE.Quaternion()

    geckoClientRef.current.joinChannel(
      companyBoothId,
      userId,
      initialPosition,
      initialQuaternion
    )

    setState(prevState => {
      return {
        ...prevState,
        boothMesh: boothMesh,
        model: model,
        characterControl: characterControl
      }
    })
  }

  useEffect(() => {
    process()
  }, [])

  if (state.boothMesh === undefined) return <LoadingComponent />
  const boothSize = calculateMeshSize(state.boothMesh)
  const cProps = {
    boothMesh: state.boothMesh,
    model: state.model,
    characterControl: state.characterControl,
    cameraRef,
    sceneMeshRef,
    zoom: boothSize.width / 200 / 2.5,
    handleOpenDetail,
    user: user,
    isChangeCamera,
    geckoClientRef
  }
  return (
    <>
      <CompanyBoothCanvasComponent {...cProps} />
    </>
  )
}
