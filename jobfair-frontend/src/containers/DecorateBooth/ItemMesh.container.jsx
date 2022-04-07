import * as THREE from 'three';
import { ItemMesh } from '../../components/3D/DecorateBooth/Mesh/ItemMesh.component';
import { ModeConstant } from '../../constants/AppConst';
import {
  calculateMeshDimensionRange,
  calculateMeshSize,
  calculatePositionWithBoundary
} from '../../utils/ThreeJS/threeJSUtil';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-use-gesture';
import React, { useRef, useState } from 'react';

export const ItemMeshContainer = (props) => {
  const { mesh, floorMesh } = props;
  const { selectedItem, mode } = useSelector((state) => state.decorateBooth);
  const itemRef = useRef();
  const [position, setPosition] = useState(mesh.position);
  const dispatch = useDispatch();

  const useDragBind = useDrag(
    ({ event, active }) => {
      if (mode !== ModeConstant.SELECT && mode !== ModeConstant.DRAGGING) return;
      if (selectedItem?.uuid !== itemRef.current.uuid) return;
      if (active) {
        //get intersection point between click coordinate and plane coordinate
        const planeIntersectPoint = new THREE.Vector3();
        const floorPlane = new THREE.Plane(floorMesh.position);
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);

        //calculate new item position on plane
        const { x_range: floor_x_range, z_range: floor_z_range } = calculateMeshDimensionRange(floorMesh);
        const { length: item_length, width: item_width, height: item_height } = calculateMeshSize(mesh);
        const { x, y, z } = calculatePositionWithBoundary({
          x: planeIntersectPoint.x,
          y: mesh.position.y,
          z: planeIntersectPoint.z,
          x_range: floor_x_range,
          y_range: [mesh.position.y + item_height / 2, mesh.position.y + item_height / 2],
          z_range: floor_z_range,
          length: item_length,
          width: item_width,
          height: item_height
        });
        setPosition([x, y, z]);
      }
      if (active && mode !== ModeConstant.DRAGGING) dispatch(decorateBoothAction.setMode(ModeConstant.DRAGGING));

      if (!active && mode === ModeConstant.DRAGGING) dispatch(decorateBoothAction.setMode(ModeConstant.SELECT));
    },
    { pointerEvents: true }
  );

  const onClick = () => {
    if (mode === ModeConstant.ADD) return;
    dispatch(decorateBoothAction.setSelectedItem(itemRef.current));
  };

  const onPointerOver = () => {
    dispatch(decorateBoothAction.setHoverItem(itemRef.current));
  };

  const onPointerLeave = () => {
    dispatch(decorateBoothAction.setHoverItem(undefined));
  };

  const itemMeshProps = {
    position,
    onClick,
    onPointerOver,
    onPointerLeave,
    useDragBind,
    mesh
  };
  return <ItemMesh ref={itemRef} {...itemMeshProps} />;
};
