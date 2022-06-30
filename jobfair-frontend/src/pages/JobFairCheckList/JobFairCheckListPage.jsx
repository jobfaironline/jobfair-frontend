import './JobFairCheckListPage.styles.scss';
import { JobFairCheckListContainer } from '../../containers/JobFairCheckList/JobFairCheckList.container';
import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

export const JobFairCheckListPage = () => {
  const { jobFairId } = useParams();
  return (
    <PageLayoutWrapper className={'page'}>
      <JobFairCheckListContainer jobFairId={jobFairId} />
    </PageLayoutWrapper>
  );
};
