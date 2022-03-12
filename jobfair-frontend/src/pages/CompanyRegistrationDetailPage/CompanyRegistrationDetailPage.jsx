import React from 'react';
import CompanyRegistrationDetailContainer
    from "../../containers/CompanyRegistrationDetail/CompanyRegistrationDetail.container";

const CompanyRegistrationDetailPage = () => {
    return (
        <div className="page" style={{marginTop: 80}}>
            <CompanyRegistrationDetailContainer/>
        </div>
    );
};

export default CompanyRegistrationDetailPage;