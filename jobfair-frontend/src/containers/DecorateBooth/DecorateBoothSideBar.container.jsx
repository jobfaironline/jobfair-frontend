/* eslint-disable no-unused-vars */
import * as THREE from 'three';
import { DecorateBoothSideBarComponent } from '../../components/DecoratedBoothSideBar/DecoratedBoothSideBar.component';
import { IMAGE_PLANE_NAME } from '../../constants/DecorateBoothConstant';
import { getBase64 } from '../../utils/common';
import { notify } from '../../utils/toastutil';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export const DecoratedBoothSideBarContainer = (props) => {
  const { handleOnRotationLeft, handleOnRotationRight, handleDelete } = props;

  const selectedItem = useSelector((state) => state.decorateBooth.selectedItem);

  const [currentSelectedColor, setCurrentSelectedColor] = useState(selectedItem?.material.color.getHexString());
  const [positionState, setPositionState] = useState({
    x: selectedItem?.position.x ?? 0,
    y: selectedItem?.position.y ?? 0,
    z: selectedItem?.position.z ?? 0
  });
  const loadFile = {
    beforeUpload: (file) => false,
    onChange: async (info) => {
      if (info.file.type !== 'image/png' && info.file.type !== 'image/jpeg' && info.file.type !== 'video/mp4') {
        notify(0, `Upload file must be png, jpg or mp4`);
        return;
      }
      if (selectedItem === undefined) return;

      let texture;
      if (info.file.type === 'video/mp4') {
        const vid = document.createElement('video');

        const reader = new FileReader();

        vid.crossOrigin = 'Anonymous';
        vid.loop = true;
        vid.muted = true;
        vid.play();
        texture = new THREE.VideoTexture(vid);
        const meshName = selectedItem?.name;
        reader.onload = function (e) {
          vid.src = e.target.result;
        };
        reader.readAsDataURL(info.file);
      } else {
        const base64Url = await getBase64(info.file);
        texture = new THREE.TextureLoader().load(base64Url);
      }
      texture.flipY = false;
      texture.encoding = THREE.sRGBEncoding;

      const screenMesh = selectedItem?.clone(false);
      screenMesh.clear();

      //check if screenMesh is a plane

      if (
        screenMesh.geometry.boundingBox.max.x - screenMesh.geometry.boundingBox.min.x === 0 ||
        screenMesh.geometry.boundingBox.max.y - screenMesh.geometry.boundingBox.min.y === 0 ||
        screenMesh.geometry.boundingBox.max.z - screenMesh.geometry.boundingBox.min.z === 0
      ) {
        texture.center.x = 0.5;
        texture.center.y = 0.5;
        texture.center.set(0.5, 0.5);
        texture.rotation = Math.PI / 2;

        const newMaterial = selectedItem?.material.clone();
        newMaterial.size = THREE.DoubleSide;
        newMaterial.map = texture;
        selectedItem.material = newMaterial;
        return;
      }

      //get screenSize
      const scale = screenMesh.scale;
      const localSize = new THREE.Vector3();
      screenMesh.geometry.boundingBox.getSize(localSize);
      const screenSize = new THREE.Vector3(scale.x * localSize.x, scale.y * localSize.y, scale.z * localSize.z);

      //calculate which dimension is the length and which dimension is the width
      let width;
      if (screenSize.x > screenSize.z) width = screenSize.x / screenMesh.scale.x;
      else width = screenSize.z / screenMesh.scale.z;

      let plane;
      //create new plane
      const geometry = new THREE.PlaneGeometry(width, screenSize.y / screenMesh.scale.y);
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        map: texture
      });
      // eslint-disable-next-line prefer-const
      plane = new THREE.Mesh(geometry, material);
      plane.name = IMAGE_PLANE_NAME;
      //rotate plane to face the screen direction
      if (screenSize.x > screenSize.z) {
        const myAxis = new THREE.Vector3(0, 0, 1);
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(180));

        plane.position.setZ(-screenSize.z / 2 / screenMesh.scale.z - 0.05);
      } else {
        let myAxis = new THREE.Vector3(0, 1, 0);
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(90));
        myAxis = new THREE.Vector3(0, 0, 1);
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(180));

        plane.position.setX(-screenSize.x / 2 / screenMesh.scale.x - 0.05);
      }

      const prevPlane = selectedItem?.getObjectByName(IMAGE_PLANE_NAME);
      if (prevPlane !== undefined) selectedItem?.remove(prevPlane);

      selectedItem?.add(plane);
    },
    showUploadList: false
  };
  const handleOnchangePositionX = (value) => {
    if (selectedItem === undefined) return;

    selectedItem.position.setX(value);
    setPositionState((prevState) => ({
      ...prevState,
      x: value
    }));
  };
  const handleOnchangePositionY = (value) => {
    if (selectedItem === undefined) return;

    selectedItem.position.setY(value);
    setPositionState((prevState) => ({
      ...prevState,
      y: value
    }));
  };
  const handleOnchangePositionZ = (value) => {
    if (selectedItem === undefined) return;

    selectedItem.position.setZ(value);
    setPositionState((prevState) => ({
      ...prevState,
      z: value
    }));
  };
  const handleOnChangeColor = (color) => {
    if (selectedItem === undefined) return;

    const newMaterial = selectedItem.material.clone();
    newMaterial.color.set(color.hex);
    newMaterial.transparent = true;
    selectedItem.material = newMaterial;
    for (const childMesh of selectedItem.children) {
      if (childMesh.name === IMAGE_PLANE_NAME) continue;

      childMesh.material = newMaterial;
    }
    setCurrentSelectedColor(color);
  };

  if (!selectedItem) return null;

  const componentProps = {
    selectedItem,
    handleOnchangePositionZ,
    handleOnchangePositionX,
    handleOnchangePositionY,
    handleOnRotationLeft,
    handleOnRotationRight,
    loadFile,
    handleDelete,
    handleOnChangeColor
  };

  return <DecorateBoothSideBarComponent {...componentProps} />;
};
