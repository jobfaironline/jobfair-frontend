import React, {Fragment, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import {Stage} from '@react-three/drei'
import {EffectComposer, Outline} from '@react-three/postprocessing'
import {ChooseBoothGroundMesh} from './ChooseBoothGroundMesh.component'
import {ArrowHelper} from './ArrowHelper.component'
import {Modal, notification} from 'antd'
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

export const ChooseBoothCanvas = props => {
  const {mesh, boothData, jobFairId} = props
  const history = useHistory()
  const [hoverRef, setHoverRef] = useState()
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
        notification['error']({
          message: `Not found company registration by job fair ID: ${jobFairId}`,
          description: `${err}`,
          duration: 2
        })
      })
  }

  const handleCancel = () => {
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

  const onClick = boothId => {
    setModalState(prevState => {
      return {...prevState, boothId: boothId, isVisible: true}
    })
  }

  const onChangeSkyType = value => {
    setSkyType(value.value)
  }

  return (
    <Fragment>
      <Modal title="Confirm booth" visible={modalState.isVisible} onOk={handleOk} onCancel={handleCancel}>
        Are you sure?
      </Modal>
      <SkyTypeSelect onChange={onChangeSkyType}/>
      <Canvas
        dpr={[1, 2]}
        camera={{fov: 50}}
        shadowMap
        style={{width: '100%', height: '970px', cursor: hoverRef === undefined ? 'default' : 'pointer'}}
      >
        <CameraControls/>
        <SkyComponent style={skyType}/>

        <Stage preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
          <group dispose={null}>
            {mesh.children.map(childMesh => {
              if (childMesh.name.includes('company')) {
                const id = boothData[childMesh.name]?.id
                return (
                  <ChooseBoothGroundMesh
                    key={childMesh.uuid}
                    mesh={childMesh}
                    isAvailable={boothData[childMesh.name] !== undefined}
                    onPointerOver={onCompanyGroundPointerOver}
                    onPointerLeave={onCompanyGroundPointerOut}
                    onClick={() => onClick(id)}
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
        </Stage>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={hoverRef}
            edgeStrength={100}
            width={1000}
            hiddenEdgeColor={'green'}
            visibleEdgeColor={'green'}
          />
        </EffectComposer>
      </Canvas>
    </Fragment>
  )
}
