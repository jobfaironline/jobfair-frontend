import * as THREE from "three";
import BasicControlInput from "./BasicControlInput";

export default class BasicCharacterControl {
  constructor({animations, target, mixer, thirdPersonCamera}) {
    this.animations = animations;
    this.target = target;
    this.mixer = mixer;
    this.thirdPersonCamera = thirdPersonCamera;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -20.0);
    this._acceleration = new THREE.Vector3(1, 2, 200.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._input = new BasicControlInput();
  }


  switchAnimation(){}

  Update(timeInSeconds) {
    const characterTime = timeInSeconds * 0.5;
    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(characterTime);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
      Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this.target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    if (this._input.keys.forward) {
      velocity.z += this._acceleration.z * characterTime;
    }
    if (this._input.keys.backward) {
      velocity.z -= this._acceleration.z * characterTime;
    }
    if (this._input.keys.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, Math.PI * characterTime * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._input.keys.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, -Math.PI * characterTime * this._acceleration.y);
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

    sideways.multiplyScalar(velocity.x * characterTime);
    forward.multiplyScalar(velocity.z * characterTime);


    controlObject.position.add(forward);
    controlObject.position.add(sideways);


    this.switchAnimation();
    oldPosition.copy(controlObject.position);
    this.mixer.update(timeInSeconds);
    this.thirdPersonCamera.Update(timeInSeconds);

  }
}
