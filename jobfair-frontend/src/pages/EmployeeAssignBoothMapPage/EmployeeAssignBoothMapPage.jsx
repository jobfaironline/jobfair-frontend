import { EmployeeAssignBoothMapContainer } from '../../containers/3D/EmployeeAssignBoothMap/EmployeeAssignBoothMap.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const EmployeeAssignBoothMapPage = () => (
  <PageLayoutWrapper className='page fullscreen-page'>
    <EmployeeAssignBoothMapContainer />
  </PageLayoutWrapper>
);

export default EmployeeAssignBoothMapPage;
