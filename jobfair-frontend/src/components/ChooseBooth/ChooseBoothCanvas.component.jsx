import React, {Fragment, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import {ChildMesh} from "../../pages/JobFairPackPage/components/model/Final_booth_model";
import {EffectComposer, Outline} from "@react-three/postprocessing";
import {ChooseBoothGroundMesh} from "./ChooseBoothGroundMesh.component";
import {ArrowHelper} from "./ArrowHelper.component";
import {Modal} from "antd";

export const ChooseBoothCanvas = (props) => {
    const {mesh, boothData} = props;
    const [hoverRef, setHoverRef] = useState();
    const [modalState, setModalState] = useState({
        isVisible: false,
        boothId: ""
    })
    const handleOk = () => {
        setModalState(prevState => {
            return {...prevState, boothId: "", isVisible: false};
        });
    };

    const handleCancel = () => {
        setModalState(prevState => {
            return {...prevState, boothId: "", isVisible: false};
        });
    };


    const onCompanyGroundPointerOver = (ref) => {
        if (ref?.current?.uuid !== hoverRef?.current?.uuid) {
            setHoverRef(ref);
        }
    }
    const onCompanyGroundPointerOut = (ref) => {
        setHoverRef(undefined);
    }

    const onClick = (boothId) => {
        setModalState(prevState => {
            return {...prevState, boothId: boothId, isVisible: true};
        });

    }


    const cursorStyle = hoverRef === undefined ? "default" : "pointer";
    return (
        <Fragment>
            <Modal title="Confirm booth" visible={modalState.isVisible} onOk={handleOk} onCancel={handleCancel}>
                Are you sure?
            </Modal>
            <Canvas dpr={[1, 2]} camera={{fov: 50}} style={{width: '100%', height: '850px', cursor: cursorStyle}}>
                <OrbitControls/>
                <Stage preset="rembrandt" intensity={0.4} environment="city"
                       contactShadow={false}>
                    <group dispose={null}>
                        {mesh.children.map(childMesh => {
                            if (childMesh.name.includes('company')) {
                                const id = boothData[childMesh.name].id;
                                return <ChooseBoothGroundMesh key={childMesh.uuid} mesh={childMesh}
                                                              onPointerOver={onCompanyGroundPointerOver}
                                                              onPointerLeave={onCompanyGroundPointerOut}
                                                              onClick={() => onClick(id)}
                                />
                            }
                            return <ChildMesh key={childMesh.uuid} mesh={childMesh}/>
                        })}
                        {mesh.children.map(childMesh => {
                            if (childMesh.name.includes('company')) {
                                return <ArrowHelper origin={childMesh.position}/>
                            }
                            return null;
                        })}
                    </group>
                </Stage>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline selection={hoverRef} edgeStrength={100} width={500} hiddenEdgeColor={"green"}
                             visibleEdgeColor={"green"}/>
                </EffectComposer>
            </Canvas>
        </Fragment>

    )
}
