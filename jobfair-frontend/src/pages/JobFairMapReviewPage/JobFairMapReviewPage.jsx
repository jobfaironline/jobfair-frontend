import { JobFairMapReviewContainer } from '../../containers/JobFairMapReview/JobFairMapReview.container';
import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

export const JobFairMapReviewPage = () => {
  const { layoutId } = useParams();
  return (
    <PageLayoutWrapper className={'page fullscreen-page'}>
      <JobFairMapReviewContainer layoutId={layoutId} />
    </PageLayoutWrapper>
  );
};
