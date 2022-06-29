import { BoothLayoutType } from '../../constants/LayoutConstant';
import { ReviewBoothLayoutContainer } from '../../containers/3D/ReviewBoothLayout/ReviewBoothLayout.container';
import { useParams } from 'react-router-dom';

export const JobFairBoothReviewPage = () => {
  const { boothId } = useParams();
  return (
    <div style={{ width: '100%', height: 'calc(100vh - 124px)', paddingTop: '124px' }}>
      <ReviewBoothLayoutContainer type={BoothLayoutType.GENERAL} id={boothId} />
    </div>
  );
};
