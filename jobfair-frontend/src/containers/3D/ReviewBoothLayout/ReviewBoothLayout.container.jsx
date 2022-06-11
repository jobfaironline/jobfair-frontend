import { BasicMesh } from '../../../components/3D/ThreeJSBaseComponent/ChildMesh.component';
import { BoothLayoutType } from '../../../constants/LayoutConstant';
import { CameraControls } from '../../../components/3D/ThreeJSBaseComponent/CameraControls.component';
import { Canvas } from '@react-three/fiber';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { Stage } from '@react-three/drei';
import { addVideoTexture, fixTextureOffset, loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import { getCompanyBoothLatestLayout } from '../../../services/jobhub-api/CompanyBoothLayoutControllerService';
import { getMyBoothLayoutById } from '../../../services/jobhub-api/DecoratorBoothLayoutController';
import { notification } from 'antd';
import React, { useEffect, useState } from 'react';

export const ReviewBoothLayoutContainer = ({ id, type }) => {
  const [boothItems, setBoothItems] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const companyBoothLayoutVideos = {};
    let url;
    try {
      switch (type) {
        //check Layout.js constant to know the type usage
        case BoothLayoutType.GENERAL: {
          const response = await getCompanyBoothLatestLayout(id);
          url = response.data.url;
          response.data.companyBoothLayoutVideos?.forEach((data) => {
            companyBoothLayoutVideos[data.itemName] = data.url;
          });
          break;
        }
        case BoothLayoutType.DECORATOR: {
          const response = await getMyBoothLayoutById(id);
          url = response.data.url;
          response.data.companyBoothLayoutVideos?.forEach((data) => {
            companyBoothLayoutVideos[data.itemName] = data.url;
          });
          break;
        }
        default:
          throw new Error('Invalid type');
      }
    } catch (err) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
    //parse file and get items
    const glb = await loadGLBModel(url);
    const result = glb.scene.children;
    for (const mesh of result) {
      addVideoTexture(mesh, companyBoothLayoutVideos);
      fixTextureOffset(mesh);
    }
    setBoothItems(result);
  };

  if (boothItems === undefined) return <LoadingComponent />;
  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 40, zoom: 1.2, position: [-1, 1, -1] }}>
      <CameraControls />
      <Stage adjustCamera={false} preset='rembrandt' intensity={0.4} environment='city' contactShadow={false}>
        <group dispose={null}>
          {boothItems.map((mesh) => (
            <BasicMesh key={mesh.uuid} mesh={mesh} />
          ))}
        </group>
      </Stage>
    </Canvas>
  );
};
