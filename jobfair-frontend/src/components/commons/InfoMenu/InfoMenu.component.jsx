import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { Tabs, Typography } from 'antd';
import React from 'react';
import styles from './InfoMenu.module.scss';

const { Text } = Typography;

const SideBar = (props) => {
  const { companyInformation, isShow, handleOpenDetail, activeKey, tabs } = props;
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
        {isShow ? <>{tabs?.map((tab) => tab)}</> : <></>}
      </Tabs>
    </div>
  );
};
export default SideBar;
