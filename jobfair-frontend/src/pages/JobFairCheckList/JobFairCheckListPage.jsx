import './JobFairCheckListPage.styles.scss';
import { JobFairCheckListContainer } from '../../containers/JobFairCheckList/JobFairCheckList.container';
import { useParams } from 'react-router-dom';

export const JobFairCheckListPage = () => {
  const { jobFairId } = useParams();
  return (
    <div className={'page'}>
      <JobFairCheckListContainer jobFairId={jobFairId} />
    </div>
  );
};
