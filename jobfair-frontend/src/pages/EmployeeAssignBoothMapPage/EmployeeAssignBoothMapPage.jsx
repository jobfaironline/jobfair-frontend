import { EmployeeAssignBoothMapContainer } from '../../containers/3D/EmployeeAssignBoothMap/EmployeeAssignBoothMap.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const EmployeeAssignBoothMapPage = () => (
  <PageLayoutWrapper className='page fullscreen-page'>
    <EmployeeAssignBoothMapContainer />
  </PageLayoutWrapper>
);

export default EmployeeAssignBoothMapPage;
