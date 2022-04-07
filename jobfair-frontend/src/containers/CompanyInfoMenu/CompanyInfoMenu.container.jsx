import { CompanyInformation } from '../../components/customized-components/BoothInfoMenu/CompanyInformation/CompanyInformation.component';
import { CompanyJobPositionTabContainer } from './CompanyJobPositionTab.container';
import { Tabs, Typography } from 'antd';
import { getCompanyBoothById } from '../../services/jobhub-api/CompanyBoothControllerService';
import { getCompanyProfileAPI } from '../../services/jobhub-api/CompanyControllerService';
import React, { useEffect, useState } from 'react';
import SideBar from '../../components/commons/InfoMenu/InfoMenu.component';
import styles from '../../pages/AttendantJobFairPage/AttendantJobFairPage.module.scss';

export const CompanyInfoMenuContainer = (props) => {
  const { companyBoothId, handleOpenDetail, isShow, activeKey, openInventory } = props;
  const [state, setState] = useState({
    companyInformation: undefined,
    jobPositions: []
  });

  const fetchData = async () => {
    let response = await getCompanyBoothById(companyBoothId);
    const companyId = response.data.order.companyRegistration.companyId;
    const jobPositions = response.data.order.companyRegistration.registrationJobPositions;
    response = await getCompanyProfileAPI(companyId);
    setState((prevState) => ({
      ...prevState,
      companyInformation: response.data,
      jobPositions
    }));
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
            Company <br /> Information
          </div>
        }
        key='0'>
        <div className={styles.aboutCompany}>
          <Typography variant='button'>About Company</Typography>
          <CompanyInformation data={state.companyInformation} />
        </div>
      </Tabs.TabPane>,
      <Tabs.TabPane tab='Job positions' key='1'>
        <CompanyJobPositionTabContainer jobPositions={state.jobPositions} openInventory={openInventory} />
      </Tabs.TabPane>
    ]
  };

  return (
    <div className={styles.sideBar}>
      <SideBar {...sideBarProps} />
    </div>
  );
};
