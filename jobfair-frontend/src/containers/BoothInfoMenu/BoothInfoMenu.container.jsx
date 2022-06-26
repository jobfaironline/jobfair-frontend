import './BoothInfoMenu.styles.scss';
import {
  ArrowsAltOutlined,
  CommentOutlined,
  ProfileOutlined,
  ShrinkOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { BoothJobPositionTabContainer } from './BoothJobPositionTab/BoothJobPositionTab.container';
import { CompanyInformation } from '../../components/customized-components/BoothInfoMenu/BoothInformationTab/BoothInformationTab.component';
import { Tabs, Tooltip, Typography, notification } from 'antd';
import { boothTabAction } from '../../redux-flow/boothInfoTab/boothInfoTab-slice';
import { getCompanyBoothById } from '../../services/jobhub-api/CompanyBoothControllerService';
import { useDispatch, useSelector } from 'react-redux';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useState } from 'react';

export const BoothInfoMenuContainer = (props) => {
  const { companyBoothId, openInventory, communicationProps } = props;
  const { isShow, activeKey } = useSelector((state) => state.boothTab);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    companyInformation: undefined,
    jobPositions: [],
    boothData: undefined
  });

  const fetchData = async () => {
    try {
      const boothData = (await getCompanyBoothById(companyBoothId)).data;
      const jobPositions = boothData.boothJobPositions;
      const companyData = boothData?.jobFair?.company;
      setState((prevState) => ({
        ...prevState,
        companyInformation: companyData,
        jobPositions,
        boothData
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

  return (
    <div className={'booth-info-menu-container'}>
      <div className={'booth-info-menu'}>
        <div className={'header'}>
          <Typography.Text strong style={{ fontSize: '1.2rem' }}>
            Menu
          </Typography.Text>
          <div
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={() => {
              dispatch(boothTabAction.setIsShow(!isShow));
              dispatch(boothTabAction.activeKey(0));
            }}>
            {isShow ? (
              <ShrinkOutlined style={{ fontSize: '1.2rem' }} />
            ) : (
              <ArrowsAltOutlined style={{ fontSize: '1.2rem' }} />
            )}
          </div>
        </div>

        <Tabs
          tabPosition='left'
          activeKey={activeKey}
          tabBarGutter={0}
          onTabClick={(key) => {
            dispatch(boothTabAction.setActiveKey(key));
            dispatch(boothTabAction.setIsShow(true));
          }}>
          <Tabs.TabPane
            tab={
              <div style={{ textAlign: 'center' }}>
                <Tooltip title={'Chat & Video'}>
                  <Typography.Text strong style={{ fontSize: '2rem' }}>
                    <CommentOutlined />
                  </Typography.Text>
                </Tooltip>
              </div>
            }
            key='0'>
            {isShow ? <ChatBoxContainer {...communicationProps} /> : null}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div style={{ textAlign: 'center' }}>
                <Tooltip title={'Company Information'}>
                  <Typography.Text strong style={{ fontSize: '2rem' }}>
                    <ProfileOutlined />
                  </Typography.Text>
                </Tooltip>
              </div>
            }
            key='1'>
            {isShow ? (
              <div className={'aboutCompany'}>
                <CompanyInformation data={state.companyInformation} />
              </div>
            ) : null}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <div style={{ textAlign: 'center' }}>
                <Tooltip title={'Job positions'}>
                  <Typography.Text strong style={{ fontSize: '2rem' }}>
                    <SolutionOutlined />
                  </Typography.Text>
                </Tooltip>
              </div>
            }
            key='2'>
            {isShow ? (
              <BoothJobPositionTabContainer jobPositions={state.jobPositions} openInventory={openInventory} />
            ) : null}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};
