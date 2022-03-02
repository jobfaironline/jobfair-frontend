import React, {useEffect, useRef, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import {Model} from './components/model/Final_booth_model'
import {Stage, useGLTF} from '@react-three/drei'
import {ToastContainer} from 'react-toastify'
import Menu from './components/Menu/ItemListMenu'
import {EffectComposer, Outline} from '@react-three/postprocessing'
import {ModeConstant} from '../../constants/AppConst'
import {fixTextureOffset, loadModel, parseModel} from "../../utils/glbModelUtil";
import {initialSampleItems} from "./data/SampleDateItem";
import SideBarDecoratedBooth from "./components/SideBarDecoratedBooth/SideBarDecoratedBooth.component";
import {useParams} from "react-router-dom";
import {saveDecoratedBooth} from "../../services/boothPurchaseService";
import {notify} from "../../utils/toastutil";
import {CameraControls} from "../../components/ThreeJSBaseComponent/CameraControls.component";
import {getCompanyBoothLatestLayout} from "../../services/companyBoothService";

const DecorateBoothPage = () => {
    const {companyBoothId} = useParams();
    const [isDragging, setIsDragging] = useState(false)
    const [sampleItems, setSampleItems] = useState(initialSampleItems)
    const [selectedSampleItem, setSelectedSampleItem] = useState({})
    const [mode, setMode] = useState(ModeConstant.SELECT)
    const [selectedItemRef, setSelectedItemRef] = useState()
    const [hoverItemRef, setHoverItemRef] = useState()
    const [modelItems, setModelItems] = useState([])

    const ref = useRef()


    useEffect(async () => {
        const response = await getCompanyBoothLatestLayout(companyBoothId);
        const url = response.data.url;
        //parse file and get items
        const glb = await loadModel(url);
        const result = glb.scene.children;
        for (const mesh of result) {
            fixTextureOffset(mesh);
        }
        setModelItems(result);
    },
        [])

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
        while (sceneNode.type !== 'Scene') {
            sceneNode = sceneNode.parent;
        }
        const sceneNodeCopy = sceneNode.clone(false);
        sceneNodeCopy.clear();
        const copyNode = ref.current.children.map(mesh => mesh.clone());
        copyNode.forEach(mesh => sceneNodeCopy.children.push(mesh));
        sceneNodeCopy.name = "Scene";

        const glbData = await parseModel(sceneNodeCopy);
        const formData = new FormData();
        formData.append("companyBoothId", companyBoothId)
        formData.append("file", glbData)
        saveDecoratedBooth(formData);
        notify(2, "Save successfully")

        //downloadModel(sceneNodeCopy);

    }

    if (modelItems.length === 0 ) return null;
    return (
        <>
            <div style={{display: 'flex'}}>
                <div>
                    <SideBarDecoratedBooth
                        selectedItemRef={selectedItemRef}
                        onClick={onClick}
                    />
                </div>
                <Canvas dpr={[1, 2]} camera={{fov: 50}} style={{width: '100%', height: '850px'}}>

                    <CameraControls enabled={!isDragging}/>
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
                        <Outline blur selection={selected()} visibleEdgeColor="yellow" edgeStrength={1000}
                                 width={1000}/>
                    </EffectComposer>
                </Canvas>
                <ToastContainer/>
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
