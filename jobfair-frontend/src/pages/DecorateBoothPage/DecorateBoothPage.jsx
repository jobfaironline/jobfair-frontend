import React, {useRef, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import {Model} from './components/model/Final_booth_model'
import {OrbitControls, Stage, useGLTF} from '@react-three/drei'
import {toast, ToastContainer} from 'react-toastify'
import Menu from './components/Menu/ItemListMenu'
import {EffectComposer, Outline} from '@react-three/postprocessing'
import {ModeConstant} from '../../constants/AppConst'
import {downloadModel, parseModel} from "../../utils/glbModelUtil";
import {initialSampleItems} from "./data/SampleDateItem";
import SideBarDecoratedBooth from "./components/SideBarDecoratedBooth/SideBarDecoratedBooth.component";
import {useParams} from "react-router-dom";
import {saveDecoratedBooth} from "../../services/boothPurchaseService";
import {notify} from "../../utils/toastutil";

const DecorateBoothPage = () => {
  const {companyBoothId} = useParams();
  const [isDragging, setIsDragging] = useState(false)
  const [sampleItems, setSampleItems] = useState(initialSampleItems)
  const [selectedSampleItem, setSelectedSampleItem] = useState({})
  const [mode, setMode] = useState(ModeConstant.SELECT)
  const [selectedItemRef, setSelectedItemRef] = useState()
  const [hoverItemRef, setHoverItemRef] = useState()
  const ref = useRef()
  //parse file and get items
  const { nodes, materials } = useGLTF('https://d3polnwtp0nqe6.cloudfront.net/Booth/bf78dec0-98b3-41f7-bca0-72e2c65abcfb')
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
    let sceneNode = ref.current.parent;
    while (sceneNode.type !== 'Scene'){
      sceneNode = sceneNode.parent;
    }
    const sceneNodeCopy = sceneNode.clone(false);
    sceneNodeCopy.clear();
    const copyNode = ref.current.children.map(mesh => mesh.clone());
    copyNode.forEach(mesh => sceneNodeCopy.children.push(mesh));
    sceneNodeCopy.name="Scene";

    const glbData = await parseModel(sceneNodeCopy);
    const formData  = new FormData();
    formData.append("companyBoothId", companyBoothId)
    formData.append("file", glbData)
    saveDecoratedBooth(formData);
    notify(2, "Save successfully")

    //downloadModel(sceneNodeCopy);

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
            <Outline blur selection={selected()} visibleEdgeColor="yellow" edgeStrength={1000} width={1000} />
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

export default DecorateBoothPage
