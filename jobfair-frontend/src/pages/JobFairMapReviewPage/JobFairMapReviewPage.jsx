import { JobFairMapReviewContainer } from '../../containers/JobFairMapReview/JobFairMapReview.container';
import { useParams } from 'react-router-dom';

export const JobFairMapReviewPage = () => {
  const { layoutId } = useParams();
  return <JobFairMapReviewContainer layoutId={layoutId} />;
};
