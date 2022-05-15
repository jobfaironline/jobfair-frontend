import { CommentOutlined, ProfileOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Tabs, Typography } from 'antd';
import { boothTabAction } from '../../../redux-flow/boothInfoTab/boothInfoTab-slice';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import styles from './InfoMenu.module.scss';

const { Text } = Typography;

const SideBar = (props) => {
  const { companyInformation, tabs } = props;
  const { activeKey, isShow } = useSelector((state) => state.boothTab);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.tabHeader}>
        <span>
          {isShow ? (
            <a
              className={styles.icon}
              onClick={() => {
                dispatch(boothTabAction.setIsShow(false));
              }}>
              <FontAwesomeIcon icon={faArrowLeft} size={'1x'} color={'black'} />
            </a>
          ) : (
            <Space direction='vertical'>
              <a
                className={styles.icon}
                onClick={() => {
                  dispatch(boothTabAction.setActiveKey('0'));
                  dispatch(boothTabAction.setIsShow(true));
                }}>
                <FontAwesomeIcon icon={faArrowRight} size={'1x'} color={'black'} />
              </a>
              <a
                className={styles.icon}
                onClick={() => {
                  dispatch(boothTabAction.setActiveKey('0'));
                  dispatch(boothTabAction.setIsShow(true));
                }}>
                <Typography.Text strong>
                  <CommentOutlined /> Chat & Video
                </Typography.Text>
              </a>
              <a
                className={styles.icon}
                onClick={() => {
                  dispatch(boothTabAction.setActiveKey('1'));
                  dispatch(boothTabAction.setIsShow(true));
                }}>
                <Typography.Text strong>
                  <ProfileOutlined /> Company profile
                </Typography.Text>
              </a>
              <a
                className={styles.icon}
                onClick={() => {
                  dispatch(boothTabAction.setActiveKey('2'));
                  dispatch(boothTabAction.setIsShow(true));
                }}>
                <Typography.Text strong>
                  <SolutionOutlined /> Job positions
                </Typography.Text>
              </a>
              <a
                className={styles.icon}
                onClick={() => {
                  dispatch(boothTabAction.setActiveKey('3'));
                  dispatch(boothTabAction.setIsShow(true));
                }}>
                <Typography.Text strong>
                  <SettingOutlined /> Settings
                </Typography.Text>
              </a>
            </Space>
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
          dispatch(boothTabAction.setActiveKey(key));
          dispatch(boothTabAction.setIsShow(true));
        }}>
        {isShow ? <>{tabs?.map((tab) => tab)}</> : <></>}
      </Tabs>
    </div>
  );
};
export default SideBar;
