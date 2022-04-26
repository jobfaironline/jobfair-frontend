import { Calendar } from 'antd';
import React from 'react';

const InterviewScheduleCalendarComponent = (props) => {
  const { dateCellRender, monthCellRender, onSelect, onPanelChange, value, disabledDate } = props;
  return (
    <Calendar
      value={value}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={onSelect}
      onPanelChange={onPanelChange}
      disabledDate={disabledDate}
    />
  );
};

export default InterviewScheduleCalendarComponent;
