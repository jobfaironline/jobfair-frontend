import { Button, Card, Col, Row, Typography } from 'antd';
import React from 'react';

export const WaitingRoomListForInterviewerComponent = ({ waitingList }) => (
  <Card>
    <div>
      <Typography.Title level={3}>Danh sách ứng viên</Typography.Title>
      {waitingList.map((interviewee) => (
        <div className='name-holder'>
          <Row>
            <Col span={10}>{interviewee.attendantName}</Col>
            <Col span={7}>
              {`${new Date(interviewee.beginTime).toTimeString().split(' ')[0]} - ${
                new Date(interviewee.endTime).toTimeString().split(' ')[0]
              }`}
            </Col>
            <Col span={7}>
              <Button
                type='primary'
                shape='round'
                disabled={!interviewee.inRoom} //TODO: remove later
                onClick={interviewee.handleInvite}>
                {!interviewee.inRoom ? 'Not in room' : 'invite'}
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  </Card>
);

export const WaitingRoomListForIntervieweeComponent = ({ turn, userSchedule }) => (
  <Card>
    <div>
      <Typography.Title level={3}>Phòng chờ phỏng vấn</Typography.Title>
      <div>
        <Row>
          <Col span={10}>Số lượt tiếp theo</Col>
          <Col span={7}>{turn}</Col>
        </Row>
      </div>
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