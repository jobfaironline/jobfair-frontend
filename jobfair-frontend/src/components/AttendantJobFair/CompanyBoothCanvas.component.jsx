import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {Stage, Stats} from "@react-three/drei";
import React, {useEffect, useRef, useState} from "react";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {CameraControls} from "../ThreeJSBaseComponent/CameraControls.component";
import * as THREE from "three"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {Modal} from "antd";
import {EffectComposer, Outline} from "@react-three/postprocessing";
import Nearby from "nearby-js/Nearby"
import {throttle} from "throttle-debounce";
import {parseFBXModel} from "../../utils/fbxUtil";
import {IMAGE_PLANE_NAME} from "../../constants/DecorateBoothConstant";



class BasicCharacterControls {
    constructor(params) {
        this._Init(params);
    }

    _Init(params) {
        this._params = params;
        this._move = {
            forward: false,
            backward: false,
            left: false,
            right: false,
        };
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -20.0);
        this._acceleration = new THREE.Vector3(1, 2, 200.0);
        this._velocity = new THREE.Vector3(0, 0, 0);


    }



    _onKeyDown(event) {
        console.log('AAAAAAAAAAAA')
        this._params.isMoving.current = true;
        switch (event.keyCode) {

            case 87: // w
                this._move.forward = true;
                break;
            case 65: // a
                this._move.left = true;
                break;
            case 83: // s
                this._move.backward = true;
                break;
            case 68:
            case 231:// d
                this._move.right = true;
                break;
            case 38: // up
            case 37: // left
            case 40: // down
            case 39: // right
                break;
        }
    }

    _onKeyUp(event) {
        this._params.isMoving.current = false;
        switch(event.keyCode) {
            case 87: // w
                this._move.forward = false;
                break;
            case 65: // a
                this._move.left = false;
                break;
            case 83: // s
                this._move.backward = false;
                break;
            case 68: // d
                this._move.right = false;
                break;
            case 38: // up
            case 37: // left
            case 40: // down
            case 39: // right
                break;
        }
    }

    Update(timeInSeconds) {
        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this._params.target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        if (this._move.forward) {
            velocity.z += this._acceleration.z * timeInSeconds;
        }
        if (this._move.backward) {
            velocity.z -= this._acceleration.z * timeInSeconds;
        }
        if (this._move.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        if (this._move.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new THREE.Vector3();
        oldPosition.copy(controlObject.position);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);


        controlObject.position.add(forward);
        controlObject.position.add(sideways);


        if (this._move.right || this._move.forward || this._move.left || this._move.backward){
            if (this._move.backward){
                this._params.animations.walk.timeScale  = -1;
            } else {
                this._params.animations.walk.timeScale  = 1;
            }
            this._params.animations.walk.crossFadeTo(this._params.animations.idle, 2, true);
            this._params.animations.walk.play();


        } else {
            this._params.animations.idle.time = 0.0;
            this._params.animations.idle.enabled = true;
            this._params.animations.idle.setEffectiveTimeScale(1.0);
            this._params.animations.idle.setEffectiveWeight(1.0);
            this._params.animations.idle.crossFadeTo(this._params.animations.walk, 2, true);
            this._params.animations.idle.play();

        }
        oldPosition.copy(controlObject.position);

    }
}

class ThirdPersonCamera {
    constructor(params) {
        this._params = params;
        this._camera = params.camera;

        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();
    }

    _CalculateIdealOffset() {
        const idealOffset = new THREE.Vector3(-15, 20, -30);
        idealOffset.applyQuaternion(new THREE.Quaternion().setFromEuler(this._params.target.rotation));
        idealOffset.add(this._params.target.position);
        return idealOffset;
    }

    _CalculateIdealLookat() {
        const idealLookat = new THREE.Vector3(0, 0, 0);
        idealLookat.applyQuaternion(new THREE.Quaternion().setFromEuler(this._params.target.rotation));
        idealLookat.add(this._params.target.position);
        idealLookat.y += 10
        return idealLookat;
    }

    Update(timeElapsed) {

        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();

        // const t = 0.05;
        // const t = 4.0 * timeElapsed;
        const t = 1.0 - Math.pow(0.001, timeElapsed);

        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);

        //this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
    }
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL;
}

const Model = props => {
    const {model} = props;
    return (
        <primitive
            object={model}
        />
    )
}

