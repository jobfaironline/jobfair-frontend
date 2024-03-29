import * as THREE from 'three';

export default class BasicCharacterControl {
  constructor({ input, animations, target, mixer, thirdPersonCamera, collidableMeshListRef, zoom, geckoClientRef }) {
    this.animations = animations;
    this.target = target;
    this.mixer = mixer;
    this.thirdPersonCamera = thirdPersonCamera;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -20.0);
    this._acceleration = new THREE.Vector3(1, 2, 200.0 / (0.04 / zoom));
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._input = input;
    this.collidableMeshListRef = collidableMeshListRef;
    this.geckoClientRef = geckoClientRef;
  }

  // eslint-disable-next-line no-empty-function
  switchAnimation() {}

  checkTargetCollision() {
    const self = this;
    const skeleton = new THREE.SkeletonHelper(self.target);
    const bone_min = { x: Infinity, y: Infinity, z: Infinity };
    const bone_max = { x: -Infinity, y: -Infinity, z: -Infinity };
    for (let b = 0; b < skeleton.bones.length; b++) {
      const child = skeleton.bones[b];
      const position = new THREE.Vector3();
      child.getWorldPosition(position);
      if (position.x < bone_min.x) bone_min.x = position.x;

      if (position.y < bone_min.y) bone_min.y = position.y;

      if (position.z < bone_min.z) bone_min.z = position.z;

      if (position.x > bone_max.x) bone_max.x = position.x;

      if (position.y > bone_max.y) bone_max.y = position.y;

      if (position.z > bone_max.z) bone_max.z = position.z;
    }

    const box = new THREE.Box3(
      new THREE.Vector3(bone_min.x, bone_min.y, bone_min.z),
      new THREE.Vector3(bone_max.x, bone_max.y, bone_max.z)
    );

    if (self.collidableMeshListRef !== undefined) {
      for (const child of self.collidableMeshListRef.current.children) {
        if (child.name === 'sand') continue;
        const childBox = new THREE.Box3().setFromObject(child);
        if (box.intersectsBox(childBox)) return true;
      }
      return false;
    }
  }

  Update(timeInSeconds) {
    const characterTime = timeInSeconds * 0.5;
    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(characterTime);
    frameDecceleration.z =
      Math.sign(frameDecceleration.z) * Math.min(Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this.target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    if (this._input.keys.forward) velocity.z += this._acceleration.z * characterTime;

    if (this._input.keys.backward) velocity.z -= this._acceleration.z * characterTime;

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
    const oldQuaternion = new THREE.Quaternion();
    oldQuaternion.copy(controlObject.quaternion);
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

    const distance = Math.abs(
      controlObject.position.x +
        controlObject.position.y +
        controlObject.position.z -
        oldPosition.x -
        oldPosition.y -
        oldPosition.z
    );

    if (distance > 0.01 || !controlObject.quaternion.equals(oldQuaternion)) {
      const obj = {
        position: controlObject.position,
        quaternion: {
          x: controlObject.quaternion._x,
          y: controlObject.quaternion._y,
          z: controlObject.quaternion._z,
          w: controlObject.quaternion._w
        }
      };
      this.geckoClientRef.current.move(obj);
    } else this.geckoClientRef.current.stop();

    this.switchAnimation();
    this.mixer.update(timeInSeconds);
    this.thirdPersonCamera.Update(timeInSeconds);
    /*if (this.checkTargetCollision(scene)){
      controlObject.position.copy(oldPosition)
    }*/
  }
}
