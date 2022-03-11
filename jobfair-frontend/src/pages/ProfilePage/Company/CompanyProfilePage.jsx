import React from 'react'
import CompanyProfileFormContainer from "../../../containers/CompanyProfileForm/CompanyProfileForm.container";
import {Card, Divider, Space} from "antd";

const CompanyProfile = props => {
  return (
    <div>
      <Space direction="vertical" size="large">
        <Card
          title="Company profile"
          style={{width: 1400}}
          headStyle={{fontWeight: 700, fontSize: 24}}
        >
          <CompanyProfileFormContainer/>
        </Card>
      </Space>
    </div>
  )
}

export default CompanyProfile
