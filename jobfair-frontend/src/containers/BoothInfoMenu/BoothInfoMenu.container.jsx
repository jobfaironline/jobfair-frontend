import '../3D/JobFairBooth/AttendantJobFairBoothView.styles.scss';
import { BoothJobPositionTabContainer } from './BoothJobPositionTab/BoothJobPositionTab.container';
import { CommentOutlined, ProfileOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import { CompanyInformation } from '../../components/customized-components/BoothInfoMenu/BoothInformationTab/BoothInformationTab.component';
import { Tabs, Typography, notification } from 'antd';
import { getCompanyBoothById } from '../../services/jobhub-api/CompanyBoothControllerService';
import { getCompanyProfileAPI } from '../../services/jobhub-api/CompanyControllerService';
import React, { useEffect, useState } from 'react';
import SideBar from '../../components/commons/InfoMenu/InfoMenu.component';

export const BoothInfoMenuContainer = (props) => {
  const { companyBoothId, handleOpenDetail, isShow, activeKey, openInventory } = props;
  const [state, setState] = useState({
    companyInformation: undefined,
    jobPositions: []
  });

  const fetchData = async () => {
    try {
      let data = (await getCompanyBoothById(companyBoothId)).data;
      const companyId = data.companyId;
      const jobPositions = data.boothJobPositions;
      data = (await getCompanyProfileAPI(companyId)).data;
      setState((prevState) => ({
        ...prevState,
        companyInformation: data,
        jobPositions
      }));
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.companyInformation === undefined) return null;

  const sideBarProps = {
    companyInformation: state.companyInformation,
    jobPositions: state.jobPositions,
    isShow,
    handleOpenDetail,
    activeKey,
    openInventory,
    tabs: [
      <Tabs.TabPane
        tab={
          <div style={{ textAlign: 'center' }}>
            <Typography.Text strong>
              <CommentOutlined /> Chat & Video
            </Typography.Text>
          </div>
        }
        key='0'>
        <div className={'aboutCompany'}>
          <Typography variant='button'>Chat & Video call</Typography>
        </div>
      </Tabs.TabPane>,
      <Tabs.TabPane
        tab={
          <div style={{ textAlign: 'center' }}>
            <Typography.Text strong>
              <ProfileOutlined /> Company profile
            </Typography.Text>
          </div>
        }
        key='1'>
        <div className={'aboutCompany'}>
          <Typography variant='button'>About Company</Typography>
          <CompanyInformation data={state.companyInformation} />
        </div>
      </Tabs.TabPane>,
      <Tabs.TabPane
        tab={
          <div style={{ textAlign: 'center' }}>
            <Typography.Text strong>
              <SolutionOutlined /> Job positions
            </Typography.Text>
          </div>
        }
        key='2'>
        <BoothJobPositionTabContainer jobPositions={state.jobPositions} openInventory={openInventory} />
      </Tabs.TabPane>,
      <Tabs.TabPane
        tab={
          <div style={{ textAlign: 'center' }}>
            <Typography.Text strong>
              <SettingOutlined /> Settings
            </Typography.Text>
          </div>
        }
        key='3'>
        <BoothJobPositionTabContainer jobPositions={state.jobPositions} openInventory={openInventory} />
      </Tabs.TabPane>
    ]
  };

  return (
    <div className={'sideBar'}>
      <SideBar {...sideBarProps} />
    </div>
  );
};
