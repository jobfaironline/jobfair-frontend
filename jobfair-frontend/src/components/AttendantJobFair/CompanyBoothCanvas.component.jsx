import {Canvas, useFrame, useLoader, useThree} from "@react-three/fiber";
import {OrbitControls, Stage, useAnimations, useFBX, useGLTF} from "@react-three/drei";
import React, {useRef} from "react";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {CameraControls} from "../ThreeJSBaseComponent/CameraControls.component";
import * as THREE from "three"
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";


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

        document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
        document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
    }

    _onKeyDown(event) {
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

            }
            this._params.animations.walk.timeScale  = 1;
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

const Model = props => {
    const {center} = props;
    const isMoving = useRef(false);
    const model = useLoader(FBXLoader, 'https://d3polnwtp0nqe6.cloudfront.net/FBX/Walking (5).fbx')
    const newModel = useLoader(FBXLoader, "https://d3polnwtp0nqe6.cloudfront.net/FBX/Standing Idle (1).fbx")
    const {camera} = useThree();


    const mixer = new THREE.AnimationMixer(model);
    const animations = {
        'walk': mixer.clipAction(model.animations[0]),
        'idle': mixer.clipAction(newModel.animations[0])
    }


    animations.idle.play();
    model.scale.setScalar(0.07);

    model.position.setY(center*2)

    model.children.forEach(child => {
        if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            child.material.side = THREE.FrontSide
        }
    })

    const params = {
        target: model,
        camera: camera,
        animations: animations,
        isMoving: isMoving
    }
    const _controls = new BasicCharacterControls(params);
    const thirdPersonCamera = new ThirdPersonCamera({
        camera: camera,
        target: model,
    });

    useFrame((state, delta) => {

        _controls.Update(delta*0.5)
        mixer?.update(delta)
        thirdPersonCamera.Update(delta);


    })


    return (
        <primitive
            object={model}
            scale={props.scale}
        />
    )
}

function loadCharacter() {
    const loader = new FBXLoader();
    loader.load("./T-Pose.fbx", (fbx) => {
        fbx.scale.setScalar(0.1);
        fbx.traverse(c => c.castShadow = true);

        const animationLoader = new FBXLoader();
        animationLoader.load("./Walking.fbx", (anim) => {
            const mixer = new THREE.AnimationMixer(fbx);
            const idle = mixer.clipAction(anim.animation[0]);
            idle.play();
        });
    });
}

export const CompanyBoothCanvasComponent = (props) => {
    const {boothMesh} = props;
    boothMesh.scale.setScalar(2);
    const floorMesh = boothMesh.children.filter(child => child.name === "sand")[0];
    const floorHeight = floorMesh.scale.y * Math.abs(floorMesh.geometry.boundingBox.max.y - floorMesh.geometry.boundingBox.min.y);
    const center = floorMesh.position.y + floorHeight / 2;
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{fov: 45, position: [-10, 10, -10]}}
            style={{width: '100%', height: '850px'}}
        >
            <CameraControls />

            <Stage adjustCamera={false} preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
                <BasicMesh mesh={boothMesh}/>
                <Model center={center}/>
            </Stage>
        </Canvas>
    )
}