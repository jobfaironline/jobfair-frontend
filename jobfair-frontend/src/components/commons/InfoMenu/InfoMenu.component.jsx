import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, Typography } from 'antd';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
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
            <a className={styles.icon} onClick={() => handleOpenDetail(false, activeKey)}>
              <FontAwesomeIcon icon={faArrowLeft} size={'1x'} color={'black'} />
            </a>
          ) : (
            <a className={styles.icon} onClick={() => handleOpenDetail(true, activeKey)}>
              <FontAwesomeIcon icon={faArrowRight} size={'1x'} color={'black'} />
            </a>
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
