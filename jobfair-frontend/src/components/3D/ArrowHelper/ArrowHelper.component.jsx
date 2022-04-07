import * as THREE from 'three';
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import React, { useRef } from 'react';

export const ArrowHelper = (props) => {
  const { origin, color, length, distance } = props;
  const ref = useRef();
  const dir = new THREE.Vector3(0, -1, 0);
  //normalize the direction vector (convert to vector of length 1)
  dir.normalize();

  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, color);
  arrowHelper.position.setY(distance);

  return <BasicMesh ref={ref} mesh={arrowHelper} />;
};
