import './ResumeEditPage.styles.scss';
import { EditResumeContainer } from '../../containers/Resume/attendant/EditResume.container';
import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ResumeDetailPage = () => {
  const { id } = useParams();

  return (
    <PageLayoutWrapper className={'page resume-edit-page'}>
      <EditResumeContainer resumeId={id} />;
    </PageLayoutWrapper>
  );
};
export default ResumeDetailPage;
