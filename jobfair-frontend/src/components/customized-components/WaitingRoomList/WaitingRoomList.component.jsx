import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import React from 'react';

export const WaitingRoomListForInterviewerComponent = ({ waitingList }) => {
  return (
    <Card style={{ height: '100%' }}>
      <div>
        <Typography.Title level={3}>Danh sách ứng viên</Typography.Title>
        <div style={{ height: '350px', overflowY: 'scroll' }}>
          {waitingList.map((interviewee, index, arr) => {
            return (
              <div className='name-holder'>
                <Row>
                  <Col span={12}>{interviewee.attendantName}</Col>
                  <Col span={12}>
                    {`${new Date(interviewee.beginTime).toTimeString().split(' ')[0]} - ${
                      new Date(interviewee.endTime).toTimeString().split(' ')[0]
                    }`}
                  </Col>
                  <Col span={12}>{interviewee?.buttonStatus()}</Col>
                  <Col span={12}>{interviewee?.kickButton()}</Col>
                </Row>
                <Divider style={{ margin: '0.5rem 0rem' }} />
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export const WaitingRoomListForIntervieweeComponent = ({ userSchedule }) => (
  <Card>
    <div>
      <Typography.Title level={3}>Phòng chờ phỏng vấn</Typography.Title>
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
