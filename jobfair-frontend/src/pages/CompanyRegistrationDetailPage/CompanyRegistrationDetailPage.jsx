import React from 'react';
import CompanyRegistrationDetailContainer
    from "../../containers/CompanyRegistrationDetail/CompanyRegistrationDetail.container";
import {PageHeader} from "antd";
import {useHistory} from "react-router-dom";

const CompanyRegistrationDetailPage = () => {
  const history = useHistory()
    return (
        <div className="page" style={{marginTop: 20}}>
          <PageHeader
            className="site-page-header"
            onBack={() => history.goBack()}
            title="Company registration detail"
            subTitle=""
          />
            <CompanyRegistrationDetailContainer/>
        </div>
    );
};

export default CompanyRegistrationDetailPage;