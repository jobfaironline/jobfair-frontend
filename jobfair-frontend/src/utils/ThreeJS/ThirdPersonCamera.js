import * as THREE from "three";

export default class ThirdPersonCamera {
  constructor(params) {
    this._params = params;
    this._cameraRef = params.cameraRef;
    this._height = params.height;
    this._currentLookat = new THREE.Vector3();
  }

  calculateIdealLookAt() {
    const idealLookAt = new THREE.Vector3(0, 0, 0);
    idealLookAt.applyQuaternion(new THREE.Quaternion().setFromEuler(this._params.target.rotation));
    idealLookAt.add(this._params.target.position);
    idealLookAt.y += this._height;
    return idealLookAt;
  }

  Update(timeElapsed) {
    const idealLookAt = this.calculateIdealLookAt();

    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this._currentLookat.lerp(idealLookAt, t);

    this._cameraRef?.current?.lookAt(this._currentLookat);
  }
}
