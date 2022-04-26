import { Calendar } from 'antd';
import React from 'react';
import moment from 'moment';

const InterviewScheduleCalendarComponent = (props) => {
  const { dateCellRender, monthCellRender, onSelect, onPanelChange, value } = props;
  return (
    <Calendar
      value={value}
      dateCellRender={() => dateCellRender(moment('2022-01-16'))}
      monthCellRender={() => monthCellRender(moment('2022-01-18'))}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
    />
  );
};

export default InterviewScheduleCalendarComponent;
