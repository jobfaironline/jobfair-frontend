import { LayoutManagementContainer } from '../../containers/LayoutManagement/LayoutManagement.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const LayoutManagementPage = () => (
  <PageLayoutWrapper className='page'>
    <LayoutManagementContainer />
  </PageLayoutWrapper>
);

export default LayoutManagementPage;
