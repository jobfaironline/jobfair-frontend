import React from 'react';
import CompanyRegistrationDetailContainer
    from "../../containers/CompanyRegistrationDetail/CompanyRegistrationDetail.container";
import {PageHeader} from "antd";
import {useHistory} from "react-router-dom";

const CompanyRegistrationDetailPage = () => {
    const history = useHistory()
    return (
        <div className="page" style={{marginTop: 80}}>
            <PageHeader
                className="site-page-header"
                onBack={() => history.goBack()}
                title="Back"
                subTitle=""
            />
            <CompanyRegistrationDetailContainer/>
        </div>
    );
};

export default CompanyRegistrationDetailPage;