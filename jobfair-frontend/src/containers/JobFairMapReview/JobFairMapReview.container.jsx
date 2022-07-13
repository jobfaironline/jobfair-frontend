import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { getLayoutDetail } from '../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { useEffect, useState } from 'react';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';

export const JobFairMapReviewContainer = ({ layoutId }) => {
  const [layoutGlb, setLayoutGlb] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const layoutData = (await getLayoutDetail(layoutId)).data;
    const glb = await loadGLBModel(layoutData.url);
    setLayoutGlb(glb.scene);
  };

  if (layoutGlb === undefined) return <LoadingComponent isWholePage={true} />;

  return (
    <div>
      <JobFairParkMapComponent mapMesh={layoutGlb} />
    </div>
  );
};
