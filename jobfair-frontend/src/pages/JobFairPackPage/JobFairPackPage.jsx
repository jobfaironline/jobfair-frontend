import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Model } from './components/model/Final_booth_model'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import { ToastContainer } from 'react-toastify'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import Menu from './components/Menu/ItemListMenu'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { ModeConstant } from '../../constants/AppConst'
import SideBarDecoratedBooth from './components/SideBarDecoratedBooth/SideBarDecoratedBooth.component'
import { initialSampleItems } from './data/SampleDataItems'
const JobFairPackPage = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [sampleItems, setSampleItems] = useState(initialSampleItems)
  const [selectedSampleItem, setSelectedSampleItem] = useState({})
  const [mode, setMode] = useState(ModeConstant.SELECT)
  const [selectedItemRef, setSelectedItemRef] = useState()
  const [hoverItemRef, setHoverItemRef] = useState()
  const [decoratedColorRef, setDecoratedColorRef] = useState()
  const ref = useRef()

  function handleDownload(e) {
    console.log(ref)
    const exporter = new GLTFExporter()
    exporter.parse(
      ref.current.parent,
      // called when the gltf has been generated
      function (gltf) {
        const link = document.createElement('a')
        link.style.display = 'none'
        document.body.appendChild(link)
        const blob = new Blob([gltf], { type: 'application/octet-stream' })
        link.href = URL.createObjectURL(blob)
        link.download = 'scene.glb'
        link.click()
        document.body.removeChild(link)
      },
      // called when there is an error in the generation
      function (error) {
        console.log('An error happened')
      },
      {
        binary: true,
        trs: true
      }
    )
  }
  const { nodes, materials } = useGLTF('./untitled.glb')
  const result = []
  for (const mesh in nodes) {
    if (nodes[mesh].parent?.name === 'Scene') result.push(nodes[mesh])
  }
  const selected = () => {
    const result = []
    if (hoverItemRef !== undefined) {
      result.push(hoverItemRef)
    }
    if (mode !== ModeConstant.SELECT) return result
    if (selectedItemRef !== undefined) {
      result.push(selectedItemRef)
    }
    return result.length === 0 ? undefined : result
  }
  //handle on update stage when change item
  useEffect(() => {
    if (selectedItemRef == null) return
    setDecoratedPositionRef(selectedItemRef.current.position)
    setDecoratedRotationRef(selectedItemRef.current.rotation)
    setDecoratedColorRef(selectedItemRef.current.material)
    console.log(selectedItemRef)
  }, [selectedItemRef])

  //handle on update Color when state change
  useEffect(() => {
    if (decoratedColorRef == null) return
    const newMaterial = selectedItemRef.current.material.clone()
    newMaterial.color.set(decoratedColorRef.hex)
    newMaterial.transparent = true
    selectedItemRef.current.material = newMaterial
    for (const childMesh of selectedItemRef.current.children) {
      childMesh.material = newMaterial
    }
  }, [decoratedColorRef])

  const changeMode = mode => {
    switch (mode) {
      case ModeConstant.ADD:
        setSelectedItemRef(undefined)
    }
    setMode(mode)
  }
  const [modelItems, setModelItems] = useState(result)
  const StageRef = useRef()
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <SideBarDecoratedBooth
            selectedItemRef={selectedItemRef}
            decoratedColorRef={decoratedColorRef}
            setSelectedItemRef={setSelectedItemRef}
            setDecoratedColorRef={setDecoratedColorRef}
          />
        </div>
        <Canvas dpr={[1, 2]} camera={{ fov: 50 }} style={{ width: '100%', height: '850px' }}>
          <OrbitControls enabled={!isDragging} />
          <Stage
            controls={StageRef}
            preset="rembrandt"
            intensity={0.3999999999999999}
            environment="city"
            contactShadow={false}
          >
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
            <Outline blur selection={selected()} visibleEdgeColor="orange" edgeStrength={5} width={1000} />
          </EffectComposer>
        </Canvas>
        <ToastContainer />
      </div>
      <Menu
        items={sampleItems}
        selected={selectedSampleItem}
        setSelected={setSelectedSampleItem}
        setMode={changeMode}
      />
    </>
  )
}

export default JobFairPackPage
