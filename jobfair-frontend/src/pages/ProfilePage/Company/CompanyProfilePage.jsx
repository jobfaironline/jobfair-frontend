import { Card, Space } from 'antd';
import CompanyProfileFormContainer from '../../../containers/forms/CompanyProfileForm/CompanyProfileForm.container';
import React from 'react';

const CompanyProfile = () => (
  <div>
    <Space direction='vertical' size='large'>
      <Card title='Company profile' style={{ width: 1400 }} headStyle={{ fontWeight: 700, fontSize: 24 }}>
        <CompanyProfileFormContainer />
      </Card>
    </Space>
  </div>
);

export default CompanyProfile;
