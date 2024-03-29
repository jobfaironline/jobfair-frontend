/* eslint-disable no-unused-vars */
import * as THREE from 'three';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { DecorateBoothSideBarComponent } from '../../../components/customized-components/DecoratedBoothTool/DecoratedBoothSideBar/DecoratedBoothSideBar.component';
import { IMAGE_PLANE_NAME } from '../../../constants/3DConst';
import { decorateBoothAction } from '../../../redux-flow/decorateBooth/decorate-booth-slice';
import { getBase64 } from '../../../utils/common';
import { notify } from '../../../utils/toastutil';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useState } from 'react';

export const DecoratedBoothSideBarContainer = (props) => {
  const { handleOnRotationLeft, handleOnRotationRight, handleDelete, rendererRef } = props;

  const selectedItem = useSelector((state) => state.decorateBooth.selectedItem);
  const dispatch = useDispatch();

  const [currentSelectedColor, setCurrentSelectedColor] = useState(selectedItem?.material.color.getHexString());
  const [positionState, setPositionState] = useState({
    x: selectedItem?.position.x ?? 0,
    y: selectedItem?.position.y ?? 0,
    z: selectedItem?.position.z ?? 0
  });

  const uploadFileRef = useRef();

  const handleUpVideoCropImage = (file) => {
    if (file.type.includes('video')) {
      uploadFileRef.current = file;
      return false;
    }
    return true;
  };

  const loadFile = {
    beforeUpload: (file) => {
      uploadFileRef.current = file;
      return false;
    },
    onChange: async (info) => {
      const file = uploadFileRef.current;
      if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'video/mp4') {
        notify(0, `Upload file must be png, jpg or mp4`);
        return;
      }
      if (selectedItem === undefined) return;

      let texture;
      if (file.type === 'video/mp4') {
        const vid = document.createElement('video');

        const reader = new FileReader();

        vid.crossOrigin = 'Anonymous';
        vid.loop = true;
        vid.muted = true;
        vid.play();
        texture = new THREE.VideoTexture(vid);
        reader.onload = function (e) {
          vid.src = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        const base64Url = await getBase64(file);
        texture = new THREE.TextureLoader().load(base64Url);
      }
      texture.flipY = false;
      texture.encoding = THREE.sRGBEncoding;

      const screenItem = selectedItem?.clone(false);
      const screenMesh = screenItem.getObjectByName('Media');

      const scale = screenMesh.scale;
      const localSize = new THREE.Vector3();
      screenMesh.geometry.boundingBox.getSize(localSize);
      const screenSize = new THREE.Vector3(scale.x * localSize.x, scale.y * localSize.y, scale.z * localSize.z);

      //calculate which dimension is the length and which dimension is the width
      let width;
      if (screenSize.x > screenSize.z) width = localSize.x;
      else width = localSize.z;

      //create new plane
      const geometry = new THREE.PlaneGeometry(width, localSize.y);
      const material = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: texture
      });

      //get screen center point
      const middle = new THREE.Vector3();
      screenMesh.geometry.computeBoundingBox();

      const vectors = ['x', 'y', 'z'];
      vectors.forEach((vector) => {
        middle[vector] =
          (screenMesh.geometry.boundingBox.max[vector] + screenMesh.geometry.boundingBox.min[vector]) / 2;
      });

      const plane = new THREE.Mesh(geometry, material);
      plane.name = IMAGE_PLANE_NAME;

      //rotate plane to face the screen direction
      if (screenSize.x > screenSize.z) {
        const myAxis = new THREE.Vector3(0, 0, 1);
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(180));
        plane.position.setZ(-screenSize.z / 2 / screenMesh.scale.z - 0.4);
      } else {
        let myAxis = new THREE.Vector3(0, 1, 0);
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(90));
        myAxis = new THREE.Vector3(0, 0, 1);
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(180));
        plane.position.setX(-screenSize.x / 2 / screenMesh.scale.x - 0.4);
      }
      plane.position.setY(middle.y);

      const realScreen = selectedItem?.getObjectByName('Media');
      const prevPlane = realScreen?.getObjectByName(IMAGE_PLANE_NAME);
      if (prevPlane !== undefined) realScreen?.remove(prevPlane);
      realScreen.add(plane);
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

  const onChangeBrightness = (value) => {
    if (selectedItem === undefined) return;
    const screenMesh = selectedItem.getObjectByName('Media');
    if (screenMesh === undefined) return;
    const imagePlane = screenMesh.getObjectByName(IMAGE_PLANE_NAME);

    if (!imagePlane) return;
    let newMaterial;
    if (imagePlane.material.isMeshBasicMaterial) {
      newMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: imagePlane.material.map
      });
    } else newMaterial = imagePlane.material.clone();

    if (value < 50) {
      const blackVal = Math.round((value * 255) / 50);
      const bkgrnd = `rgb(${blackVal}, ${blackVal}, ${blackVal})`;
      newMaterial.color = new THREE.Color(bkgrnd);
      newMaterial.emissive = new THREE.Color(0x000000);
    } else {
      const white = Math.round(((value - 50) * 255) / 50);
      const bkgrnd = `rgb(${white}, ${white}, ${white})`;
      newMaterial.emissive = new THREE.Color(bkgrnd);
      newMaterial.color = new THREE.Color(0xffffff);
    }

    imagePlane.material = newMaterial;
  };

  const onChangeSharpness = (value) => {
    if (selectedItem === undefined) return;
    const screenItem = selectedItem?.clone(false);
    const screenMesh = screenItem.getObjectByName('Media');
    const imagePlane = screenMesh.getObjectByName(IMAGE_PLANE_NAME);

    if (!imagePlane) return;
    switch (value) {
      case 0:
        imagePlane.material.map.minFilter = THREE.LinearMipMapLinearFilter;
        imagePlane.material.map.anisotropy = 1;
        imagePlane.material.map.needsUpdate = true;
        break;
      case 1:
        imagePlane.material.map.minFilter = THREE.LinearMipMapLinearFilter;
        imagePlane.material.map.anisotropy = rendererRef.current.getMaxAnisotropy();
        imagePlane.material.map.needsUpdate = true;
        break;
      case 2:
        imagePlane.material.map.minFilter = THREE.LinearFilter;
        imagePlane.material.map.anisotropy = 1;
        imagePlane.material.map.needsUpdate = true;
        break;
    }
  };

  const calculateScreenRation = () => {
    if (selectedItem === undefined) return 0;
    const screenItem = selectedItem?.clone(false);
    const screenMesh = screenItem.getObjectByName('Media');
    if (screenMesh === undefined) return 0;
    const scale = screenMesh.scale;
    const localSize = new THREE.Vector3();
    screenMesh.geometry.boundingBox.getSize(localSize);
    const screenSize = new THREE.Vector3(scale.x * localSize.x, scale.y * localSize.y, scale.z * localSize.z);
    const width = screenSize.x > screenSize.z ? screenSize.x : screenSize.z;
    return width / screenSize.y;
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
    handleOnChangeColor,
    onChangeBrightness,
    onChangeSharpness,
    ratio: calculateScreenRation(),
    handleUpVideoCropImage
  };

  return (
    <div style={{ border: '1px solid rgba(0, 0, 0, 0.063)' }}>
      <div style={{ width: '331px', padding: '0.5rem', border: '1px solid #00000010' }}>
        <ArrowLeftOutlined onClick={() => dispatch(decorateBoothAction.setSelectedItem(undefined))} />
      </div>
      <DecorateBoothSideBarComponent {...componentProps} />
    </div>
  );
};
