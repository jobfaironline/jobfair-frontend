import { Card, Col, Divider, Row, Typography } from 'antd';
import { MinuteFormat } from '../../../constants/ApplicationConst';
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

export const WaitingRoomListForIntervieweeComponent = ({ userSchedule }) => (
  <Card>
    <div>
      <Typography.Title level={3}>Waiting room</Typography.Title>
      {/* <div>
        <Row>
          <Col span={10}>Số lượt tiếp theo</Col>
          <Col span={7}>{turn}</Col>
        </Row>
      </div> */}
      <div className='name-holder'>
        <Row>
          <Col span={10}>{userSchedule.fullName}</Col>
          <Col span={7}>
            {`${new Date(userSchedule.beginTime).toTimeString().split(' ')[0]} - ${
              new Date(userSchedule.endTime).toTimeString().split(' ')[0]
            }`}
          </Col>
          <Col span={7}>Tiếp theo</Col>
        </Row>
      </div>
    </div>
  </Card>
);
