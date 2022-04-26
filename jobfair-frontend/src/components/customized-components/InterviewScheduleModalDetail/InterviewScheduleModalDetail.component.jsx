import { Badge, Descriptions, Modal, Tag } from 'antd';
import { convertEnumToString, convertToDateString, handleTag, handleType } from '../../../utils/common';
import React from 'react';

const InterviewScheduleModalDetailComponent = (props) => {
  const { data, visible, onCancel } = props;
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} centered={true}>
      <Descriptions title={data?.title} size='small' layout='vertical' bordered>
        <Descriptions.Item label='Interview date'>{convertToDateString(data?.interviewDate)}</Descriptions.Item>
        <Descriptions.Item label='Interview link' span={2}>
          {data?.interviewLink}
        </Descriptions.Item>
        <Descriptions.Item label='Time start' span={2}>
          {data?.timeStart}
        </Descriptions.Item>
        <Descriptions.Item label='Time end' span={2}>
          {data?.timeEnd}
        </Descriptions.Item>
        <Descriptions.Item label='Status' span={3}>
          <Badge
            status={handleType(data?.status)}
            text={<Tag color={handleTag(data?.status)}>{convertEnumToString(data?.status)}</Tag>}
          />
        </Descriptions.Item>
        <Descriptions.Item label='Description'>{data?.description}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default InterviewScheduleModalDetailComponent;
