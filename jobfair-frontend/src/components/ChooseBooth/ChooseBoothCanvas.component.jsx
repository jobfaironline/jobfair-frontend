import React, {Fragment, useState, Suspense } from 'react'
import {Canvas} from '@react-three/fiber'
import {Html, Stage, Stats, useProgress} from '@react-three/drei'
import {EffectComposer, Outline} from '@react-three/postprocessing'
import {ChooseBoothGroundMesh} from './ChooseBoothGroundMesh.component'
import {ArrowHelper} from './ArrowHelper.component'
import {message, Modal, notification} from 'antd'
import {
  getLatestApproveRegistration
} from '../../services/company-registration-controller/CompanyRegistrationControllerService'
import {useHistory} from 'react-router-dom'
import {purchaseBooth} from '../../services/company-buy-booth-controller/CompanyBuyBoothControllerService'
import {BasicMesh} from '../ThreeJSBaseComponent/ChildMesh.component'
import {CameraControls} from '../ThreeJSBaseComponent/CameraControls.component'
import {SkyComponent, SkyType} from '../ThreeJSBaseComponent/Sky.component'
import {SkyTypeSelect} from '../ThreeJSBaseComponent/SelectSkyType.component'
import {PATH} from '../../constants/Paths/Path'
import {KernelSize, Resizer} from "postprocessing";


function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  console.log(progress)
  return <Html center>{progress} % loaded</Html>
}

export const ChooseBoothCanvas = props => {
  const {mesh, boothData, jobFairId} = props
  const history = useHistory()
  const [hoverRef, setHoverRef] = useState()
  const [selectionRef, setSelectionRef] = useState();
  const [modalState, setModalState] = useState({
    isVisible: false,
    boothId: ''
  })
  const [skyType, setSkyType] = useState(SkyType.Morning)
  const handleOk = async () => {
    let data = await getLatestApproveRegistration(jobFairId).then(response => response.data)
    const registrationId = data.id
    data = await purchaseBooth({
      boothId: modalState.boothId,
      companyRegistrationId: registrationId
    })
      .then(response => {
        history.push(`${PATH.DECORATE_BOOTH_PATH}${response.data.id}/${jobFairId}`)
      })
      .catch(err => {
      })
  }

  const handleCancel = () => {
    setSelectionRef(undefined)
    setModalState(prevState => {
      return {...prevState, boothId: '', isVisible: false}
    })
  }

  const onCompanyGroundPointerOver = ref => {
    if (ref?.current?.uuid !== hoverRef?.current?.uuid) {
      setHoverRef(ref)
    }
  }
  const onCompanyGroundPointerOut = () => {
    setHoverRef(undefined)
  }

  const onClick = (boothId, ref) => {
    setSelectionRef(ref);
    setModalState(prevState => {
      return {...prevState, boothId: boothId, isVisible: true}
    })
  }

  const onChangeSkyType = value => {
    setSkyType(value.value)
  }

  const calculateOutline = () => {
    const result = [];
    if (selectionRef !== undefined && selectionRef?.current !== undefined){
      result.push(selectionRef);
    }
    if (hoverRef !== undefined && hoverRef?.current !== undefined){
      result.push(hoverRef);
    }
    return result.length === 0 ? null : result
    }

  return (
    <Fragment>
      <Modal title="Confirm booth" visible={modalState.isVisible} onOk={handleOk} onCancel={handleCancel}>
        Are you sure?
      </Modal>
      <SkyTypeSelect onChange={onChangeSkyType}/>
      <Canvas
        dpr={[1, 2]}
        shadowMap
        style={{width: '100%', height: '970px', cursor: hoverRef === undefined ? 'default' : 'pointer'}}
        camera={{far: 5000, fov: 50}}
      >
        <CameraControls/>
        <SkyComponent style={skyType}/>

          <group dispose={null}>
            {mesh.children.map(childMesh => {
              if (childMesh.name.includes('company')) {
                const id = boothData[childMesh.name]?.id
                return (
                  <ChooseBoothGroundMesh
                    key={childMesh.uuid}
                    mesh={childMesh}
                    boothId={id}
                    isAvailable={boothData[childMesh.name] !== undefined}
                    onPointerOver={onCompanyGroundPointerOver}
                    onPointerLeave={onCompanyGroundPointerOut}
                    onClick={onClick}
                  />
                )
              }
              return <BasicMesh key={childMesh.uuid} mesh={childMesh}/>
            })}
            {mesh.children.map(childMesh => {
              if (childMesh.name.includes('company') && boothData[childMesh.name] !== undefined) {
                return <ArrowHelper origin={childMesh.position}/>
              }
              return null
            })}
          </group>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={calculateOutline()}
            edgeStrength={10000}
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.LARGE} //
            hiddenEdgeColor={0xffffff}
            visibleEdgeColor={0x22090a}
          />
        </EffectComposer>
      </Canvas>
      <Stats></Stats>
    </Fragment>
  )
}
