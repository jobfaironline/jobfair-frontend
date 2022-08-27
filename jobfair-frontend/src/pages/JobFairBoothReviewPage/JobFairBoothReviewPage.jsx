import { BoothLayoutType } from '../../constants/LayoutConstant';
import { NAVBAR_HEIGHT } from '../../styles/custom-theme';
import { ReviewBoothLayoutContainer } from '../../containers/3D/ReviewBoothLayout/ReviewBoothLayout.container';
import { useParams } from 'react-router-dom';

export const JobFairBoothReviewPage = () => {
  const { boothId } = useParams();
  return (
    <div style={{ width: '100%', height: `calc(100vh - ${NAVBAR_HEIGHT})`, paddingTop: '80px' }}>
      <ReviewBoothLayoutContainer type={BoothLayoutType.GENERAL} id={boothId} isPage={true} />
    </div>
  );
};
