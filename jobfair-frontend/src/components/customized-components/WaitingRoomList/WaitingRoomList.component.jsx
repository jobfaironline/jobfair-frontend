import { Typography, Row, Col, Card, Button } from 'antd';
import React from 'react';

const WaitingRoomListComponent = ({ waitingList }) => {
  return (
    <Card>
      <div>
        <Typography.Title level={3}>Danh sách ứng viên</Typography.Title>
        {waitingList.map((interviewee) => {
          return (
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
          );
        })}
      </div>
    </Card>
  );
};

export default WaitingRoomListComponent;
