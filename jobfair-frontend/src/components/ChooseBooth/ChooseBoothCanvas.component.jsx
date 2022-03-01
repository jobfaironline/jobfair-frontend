import React, {Fragment, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import {ChildMesh} from "../../pages/DecorateBoothPage/components/model/Final_booth_model";
import {EffectComposer, Outline} from "@react-three/postprocessing";
import {ChooseBoothGroundMesh} from "./ChooseBoothGroundMesh.component";
import {ArrowHelper} from "./ArrowHelper.component";
import {Modal} from "antd";
import {getLatestApproveRegistration} from "../../services/jobfairService";
import {useHistory} from "react-router-dom";
import {purchaseBooth} from "../../services/boothPurchaseService";

export const ChooseBoothCanvas = (props) => {
    const {mesh, boothData, jobFairId} = props;
    const history = useHistory();
    const [hoverRef, setHoverRef] = useState();
    const [modalState, setModalState] = useState({
        isVisible: false,
        boothId: ""
    })
    const handleOk = async () => {
        let data = await getLatestApproveRegistration(jobFairId).then(response => response.data);
        const registrationId = data.id;
        data = await purchaseBooth({
            'boothId': modalState.boothId,
            'companyRegistrationId': registrationId,
        }).then(response => response.data);
        history.push(`/decorate-booth/${data.id}`);
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


    return (
        <Fragment>
            <Modal title="Confirm booth" visible={modalState.isVisible} onOk={handleOk} onCancel={handleCancel}>
                Are you sure?
            </Modal>
            <Canvas dpr={[1, 2]} camera={{fov: 50}} style={{width: '100%', height: '850px', cursor: hoverRef === undefined ? "default" : "pointer"}}>
                <OrbitControls/>
                <Stage preset="rembrandt" intensity={0.4} environment="city"
                       contactShadow={false}>
                    <group dispose={null}>
                        {mesh.children.map(childMesh => {
                            if (childMesh.name.includes('company')) {
                                const id = boothData[childMesh.name]?.id;
                                return <ChooseBoothGroundMesh key={childMesh.uuid} mesh={childMesh}
                                                              isAvailable={boothData[childMesh.name] !== undefined}
                                                              onPointerOver={onCompanyGroundPointerOver}
                                                              onPointerLeave={onCompanyGroundPointerOut}
                                                              onClick={() => onClick(id)}
                                />
                            }
                            return <ChildMesh key={childMesh.uuid} mesh={childMesh}/>
                        })}
                        {mesh.children.map(childMesh => {
                            if (childMesh.name.includes('company')  && boothData[childMesh.name] !== undefined) {
                                return <ArrowHelper origin={childMesh.position}/>
                            }
                            return null;
                        })}
                    </group>
                </Stage>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline selection={hoverRef} edgeStrength={100} width={1000} hiddenEdgeColor={"green"}
                             visibleEdgeColor={"green"}/>
                </EffectComposer>
            </Canvas>
        </Fragment>

    )
}
