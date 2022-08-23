import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Divider, Tabs, Typography } from 'antd';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import ApplicationViewContainer from '../../containers/ApplicationView/ApplicationView.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const { TabPane } = Tabs;

const ApplicationManagementPage = () => {
  const history = useHistory();
  return (
    <PageLayoutWrapper className='page'>
      <div>
        <Divider>
          <Typography.Title level={2}>Application management</Typography.Title>
          <div style={{ position: 'absolute', top: '100px', right: '30px' }}>
            <Button
              type={'link'}
              style={{ fontSize: '1rem' }}
              onClick={() => history.push(generatePath(PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE))}>
              Go to interview schedule <ArrowRightOutlined />
            </Button>
          </div>
        </Divider>
        <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
          <TabPane tab='Reviewing applications' key='1'>
            <ApplicationViewContainer tabStatus='1' />
          </TabPane>
          <TabPane tab='Rejected Applications' key='2'>
            <ApplicationViewContainer tabStatus='2' />
          </TabPane>
          <TabPane tab='Approved Applications' key='3'>
            <ApplicationViewContainer tabStatus='3' />
          </TabPane>
        </Tabs>
      </div>
    </PageLayoutWrapper>
  );
};

export default ApplicationManagementPage;
