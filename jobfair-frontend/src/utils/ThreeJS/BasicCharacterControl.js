import * as THREE from "three";
import BasicControlInput from "./BasicControlInput";

export default class BasicCharacterControl {
  constructor({animations, target, mixer, thirdPersonCamera, collidableMeshListRef}) {
    this.animations = animations;
    this.target = target;
    this.mixer = mixer;
    this.thirdPersonCamera = thirdPersonCamera;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -20.0);
    this._acceleration = new THREE.Vector3(1, 2, 200.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._input = new BasicControlInput();
    this.collidableMeshListRef = collidableMeshListRef;
  }


  switchAnimation() {
  }

  checkTargetCollision(scene) {
    const self = this;
    const skeleton = new THREE.SkeletonHelper(self.target);
    var bone_min = {x: Infinity, y: Infinity, z: Infinity};
    var bone_max = {x: -Infinity, y: -Infinity, z: -Infinity};
    for (var b = 0; b < skeleton.bones.length; b++) {
      var child = skeleton.bones[b];
      var position = new THREE.Vector3();
      child.getWorldPosition(position);
      if (position.x < bone_min.x) {
        bone_min.x = position.x;
      }
      if (position.y < bone_min.y) {
        bone_min.y = position.y;
      }
      if (position.z < bone_min.z) {
        bone_min.z = position.z;
      }
      if (position.x > bone_max.x) {
        bone_max.x = position.x;
      }
      if (position.y > bone_max.y) {
        bone_max.y = position.y;
      }
      if (position.z > bone_max.z) {
        bone_max.z = position.z;
      }
    }

    const box = new THREE.Box3(new THREE.Vector3(bone_min.x, bone_min.y, bone_min.z), new THREE.Vector3(bone_max.x, bone_max.y, bone_max.z))


    if (self.collidableMeshListRef !== undefined) {
      for (const child of self.collidableMeshListRef.current.children) {
        if (child.name === "sand") continue
        const childBox = new THREE.Box3().setFromObject(child);
        if (box.intersectsBox(childBox)) return true;
      }
      return false;
    }
  }


  Update(timeInSeconds, scene) {
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
    this.mixer.update(timeInSeconds);
    this.thirdPersonCamera.Update(timeInSeconds);
    if (this.checkTargetCollision(scene)){
      controlObject.position.copy(oldPosition)
    }

  }
}


function updateAABB(skinnedMesh) {
  var vertex = new THREE.Vector3();
  var temp = new THREE.Vector3();
  var skinned = new THREE.Vector3();
  var skinIndices = new THREE.Vector4();
  var skinWeights = new THREE.Vector4();
  var boneMatrix = new THREE.Matrix4();
  var aabb = new THREE.Box3();
  var skeleton = skinnedMesh.skeleton;
  var boneMatrices = skeleton.boneMatrices;
  var geometry = skinnedMesh.geometry;

  var index = geometry.index;
  var position = geometry.attributes.position;
  var skinIndex = geometry.attributes.skinIndex;
  var skinWeigth = geometry.attributes.skinWeight;

  var bindMatrix = skinnedMesh.bindMatrix;
  var bindMatrixInverse = skinnedMesh.bindMatrixInverse;

  var i, j, si, sw;

  aabb.makeEmpty();

  if (index !== null) {

    // indexed geometry

    for (i = 0; i < index.count; i++) {

      vertex.fromBufferAttribute(position, index[i]);
      skinIndices.fromBufferAttribute(skinIndex, index[i]);
      skinWeights.fromBufferAttribute(skinWeigth, index[i]);

      // the following code section is normally implemented in the vertex shader

      vertex.applyMatrix4(bindMatrix); // transform to bind space
      skinned.set(0, 0, 0);

      for (j = 0; j < 4; j++) {

        si = skinIndices.getComponent(j);
        sw = skinWeights.getComponent(j);
        boneMatrix.fromArray(boneMatrices, si * 16);

        // weighted vertex transformation

        temp.copy(vertex).applyMatrix4(boneMatrix).multiplyScalar(sw);
        skinned.add(temp);

      }

      skinned.applyMatrix4(bindMatrixInverse); // back to local space

      // expand aabb

      aabb.expandByPoint(skinned);

    }

  } else {
    for (i = 0; i < position.count; i++) {

      vertex.fromBufferAttribute(position, i);
      skinIndices.fromBufferAttribute(skinIndex, i);
      skinWeights.fromBufferAttribute(skinWeigth, i);

      // the following code section is normally implemented in the vertex shader

      vertex.applyMatrix4(bindMatrix); // transform to bind space
      skinned.set(0, 0, 0);

      for (j = 0; j < 4; j++) {

        si = skinIndices.getComponent(j);
        sw = skinWeights.getComponent(j);
        boneMatrix.fromArray(boneMatrices, si * 16);

        // weighted vertex transformation

        temp.copy(vertex).applyMatrix4(boneMatrix).multiplyScalar(sw);
        skinned.add(temp);

      }

      skinned.applyMatrix4(bindMatrixInverse); // back to local space

      // expand aabb

      aabb.expandByPoint(skinned);

    }
  }

  aabb.applyMatrix4(skinnedMesh.matrixWorld);
  return aabb;

}