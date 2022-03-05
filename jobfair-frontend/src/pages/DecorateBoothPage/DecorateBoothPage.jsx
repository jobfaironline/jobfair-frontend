import React, {useEffect, useRef, useState} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {FloorMesh, ItemMesh} from './components/model/Final_booth_model'
import {Stage, useContextBridge, Stats} from '@react-three/drei'
import Menu from './components/Menu/ItemListMenu'
import {EffectComposer, Outline} from '@react-three/postprocessing'
import {ModeConstant} from '../../constants/AppConst'
import {downloadModel, fixTextureOffset, loadModel, parseModel} from '../../utils/glbModelUtil'
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
import {ReactReduxContext, useDispatch, useSelector} from "react-redux";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import * as THREE from "three";
import {ToastContainer} from "react-toastify";

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

const DecorateBoothCanvas = React.forwardRef((props, ref) => {
    const {modelItems, handleAdd} = props
    const ContextBridge = useContextBridge(ReactReduxContext)
    const {hoverItem, selectedItem, mode} = useSelector(state => state.decorateBooth)
    console.log(modelItems);

    const calculateOutlineMesh = () => {
        const result = []
        if (hoverItem  !== undefined) {
            result.push(hoverItem)
        }
        if (mode !== ModeConstant.SELECT) return result
        if (selectedItem !== undefined) {
            result.push(selectedItem)
        }
        return result.length === 0 ? null : result
    }
    const floorMesh = modelItems.filter(mesh => mesh.name === 'sand')[0]

    return (
        <Canvas
            dpr={[1, 2]}
            camera={{fov: 40, zoom: 1.2, position: [-1, 1, -1]}}
            style={{width: '100vw', height: mode === ModeConstant.ADD ? '70vh' : '90vh'}}
        >
            <ContextBridge>
                <CameraControls enabled={mode !== ModeConstant.DRAGGING}/>
                <Stage adjustCamera={false} preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
                    <group dispose={null} ref={ref}>
                        {modelItems.map(mesh => {
                            if (mesh === floorMesh) {
                                return <FloorMesh key={mesh.uuid} mesh={mesh} handleAdd={handleAdd}/>
                            }
                            return <ItemMesh key={mesh.uuid} mesh={mesh} floorMesh={floorMesh}/>
                        })}
                    </group>
                </Stage>

                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline
                        blur
                        selection={calculateOutlineMesh()}
                        selectionLayer={100}
                        visibleEdgeColor="yellow"
                        edgeStrength={1000}
                        width={1000}/>
                </EffectComposer>
            </ContextBridge>
        </Canvas>
    )
})

const DecorateBoothContainer = (props) => {
    const {companyBoothId, jobFairId} = props;

    const history = useHistory()
    const dispatch = useDispatch();
    const {mode, selectedItem} = useSelector(state => state.decorateBooth)
    const [modelItems, setModelItems] = useState([]);
    const canvasRef = useRef();

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
        setModelItems(result);
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    })

    const saveHandle = async () => {
        let sceneNode = canvasRef.current.parent
        while (sceneNode.type !== 'Scene') {
            sceneNode = sceneNode.parent
        }
        const sceneNodeCopy = sceneNode.clone(false)
        sceneNodeCopy.clear()
        const copyNode = canvasRef.current.children.map(mesh => mesh.clone())
        copyNode.forEach(mesh => sceneNodeCopy.children.push(mesh))
        sceneNodeCopy.name = 'Scene'

        const glbData = await parseModel(sceneNodeCopy)
        const formData = new FormData()
        formData.append('companyBoothId', companyBoothId)
        formData.append('file', glbData)
        await saveDecoratedBooth(formData)
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
        if (selectedItem === undefined) {
            return
        }
        const myAxis = new THREE.Vector3(0, 1, 0)
        selectedItem.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(10))
    }

    const handleOnRotationRight = _ => {
        if (selectedItem === undefined) {
            return
        }
        const myAxis = new THREE.Vector3(0, 1, 0)
        selectedItem.rotateOnWorldAxis(myAxis, -THREE.Math.degToRad(10))
    }

    const handleDelete = _ => {
        setModelItems(prevState => {
            const result = prevState.filter(itemMesh => itemMesh.uuid !== selectedItem.uuid);
            return result;
        })
    }

    const handleAdd = mesh => {
        setModelItems(prevState => {
            return [...prevState, mesh];
        })
    }

    const handleKeyDown = event => {
        if (selectedItem === undefined) {
            return
        }
        const mesh = selectedItem
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

    const controlFooterProps = {addMoreComponentHandle, saveHandle, reviewHandle}
    const sideBarProps = {handleOnRotationLeft, handleOnRotationRight, handleDelete}


    if (modelItems.length === 0) return null
    return (
        <>
            <Stats/>
            <div style={{display: 'flex', maxHeight: mode === ModeConstant.ADD ? '70vh' : '90vh'}}>
                <SideBarDecoratedBooth {...sideBarProps}/>
                <DecorateBoothCanvas modelItems={modelItems} handleAdd={handleAdd} ref={canvasRef}/>
            </div>

            <ControlFooter {...controlFooterProps}/>
            <SlideMenu/>
            <ToastContainer/>
        </>
    )

}

const DecorateBoothPage = () => {
    const {companyBoothId, jobFairId} = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(decorateBoothAction.reset({}));
        }
    });


    return <DecorateBoothContainer companyBoothId={companyBoothId} jobFairId={jobFairId}/>

}

export default DecorateBoothPage
