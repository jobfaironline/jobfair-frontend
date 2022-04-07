import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { CompanyInformation } from '../AttendantJobFairSideBar/CompanyInformation/CompanyInformation.component';
import { CompanyJobPositionTabContainer } from '../../containers/AttendantJobFair/CompanyJobPositionTab.container';
import { Tabs, Typography } from 'antd';
import React from 'react';
import styles from './SideBar.module.scss';

const { Text } = Typography;

const SideBar = (props) => {
  const { companyInformation, jobPositions, isShow, handleOpenDetail, activeKey, openInventory } = props;
  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <span>
          {isShow ? (
            <CloseOutlined onClick={() => handleOpenDetail(false, activeKey)} className={styles.icon} />
          ) : (
            <MenuOutlined onClick={() => handleOpenDetail(true, activeKey)} className={styles.icon} />
          )}
        </span>
        <Text strong className={styles.title}>
          {companyInformation.name}
        </Text>
      </div>

      <Tabs
        tabPosition='left'
        activeKey={activeKey}
        onTabClick={(key) => {
          handleOpenDetail(true, key);
        }}>
        {isShow ? (
          <>
            <Tabs.TabPane
              tab={
                <div style={{ textAlign: 'center' }}>
                  Company <br /> Information
                </div>
              }
              key='0'>
              <div className={styles.aboutCompany}>
                <Typography variant='button'>About Company</Typography>
                <CompanyInformation data={companyInformation} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Job positions' key='1'>
              <CompanyJobPositionTabContainer jobPositions={jobPositions} openInventory={openInventory} />
            </Tabs.TabPane>
          </>
        ) : (
          <></>
        )}
      </Tabs>
    </div>
  );
};
export default SideBar;
