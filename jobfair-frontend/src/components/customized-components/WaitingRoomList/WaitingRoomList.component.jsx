import { Button, Card, Col, Row, Typography } from 'antd';
import React from 'react';

export const WaitingRoomListForInterviewerComponent = ({ waitingList }) => {
  return (
    <Card>
      <div>
        <Typography.Title level={3}>Danh sách ứng viên</Typography.Title>
        {waitingList.map((interviewee, index, arr) => {
          const isHavingInterview = arr?.filter((interview) => interview.status === 'INTERVIEWING');

          return (
            <div className='name-holder'>
              <Row>
                <Col span={8}>{interviewee.attendantName}</Col>
                <Col span={4}>
                  {`${new Date(interviewee.beginTime).toTimeString().split(' ')[0]} - ${
                    new Date(interviewee.endTime).toTimeString().split(' ')[0]
                  }`}
                </Col>
                <Col span={8}>
                  {interviewee?.status !== 'INTERVIEWING' && isHavingInterview?.length > 0 ? null : (
                    <Button
                      type='primary'
                      shape='round'
                      disabled={!interviewee.inRoom} //TODO: remove later
                      onClick={interviewee.handleInvite}>
                      {!interviewee.inRoom ? 'Not in waiting room' : 'invite'}
                    </Button>
                  )}
                </Col>
                <Col span={4}>{interviewee?.buttonStatus()}</Col>
              </Row>
            </div>
          );
        })}
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