const ModelController = props => {
    const {
        nearItem,
        modalRef,
        setNearItem,
        sceneMeshRef,
        nearby,
        model,
        newModel,
    } = props;
    const isMoving = useRef(false);
    const {camera} = useThree();




    const mixer = new THREE.AnimationMixer(model);
    const animations = {
        'walk': mixer.clipAction(model.animations[0]),
        'idle': mixer.clipAction(newModel.animations[0])
    }
    animations.idle.play();
    const onKeyPress = e => {
        if (nearItem === undefined) return;
        if (e.keyCode === 101){
            if (modalRef.current === false){
                modalRef.current = true
                const imagePlane = nearItem.children.filter(child => child.name.includes(IMAGE_PLANE_NAME))[0];
                let url;
                if (imagePlane !== undefined && imagePlane?.material.map !== null){
                    url = getBase64Image(imagePlane.material.map.image);
                }
                const modal = Modal.info({
                    title: 'Updated title',
                    content: url ? <img style={{width: "100%", maxHeight: "50vh"}} src={url}/> : null,
                    onOk: () => {modalRef.current = false;},
                    maskClosable: false,
                    keyboard: false,
                    width: 1000
                });
            }
        }//e
    }

    const params = {
        target: model,
        camera: camera,
        animations: animations,
        isMoving: isMoving,
    }
    const controls = new BasicCharacterControls(params);
    const thirdPersonCamera = new ThirdPersonCamera({
        camera: camera,
        target: model,
    });


    useEffect(() => {
        const keyDown = (e) => controls._onKeyDown(e);
        const keyUp = (e) => controls._onKeyUp(e);
        document.addEventListener('keydown', keyDown, false);
        document.addEventListener('keyup', keyUp, false);
        document.addEventListener('keypress', onKeyPress, false);
        return () => {
            document.removeEventListener('keydown', keyDown)
            document.removeEventListener('keyup', keyUp)
            document.removeEventListener('keypress', onKeyPress)
        }
    })

    const a = throttle(0.1, function () {
        const result = nearby.query(model.position.x, model.position.y, model.position.z);
        let nearestObjectId;
        for (const object of result.keys()){
            nearestObjectId = object.id;
            break;
        }
        if (nearestObjectId !== undefined){
            const mesh = sceneMeshRef.current.getObjectByProperty("uuid", nearestObjectId)
            setNearItem(mesh);
        } else {
            setNearItem(undefined);
        }
    });

    useFrame((state, delta) => {
        a();
        controls?.Update(delta*0.5)
        mixer?.update(delta)
        thirdPersonCamera?.Update(delta);


    })

    return  (
        <primitive
            object={model}
        />
    )


}



export const CompanyBoothCanvasComponent = (props) => {
    const {boothMesh} = props;
    boothMesh.scale.setScalar(2);
    const floorMesh = boothMesh.children.filter(child => child.name === "sand")[0];
    const floorHeight = floorMesh.scale.y * Math.abs(floorMesh.geometry.boundingBox.max.y - floorMesh.geometry.boundingBox.min.y);
    const center = floorMesh.position.y + floorHeight / 2;
    const modalRef = useRef(false);

    const [state, setState] = useState({
        model: undefined,
        newModel: undefined,
        nearby: undefined,
    });



    useEffect(async () => {
        const model = await parseFBXModel("https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking (5).fbx");
        model.scale.setScalar(0.07);

        model.position.setY(center*2)

        model.children.forEach(child => {
            if (child.isMesh) {
                child.castShadow = true
                child.receiveShadow = true
                child.material.side = THREE.FrontSide
            }
        })
        const newModel = await  parseFBXModel( "https://d3polnwtp0nqe6.cloudfront.net/FBX/Standing Idle (1).fbx");

        const sceneWidth = 1000, sceneHeight = 1000, sceneDepth = 1000;
        const binSize = 1;
        // Creates a world centered in (0, 0, 0) of size (1000x1000x1000)
        // The world is splitted into cubes of (50x50x50).
        const nearby = new Nearby(sceneWidth, sceneHeight, sceneDepth, binSize);

        boothMesh.children.forEach(child => {
            if (child.name === "sand") return;
            const a = new THREE.Vector3();
            child.geometry.boundingBox.getSize(a)
            const box = nearby.createBox(
                child.position.x, child.position.y, child.position.z,
                a.x, a.y, a.z
            );
            const objectID = child.uuid;
            const object = nearby.createObject(objectID, box);

            nearby.insert(object)
        });
        setState(prevState => {
            return {...prevState, model: model, newModel: newModel, nearby: nearby};
        })
    }, [])



    //const model = useLoader(FBXLoader, 'https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking (5).fbx')
    //const newModel = useLoader(FBXLoader, "https://d3polnwtp0nqe6.cloudfront.net/FBX/Standing Idle (1).fbx")
    const [nearItem, setNearItem] = useState();
    const sceneMeshRef = useRef()


    if (state.model === undefined || state.newModel === undefined) return null;

    const modelProps = {
        boothMesh,
        modalRef,
        setNearItem,
        sceneMeshRef,
        nearby: state.nearby,
        model: state.model,
        newModel: state.newModel,
        nearItem
    }

    return (
        <div style={{width: '100%', height: '100vh'}}>
            <Canvas
                dpr={[1, 2]}
                camera={{fov: 45, zoom: 2}}
                style={{width: '100%', height: '100vh'}}
            >
                <CameraControls/>

                <Stage adjustCamera={false} preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
                    <BasicMesh ref={sceneMeshRef} mesh={boothMesh}/>
                    <ModelController {...modelProps}/>
                </Stage>
                <EffectComposer multisampling={8} autoClear={false}>
                    <Outline
                        selection={nearItem}
                        visibleEdgeColor="yellow"
                        hiddenEdgeColor="yellow"
                        edgeStrength={100}
                        width={1000}/>
                </EffectComposer>
            </Canvas>
        </div>

    )
}