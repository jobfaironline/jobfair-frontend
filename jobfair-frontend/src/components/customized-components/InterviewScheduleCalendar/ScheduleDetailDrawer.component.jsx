import { Badge, Divider, Drawer, Typography } from 'antd';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { INTERVIEW_SCHEDULE_STATUS } from '../../../constants/InterviewScheduleConst';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

const generateContent = (item) => (
  <div>
    <Text strong>{item.title}</Text>
    <br />
    <Text>{`(${moment(item.timeStart).format(MinuteFormat)}-${moment(item.timeEnd).format(MinuteFormat)})`}</Text>
  </div>
);

const getBadgeColor = (status) => {
  switch (status) {
    case INTERVIEW_SCHEDULE_STATUS.NOT_YET:
      return '#faad14';
    case INTERVIEW_SCHEDULE_STATUS.DONE:
      return '#52c41a';
    case INTERVIEW_SCHEDULE_STATUS.REQUEST_CHANGE:
      return '#ff4d4f';
    case INTERVIEW_SCHEDULE_STATUS.INTERVIEWING:
      return '#1890ff';
    default:
      return 'gray';
  }
};

export const ScheduleDetailDrawer = ({
  visible,
  onClose,
  setScheduleModalVisible,
  setScheduleModalDetail,
  date,
  scheduleData
}) => {
  if (!visible) return <div />;

  return (
    <Drawer
      visible={visible}
      mask={false}
      onClose={onClose}
      title={`Schedule for ${date.format(DateFormat)}`}
      placement='right'>
      <div>
        {scheduleData.map((item) => (
          <>
            <Badge.Ribbon color={getBadgeColor(item.status)} text={convertEnumToString(item.status)}>
              <div
                style={{ cursor: 'pointer' }}
                key={item.id}
                onClick={() => {
                  setScheduleModalVisible(true);
                  setScheduleModalDetail(item);
                }}>
                {generateContent(item)}
              </div>
            </Badge.Ribbon>
            <Divider style={{ margin: '12px 0' }} />
          </>
        ))}
      </div>
    </Drawer>
  );
};
