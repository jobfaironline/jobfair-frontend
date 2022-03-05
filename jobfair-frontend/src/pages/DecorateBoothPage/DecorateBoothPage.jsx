import React, {useEffect, useReducer, useRef, useState} from 'react'
import {Canvas} from '@react-three/fiber'
import {Model} from './components/model/Final_booth_model'
import {Stage, useContextBridge} from '@react-three/drei'
import Menu from './components/Menu/ItemListMenu'
import {EffectComposer, Outline} from '@react-three/postprocessing'
import {ModeConstant} from '../../constants/AppConst'
import {fixTextureOffset, loadModel, parseModel} from '../../utils/glbModelUtil'
import {initialSampleItems} from './data/SampleDateItem'
import SideBarDecoratedBooth from './components/SideBarDecoratedBooth/SideBarDecoratedBooth.component'
import {useHistory, useParams} from 'react-router-dom'
import {notify} from '../../utils/toastutil'
import {CameraControls} from '../../components/ThreeJSBaseComponent/CameraControls.component'
import {
    getCompanyBoothLatestLayout,
    saveDecoratedBooth
} from '../../services/company-booth-layout-controller/CompanyBoothLayoutControllerService'
import {Affix, Button, Space} from 'antd'
import {PATH} from '../../constants/Paths/Path'
import {ReactReduxContext, useDispatch, useSelector, useStore} from "react-redux";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import * as THREE from "three";

const SlideMenu = (props) => {
    const {} = props;

    const [sampleItems, setSampleItems] = useState(initialSampleItems)

    const mode =  useSelector(state => state.decorateBooth.mode)
    return (
        <div style={{display: mode === ModeConstant.ADD ? 'block' : 'none'}}>
            <Menu
                items={sampleItems}
            />
        </div>
    )
}

const ControlFooter = (props) => {
    const {addMoreComponentHandle, saveHandle, reviewHandle} = props;

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Affix offsetBottom={10}>
                <Space>
                    <Button type="primary" onClick={addMoreComponentHandle}>
                        Add more component
                    </Button>
                    <Button onClick={saveHandle} type="primary">
                        Save
                    </Button>
                    <Button type="primary" onClick={reviewHandle}>
                        Review
                    </Button>
                </Space>
            </Affix>
        </div>
    )
}

const DecorateBoothPage = () => {
    const {companyBoothId, jobFairId} = useParams()
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);


    const history = useHistory()
    const dispatch = useDispatch();

    const hoverItemRef = useSelector(state => state.decorateBooth.hoverItemRef)
    const selectedItemRef = useSelector(state => state.decorateBooth.selectedItemRef)
    const mode = useSelector(state => state.decorateBooth.mode)
    const modelItems = useSelector(state => state.decorateBooth.modelItems)

    const ref = useRef()
    const outlineRef = useRef();
    const ContextBridge = useContextBridge(ReactReduxContext)

    useEffect(async () => {
        let url = 'https://d3polnwtp0nqe6.cloudfront.net/Booth/bf78dec0-98b3-41f7-bca0-72e2c65abcfb'
        try {
            const response = await getCompanyBoothLatestLayout(companyBoothId)
            url = response.data.url
        } catch (err) {
        }
        //parse file and get items
        const glb = await loadModel(url)
        const result = glb.scene.children
        for (const mesh of result) {
            fixTextureOffset(mesh)
        }
        dispatch(decorateBoothAction.setModelItems(result))
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    const calculateOutlineMesh = () => {
        const result = []
        if (hoverItemRef !== undefined) {
            result.push(hoverItemRef)
            //outlineRef.current?.selection.add(hoverItemRef);
        }
        if (mode !== ModeConstant.SELECT) return result
        if (selectedItemRef !== undefined) {
            result.push(selectedItemRef)
            //outlineRef.current?.selection.add(selectedItemRef);
        }
        //outlineRef.current?.selection.set(result);
        return result.length === 0 ? null : result
    }

    const saveHandle = async () => {
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

    }

    const addMoreComponentHandle = async => {
        if (mode === ModeConstant.ADD){
            dispatch(decorateBoothAction.setMode(ModeConstant.SELECT));
        } else {
            dispatch(decorateBoothAction.setMode(ModeConstant.ADD));

        }
    }

    const reviewHandle = async => {
        history.push(`${PATH.MAP}${jobFairId}`);
    }

    const handleOnRotationLeft = _ => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        const myAxis = new THREE.Vector3(0, 1, 0)
        selectedItemRef.current.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(10))
    }

    const handleOnRotationRight = _ => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        const myAxis = new THREE.Vector3(0, 1, 0)
        selectedItemRef.current.rotateOnWorldAxis(myAxis, -THREE.Math.degToRad(10))
    }


    const handleDelete = _ => {

        const result = modelItems.filter(itemMesh => itemMesh.uuid !== selectedItemRef?.current?.uuid).map(mesh => mesh.clone());
        dispatch(decorateBoothAction.setHoverItemRef(undefined))
        dispatch(decorateBoothAction.setSelectedItemRef(undefined))
        dispatch(decorateBoothAction.setModelItems(result));
    }

    const handleKeyDown = event => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        const mesh = selectedItemRef.current
        switch (event.keyCode) {
            case 37: //KEY LEFT
                event.preventDefault()
                handleOnRotationLeft()
                break
            case 38: //KEY UP
                event.preventDefault()
                mesh.position.set(mesh.position.x, mesh.position.y + 0.1, mesh.position.z)
                break
            case 39: //KEY RIGHT
                event.preventDefault()
                handleOnRotationRight()
                break
            case 40: //KEY DOWN
                event.preventDefault()
                mesh.position.set(mesh.position.x, mesh.position.y - 0.1, mesh.position.z)
                break
            case 46: //KEY DEL
                event.preventDefault()
                handleDelete()
                break
        }
    }



    if (modelItems.length === 0) return null

    const menuProps = {};
    const controlFooterProps = {addMoreComponentHandle, saveHandle, reviewHandle}
    const sideBarProps = {handleOnRotationLeft, handleOnRotationRight, handleDelete}

    return (
        <>
            <div style={{display: 'flex', maxHeight: mode === ModeConstant.ADD ? '70vh' : '90vh'}}>
                <SideBarDecoratedBooth {...sideBarProps}/>
                <Canvas
                    dpr={[1, 2]}
                    camera={{fov: 40, zoom: 1.2}}
                    style={{width: '100vw', height: mode === ModeConstant.ADD ? '70vh' : '90vh'}}
                >
                    <ContextBridge>
                        <CameraControls enabled={mode !== ModeConstant.DRAGGING}/>
                        <Stage preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
                            <Model ref={ref}/>
                        </Stage>
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline
                                    ref={outlineRef}
                                    blur
                                     selection={calculateOutlineMesh()}
                                     selectionLayer={100}
                                     visibleEdgeColor="yellow"
                                     edgeStrength={1000}
                                     width={1000}/>
                        </EffectComposer>
                    </ContextBridge>

                </Canvas>
            </div>

            <ControlFooter {...controlFooterProps}/>
            <SlideMenu {...menuProps}/>
        </>
    )
}

export default DecorateBoothPage
