import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import {
    getCompanyBoothLatestLayout,
    saveDecoratedBooth
} from "../../services/company-booth-layout-controller/CompanyBoothLayoutControllerService";
import {
    fixTextureOffset,
    loadModel, moveModelDown,
    moveModelUp,
    parseModel,
    rotateModelLeft,
    rotateModelRight
} from "../../utils/glbModelUtil";
import {notify} from "../../utils/toastutil";
import {ModeConstant} from "../../constants/AppConst";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import {PATH} from "../../constants/Paths/Path";
import * as THREE from "three";
import {Stats} from "@react-three/drei";
import SideBarDecoratedBooth from "../../components/DecorateBooth/SideBarDecoratedBooth.component";
import {DecorateBoothCanvas} from "../../components/DecorateBooth/DecorateBoothCanavas.component";
import {ControlButtonGroup} from "../../components/DecorateBooth/ControlButtonGroup.component";
import {SampleItemMenuContainer} from "./SampleItemMenu.container";
import {ToastContainer} from "react-toastify";
import {GENERIC_BOOTH_LAYOUT_URL} from "../../constants/DecorateBoothConstant";

export const DecorateBoothContainer = (props) => {
    const {companyBoothId, jobFairId} = props;

    const history = useHistory()
    const dispatch = useDispatch();
    const {mode, selectedItem} = useSelector(state => state.decorateBooth)
    const [modelItems, setModelItems] = useState([]);
    const meshGroupRef = useRef();

    useEffect(async () => {
        let url = GENERIC_BOOTH_LAYOUT_URL
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
        let sceneNode = meshGroupRef.current.parent
        while (sceneNode.type !== 'Scene') {
            sceneNode = sceneNode.parent
        }
        const sceneNodeCopy = sceneNode.clone(false)
        sceneNodeCopy.clear()
        const copyNode = meshGroupRef.current.children.map(mesh => mesh.clone())
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
        rotateModelLeft(selectedItem, 10);
    }

    const handleOnRotationRight = _ => {
        if (selectedItem === undefined) {
            return
        }
        rotateModelRight(selectedItem, 10);
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
        switch (event.keyCode) {
            case 37: //KEY LEFT
                event.preventDefault()
                handleOnRotationLeft()
                break
            case 38: //KEY UP
                event.preventDefault()
                moveModelUp(selectedItem, 0.1)
                break
            case 39: //KEY RIGHT
                event.preventDefault()
                handleOnRotationRight()
                break
            case 40: //KEY DOWN
                event.preventDefault()
                moveModelDown(selectedItem, 0.1)
                break
            case 46: //KEY DEL
                event.preventDefault()
                handleDelete()
                break
        }
    }

    const controlButtonsProps = {addMoreComponentHandle, saveHandle, reviewHandle}
    const sideBarProps = {handleOnRotationLeft, handleOnRotationRight, handleDelete}


    if (modelItems.length === 0) return null
    return (
        <>
            <Stats/>
            <div style={{display: 'flex', maxHeight: mode === ModeConstant.ADD ? '70vh' : '90vh'}}>
                <SideBarDecoratedBooth {...sideBarProps}/>
                <DecorateBoothCanvas modelItems={modelItems} handleAdd={handleAdd} ref={meshGroupRef}/>
            </div>

            <ControlButtonGroup {...controlButtonsProps}/>
            <SampleItemMenuContainer/>
            <ToastContainer/>
        </>
    )

}