import AdminDashBoardContainer from '../../containers/AdminDashboard/AdminDashboard.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const AdminDashboardPage = () => (
  <PageLayoutWrapper className='page'>
    <AdminDashBoardContainer />
  </PageLayoutWrapper>
);

export default AdminDashboardPage;
