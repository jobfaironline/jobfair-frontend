import React, { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Model } from './components/model/Final_booth_model'
import { Stage, useGLTF } from '@react-three/drei'
import { ToastContainer } from 'react-toastify'
import Menu from './components/Menu/ItemListMenu'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { ModeConstant } from '../../constants/AppConst'
import { parseModel } from '../../utils/glbModelUtil'
import { initialSampleItems } from './data/SampleDateItem'
import SideBarDecoratedBooth from './components/SideBarDecoratedBooth/SideBarDecoratedBooth.component'
import { useParams } from 'react-router-dom'
import { saveDecoratedBooth } from '../../services/boothPurchaseService'
import { notify } from '../../utils/toastutil'
import { CameraControls } from '../../components/ThreeJSBaseComponent/CameraControls.component'
import { Button } from '@mui/material'

const DecorateBoothPage = () => {
  const { companyBoothId } = useParams()
  const [isDragging, setIsDragging] = useState(false)
  const [sampleItems, setSampleItems] = useState(initialSampleItems)
  const [selectedSampleItem, setSelectedSampleItem] = useState({})
  const [mode, setMode] = useState(ModeConstant.SELECT)
  const [selectedItemRef, setSelectedItemRef] = useState()
  const [hoverItemRef, setHoverItemRef] = useState()
  const [showMenu, setShowMenu] = useState(false)
  const ref = useRef()
  //parse file and get items
  const { nodes } = useGLTF('https://d3polnwtp0nqe6.cloudfront.net/Booth/bf78dec0-98b3-41f7-bca0-72e2c65abcfb')
  const result = []
  for (const mesh in nodes) {
    if (nodes[mesh].parent?.name === 'Scene') result.push(nodes[mesh])
  }
  for (const mesh of result) {
    if (mesh.material.map !== null) {
      mesh.material.map.center.set(0.5, 0.5)
    }
  }

  const selected = () => {
    const result = []
    if (hoverItemRef?.current !== undefined) {
      result.push(hoverItemRef.current)
    }
    if (mode !== ModeConstant.SELECT) return result
    if (selectedItemRef?.current !== undefined) {
      result.push(selectedItemRef.current)
    }
    return result.length === 0 ? undefined : result
  }

  const changeMode = mode => {
    switch (mode) {
      case ModeConstant.ADD:
        setSelectedItemRef(undefined)
    }
    setMode(mode)
  }

  const onClick = async () => {
    let sceneNode = ref.current.parent
    while (sceneNode.type !== 'Scene') {
      sceneNode = sceneNode.parent
    }
    const sceneNodeCopy = sceneNode.clone(false)
    sceneNodeCopy.clear()
    const copyNode = ref.current.children.map(mesh => mesh.clone())
    copyNode.forEach(mesh => sceneNodeCopy.children.push(mesh))
    sceneNodeCopy.name = 'Scene'

    const glbData = await parseModel(sceneNodeCopy)
    const formData = new FormData()
    formData.append('companyBoothId', companyBoothId)
    formData.append('file', glbData)
    saveDecoratedBooth(formData)
    notify(2, 'Save successfully')

    //downloadModel(sceneNodeCopy);
  }

  const [modelItems, setModelItems] = useState(result)
  return (
    <>
      <div style={{ display: 'flex', maxHeight: showMenu ? '70vh' : '90vh' }}>
        <div>
          <SideBarDecoratedBooth selectedItemRef={selectedItemRef} onClick={onClick} />
        </div>
        <Canvas
          dpr={[1, 2]}
          camera={{ fov: 40, zoom: 1.2, filmOffset: selectedItemRef ? -10 : 0 }}
          style={{ width: '100vw', height: showMenu ? '70vh' : '90vh' }}
        >
          {/*<OrbitControls enabled={!isDragging} enableZoom={true}
                         maxPolarAngle={Math.PI/2 - Math.PI/10}
                         minPolarAngle={0}
                         maxDistance={1000}/>*/}
          <CameraControls enabled={!isDragging} />
          <Stage preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
            <Model
              setIsDragging={setIsDragging}
              ref={ref}
              selectedSampleItem={selectedSampleItem}
              modelItems={modelItems}
              setModelItems={setModelItems}
              mode={mode}
              setSelectedItemRef={setSelectedItemRef}
              selectedItemRef={selectedItemRef}
              hoverItemRef={hoverItemRef}
              setHoverItemRef={setHoverItemRef}
            />
          </Stage>

          <EffectComposer multisampling={8} autoClear={false}>
            <Outline blur selection={selected()} visibleEdgeColor="yellow" edgeStrength={1000} width={1000} />
          </EffectComposer>
        </Canvas>
        <ToastContainer />
      </div>

      <Button
        type="primary"
        onClick={() => setShowMenu(preState => !preState)}
        style={showMenu ? {} : { position: 'fixed', bottom: 0 }}
      >
        Add more component
      </Button>
      <div style={{ display: showMenu ? 'block' : 'none' }}>
        <Menu
          items={sampleItems}
          selected={selectedSampleItem}
          setSelected={setSelectedSampleItem}
          setMode={changeMode}
        />
      </div>
    </>
  )
}

export default DecorateBoothPage
