import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Model } from './components/model/Final_booth_model'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'
import { ToastContainer } from 'react-toastify'
import { Button } from 'antd'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import Menu from './components/Menu/ItemListMenu'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { ModeConstant } from '../../constants/AppConst'
import { SketchPicker } from 'react-color'
import {downloadModel} from "../../utils/glbModelUtil";
import {initialSampleItems} from "./data/SampleDateItem";
import SideBarDecoratedBooth from "./components/SideBarDecoratedBooth/SideBarDecoratedBooth.component";
const JobFairPackPage = () => {

  const [isDragging, setIsDragging] = useState(false)
  const [sampleItems, setSampleItems] = useState(initialSampleItems)
  const [selectedSampleItem, setSelectedSampleItem] = useState({})
  const [mode, setMode] = useState(ModeConstant.SELECT)
  const [selectedItemRef, setSelectedItemRef] = useState()
  const [hoverItemRef, setHoverItemRef] = useState()
  const ref = useRef()
  //parse file and get items
  const { nodes, materials } = useGLTF('./untitled.glb')
  const result = []
  for (const mesh in nodes) {
    if (nodes[mesh].parent?.name === 'Scene') result.push(nodes[mesh])
  }
  for (const mesh of result){
    if (mesh.material.map !== null){
      mesh.material.map.center.set(0.5, 0.5)
    }
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

  const changeMode = mode => {
    switch (mode) {
      case ModeConstant.ADD:
        setSelectedItemRef(undefined)
    }
    setMode(mode)
  }

  const onClick = () => {
    let sceneNode = ref.current.parent;
    while (sceneNode.type !== 'Scene'){
      sceneNode = sceneNode.parent;
    }
    const sceneNodeCopy = sceneNode.clone(false);
    sceneNodeCopy.clear();
    const copyNode = ref.current.children.map(mesh => mesh.clone());
    copyNode.forEach(mesh => sceneNodeCopy.children.push(mesh));
    sceneNodeCopy.name="Scene";
    debugger;
    downloadModel(sceneNodeCopy);

  }

  const [modelItems, setModelItems] = useState(result)
  const StageRef = useRef();
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>
          <SideBarDecoratedBooth
              selectedItemRef={selectedItemRef}
              onClick={onClick}
          />
        </div>
        <Canvas dpr={[1, 2]} camera={{ fov: 50 }} style={{ width: '100%', height: '850px' }}>
          <OrbitControls enabled={!isDragging} />
          <Stage controls={StageRef} preset="rembrandt" intensity={0.4}  environment="city" contactShadow={false}>
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
