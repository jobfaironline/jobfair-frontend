import { Button, Checkbox, Col, Modal, Row, Tag, Typography } from 'antd';
import { DateFormat } from '../../../constants/ApplicationConst';
import { Divider } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { getTimeZoneCode } from '../../../utils/common';
import React, { useState } from 'react';
import moment from 'moment';

const { Text, Title } = Typography;

export const PublishJobFairConfirmModal = (props) => {
  const { publishModalVisible, publishJobFairEvent, onCancel, jobFairData, statistics } = props;
  const [agree, setAgree] = useState();
  return (
    <Modal
      title='Publish job fair'
      visible={publishModalVisible}
      footer={null}
      onOk={publishJobFairEvent}
      centered
      width={'40%'}
      onCancel={onCancel}>
      <div>
        <Title level={5} className={'content'}>
          Schedule job fair
        </Title>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={7}>
            <Text>Decorate time ({getTimeZoneCode()}):</Text>
          </Col>
          <Col>
            {jobFairData.decorateStartTime ? (
              <Tag color={'green'}>{moment(jobFairData.decorateStartTime).format(DateFormat)}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
            <Tag color='orange'>
              <FontAwesomeIcon icon={faMinus} />
            </Tag>
            {jobFairData.decorateEndTime ? (
              <Tag color={'green'}>{moment(jobFairData.decorateEndTime).format(DateFormat)}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={7}>
            <Text>Public time ({getTimeZoneCode()}):</Text>
          </Col>
          <Col>
            {jobFairData.publicStartTime ? (
              <Tag color={'green'}>{moment(jobFairData.publicStartTime).format(DateFormat)}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
            <Tag color='orange'>
              <FontAwesomeIcon icon={faMinus} />
            </Tag>
            {jobFairData.publicEndTime ? (
              <Tag color={'green'}>{moment(jobFairData.publicEndTime).format(DateFormat)}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={7}>
            <Text>Morning shift ({getTimeZoneCode()}):</Text>
          </Col>
          <Col>
            {jobFairData.morningShift[0] ? (
              <Tag color={'green'}>{jobFairData.morningShift[0]}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
            <Tag color='orange'>
              <FontAwesomeIcon icon={faMinus} />
            </Tag>
            {jobFairData.morningShift[1] ? (
              <Tag color={'green'}>{jobFairData.morningShift[1]}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={7}>
            <Text>Afternoon shift ({getTimeZoneCode()}):</Text>
          </Col>
          <Col>
            {jobFairData.afternoonShift[0] ? (
              <Tag color={'green'}>{jobFairData.afternoonShift[0]}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
            <Tag color='orange'>
              <FontAwesomeIcon icon={faMinus} />
            </Tag>
            {jobFairData.afternoonShift[1] ? (
              <Tag color={'green'}>{jobFairData.afternoonShift[1]}</Tag>
            ) : (
              <Tag color={'red'}>Not enter</Tag>
            )}
          </Col>
        </Row>
      </div>
      <div>
        <Title level={5}>Assign employee</Title>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text>Number of assigned employee: </Text>
          </Col>
          <Col>
            <Text strong style={{ color: statistics.assignedEmployeeNum === 0 ? 'red' : 'green' }}>
              {statistics.assignedEmployeeNum}
            </Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text>Number of assigned booth: </Text>
          </Col>
          <Col>
            <Text strong style={{ color: statistics.assignedBoothNum === 0 ? 'red' : 'green' }}>
              {statistics.assignedBoothNum}
            </Text>
          </Col>
        </Row>
      </div>
      <div>
        <Title level={5}>Confirmation</Title>
        <Text>After you publish a job fair, you cannot alter the following information:</Text>
        <Typography.Paragraph>
          <ul>
            <li>3D layout</li>
            <li>Schedule</li>
            <li>Employee assignment</li>
            <li>Landing page</li>
          </ul>
        </Typography.Paragraph>

        <Text>
          Are you sure to publish "<Text strong>{jobFairData.name}</Text>"?
        </Text>
        <br />
        <Checkbox
          checked={agree}
          onChange={(e) => {
            setAgree(e.target.checked);
          }}>
          Yes, I am sure to publish this job fair
        </Checkbox>
      </div>
      <Divider style={{ margin: '10px 0' }} />
      <div style={{ display: 'flex' }}>
        <Button className={'button'} onClick={onCancel} style={{ marginLeft: 'auto', marginRight: '1rem' }}>
          Cancel
        </Button>
        <Button type={'primary'} className={'button'} onClick={publishJobFairEvent} disabled={!agree}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
