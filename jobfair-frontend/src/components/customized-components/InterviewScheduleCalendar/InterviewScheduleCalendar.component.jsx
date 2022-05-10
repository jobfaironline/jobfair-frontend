import { Badge, Calendar, Popover, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

export const InterviewScheduleCalendar = (props) => {
  const { data, setScheduleModalVisible, setScheduleModalDetail, onPanelChange } = props;

  const generateContent = (item) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Popover
        content={
          <div
            onClick={() => {
              setScheduleModalVisible(true);
              setScheduleModalDetail(item);
            }}>
            <span>
              {' '}
              <EyeOutlined /> View detail
            </span>
          </div>
        }
        title={item.title}>
        <Text mark>{item.title}</Text>
      </Popover>
      <Text italic>{`(${moment(item.timeStart).format('hh:mm')}-${moment(item.timeEnd).format('hh:mm')})`}</Text>
    </div>
  );

  const dateCellRender = (date) => {
    const listData = data.filter(
      (item) => item.day === date.date() && item.month === date.month() && item.year === date.year()
    );
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li>
            <Badge status={item.badgeType} text={generateContent(item)} />
          </li>
        ))}
      </ul>
    );
  };

  const monthCellRender = () => null;

  return <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} onPanelChange={onPanelChange} />;
};
