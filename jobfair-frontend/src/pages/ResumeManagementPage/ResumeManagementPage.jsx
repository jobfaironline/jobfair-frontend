import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ResumeManagementPage = () => (
    <PageLayoutWrapper className={'page'}>
        <h1>My resume page</h1>
        <MyResumeListContainer/>
    </PageLayoutWrapper>
);

export default ResumeManagementPage;
