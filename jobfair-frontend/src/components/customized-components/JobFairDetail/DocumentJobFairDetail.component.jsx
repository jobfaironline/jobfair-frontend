import { Button, Col, Descriptions, Row, Tag, Typography } from 'antd';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH } from '../../../constants/Paths/Path';
import { faExternalLink, faMinus } from '@fortawesome/free-solid-svg-icons';
import { generatePath } from 'react-router-dom';
import { getTimeZoneCode, handleStatusTag } from '../../../utils/common';
import React from 'react';
import moment from 'moment';

const { Title, Text } = Typography;

const DocumentJobFairDetailComponent = (props) => {
  const { data } = props;
  const startOfDate = moment().startOf('day');
  const morningShift = [
    data.shifts?.[0]?.beginTime !== undefined
      ? moment(startOfDate.valueOf() + data.shifts[0].beginTime).format(MinuteFormat)
      : undefined,
    data.shifts?.[0]?.endTime !== undefined
      ? moment(startOfDate.valueOf() + data.shifts[0].endTime).format(MinuteFormat)
      : undefined
  ];
  const afternoonShift = [
    data.shifts?.[1]?.beginTime !== undefined
      ? moment(startOfDate.valueOf() + data.shifts[1].beginTime).format(MinuteFormat)
      : undefined,
    data.shifts?.[1]?.endTime !== undefined
      ? moment(startOfDate.valueOf() + data.shifts[1].endTime).format(MinuteFormat)
      : undefined
  ];

  return (
    <>
      <Title level={3}>Job fair: {data.name}</Title>
      <Descriptions>
        <Descriptions.Item label='Status'>{handleStatusTag(data.status)}</Descriptions.Item>
        <Descriptions.Item label='Company'>{data?.company?.name}</Descriptions.Item>
        <Descriptions.Item label={'Landind page'}>
          <Button
            type={'link'}
            style={{ padding: 0, height: 'fit-content', margin: 0, lineHeight: 'initial' }}
            onClick={() => {
              const url = generatePath(PATH.JOB_FAIR_LANDING_PAGE, {
                jobFairId: data.id,
                review: 'review'
              });
              const src = `${window.location.origin}${url}?review`;
              window.open(src);
            }}>
            link
            <FontAwesomeIcon icon={faExternalLink} style={{ marginLeft: '5px' }} />
          </Button>
        </Descriptions.Item>
        <Descriptions.Item label={'Layout'}>
          <Button
            type={'link'}
            style={{ padding: 0, height: 'fit-content', margin: 0, lineHeight: 'initial' }}
            onClick={() => {
              const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {
                jobFairId: data.id
              });
              const src = `${window.location.origin}${url}`;
              window.open(src);
            }}>
            link
            <FontAwesomeIcon icon={faExternalLink} style={{ marginLeft: '5px' }} />
          </Button>
        </Descriptions.Item>
      </Descriptions>
      <Title level={4}>Job fair schedule</Title>
      <Row style={{ marginBottom: '5px' }}>
        <Col span={7}>
          <Text>Decorate time ({getTimeZoneCode()}):</Text>
        </Col>
        <Col>
          {data.decorateStartTime ? (
            <Tag color={'green'}>{moment(data.decorateStartTime).format(DateFormat)}</Tag>
          ) : (
            <Tag color={'red'}>Not enter</Tag>
          )}
          <Tag color='orange'>
            <FontAwesomeIcon icon={faMinus} />
          </Tag>
          {data.decorateEndTime ? (
            <Tag color={'green'}>{moment(data.decorateEndTime).format(DateFormat)}</Tag>
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
          {data.publicStartTime ? (
            <Tag color={'green'}>{moment(data.publicStartTime).format(DateFormat)}</Tag>
          ) : (
            <Tag color={'red'}>Not enter</Tag>
          )}
          <Tag color='orange'>
            <FontAwesomeIcon icon={faMinus} />
          </Tag>
          {data.publicEndTime ? (
            <Tag color={'green'}>{moment(data.publicEndTime).format(DateFormat)}</Tag>
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
          {morningShift[0] ? <Tag color={'green'}>{morningShift[0]}</Tag> : <Tag color={'red'}>Not enter</Tag>}
          <Tag color='orange'>
            <FontAwesomeIcon icon={faMinus} />
          </Tag>
          {morningShift[1] ? <Tag color={'green'}>{morningShift[1]}</Tag> : <Tag color={'red'}>Not enter</Tag>}
        </Col>
      </Row>
      <Row style={{ marginBottom: '5px' }}>
        <Col span={7}>
          <Text>Afternoon shift ({getTimeZoneCode()}):</Text>
        </Col>
        <Col>
          {afternoonShift[0] ? <Tag color={'green'}>{afternoonShift[0]}</Tag> : <Tag color={'red'}>Not enter</Tag>}
          <Tag color='orange'>
            <FontAwesomeIcon icon={faMinus} />
          </Tag>
          {afternoonShift[1] ? <Tag color={'green'}>{afternoonShift[1]}</Tag> : <Tag color={'red'}>Not enter</Tag>}
        </Col>
      </Row>
    </>
  );
};

export default DocumentJobFairDetailComponent;
