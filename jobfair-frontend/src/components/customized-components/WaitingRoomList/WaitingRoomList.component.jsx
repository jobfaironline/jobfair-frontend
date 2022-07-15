import { BUTTON_BG_COLOR } from '../../../styles/custom-theme';
import { Card, Col, Divider, Row, Typography } from 'antd';
import { MinuteFormat } from '../../../constants/ApplicationConst';
import { useSelector } from 'react-redux';
import React from 'react';
import moment from 'moment';

export const WaitingRoomListForInterviewerComponent = ({ waitingList }) => (
  <Card>
    <div>
      <Typography.Title level={3}>Candidate list</Typography.Title>
      <div style={{ height: '350px', overflowY: 'auto' }}>
        {waitingList.map((interviewee) => (
          <div className='name-holder'>
            <div style={{ display: 'flex', gap: '5px 1rem', flexWrap: 'wrap' }}>
              <div>
                <Typography.Text strong>Name: </Typography.Text>
                {interviewee.attendantName}
              </div>
              <div>
                <Typography.Text strong>Schedule: </Typography.Text>
                {moment(interviewee.beginTime).format(MinuteFormat)}
                {' - '}
                {moment(interviewee.endTime).format(MinuteFormat)}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px 5px', flexWrap: 'wrap', marginTop: '5px' }}>
              <Typography.Text strong>Action:</Typography.Text>
              {interviewee?.buttonStatus()}
              {interviewee?.kickButton()}
            </div>
            <Divider style={{ margin: '0.5rem 0rem' }} />
          </div>
        ))}
      </div>
    </div>
  </Card>
);

export const WaitingRoomListForIntervieweeComponent = ({ userSchedules }) => {
  const userId = useSelector((state) => state.authentication.user.userId);
  return (
    <div style={{ flex: 1, border: '1px solid #f0f0f0', padding: '1rem' }}>
      <Typography.Title level={3}>Waiting room</Typography.Title>
      <Row>
        <Col span={2}>
          <Typography.Text strong>No</Typography.Text>
        </Col>
        <Col span={15}>
          <Typography.Text strong>Name</Typography.Text>
        </Col>
        <Col span={7}>
          <Typography.Text strong>Schedule</Typography.Text>
        </Col>
      </Row>
      {userSchedules?.map((userSchedule, index) => (
        <div
          className='name-holder'
          style={{ color: userId === userSchedule.attendantId ? `${BUTTON_BG_COLOR}!important` : 'inherit' }}>
          <Row>
            <Col span={2}>
              <Typography.Text strong={userId === userSchedule.attendantId} style={{ color: 'inherit' }}>
                {index + 1}
              </Typography.Text>
            </Col>
            <Col span={15}>
              <Typography.Text strong={userId === userSchedule.attendantId} style={{ color: 'inherit' }}>
                {userSchedule.attendantName}
              </Typography.Text>
            </Col>
            <Col span={7}>
              <Typography.Text strong={userId === userSchedule.attendantId} style={{ color: 'inherit' }}>
                {moment(userSchedule.beginTime).format(MinuteFormat)}
                {' - '}
                {moment(userSchedule.endTime).format(MinuteFormat)}
              </Typography.Text>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
