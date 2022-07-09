import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import ResumeDetailForAttendantContainer from '../../containers/Resume/attendant/ResumeDetailForAttendant.container';
import ResumeDetailForCompanyContainer from '../../containers/Resume/company/ResumeDetailForCompany.container';
import RoleType from '../../constants/RoleType';

const ResumeDetailPage = () => {
  const { id } = useParams();
  const { roles: role } = useSelector((state) => state.authentication.user);

  let container = <ResumeDetailForCompanyContainer resumeId={id} />;
  if (role === RoleType.ATTENDANT) container = <ResumeDetailForAttendantContainer resumeId={id} />;

  return <PageLayoutWrapper className={'page'}>{container}</PageLayoutWrapper>;
};
export default ResumeDetailPage;
