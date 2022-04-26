import './styles.scss';
import { Alert, Badge } from 'antd';
import InterviewScheduleCalendarComponent from '../../components/customized-components/InterviewScheduleCalendar/InterviewScheduleCalendar.component';
import React, { useState } from 'react';
import moment from 'moment';

const InterviewScheduleContainer = () => {
  const [value, setValue] = useState({
    value: moment('26-04-2022'),
    selectedValue: moment('26-04-2022')
  });
  const getData = (value) => {
    let listData;
    switch (value.date()) {
      case 16:
        listData = [
          { type: 'warning', content: 'hold up' },
          { type: 'success', content: 'Ok conde' }
        ];
        break;
      case 18:
        listData = [
          { type: 'success', content: 'Ok conde' },
          { type: 'error', content: 'Chet me m roi con' }
        ];
        break;
      default:
        listData = [
          { type: 'error', content: 'Chet me m roi con' },
          { type: 'error', content: 'ok conde' }
        ];
        break;
    }
    return listData;
  };

  const dateCellRender = (value) => {
    const listData = getData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 1) return 2021;
  };

  const handleSelect = (value) => {
    setValue({ value, selectedValue: value });
  };

  const handlePanelChange = (value) => {
    setValue({ value });
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Demo day:</span>
      </div>
    ) : null;
  };
  return (
    <div>
      <Alert message={`You selected date: ${value.selectedValue && value.selectedValue.format('YYYY-MM-DD')}`} />
      <InterviewScheduleCalendarComponent
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        value={value.value}
        onSelect={handleSelect}
        onPanelChange={handlePanelChange}
      />
    </div>
  );
};

export default InterviewScheduleContainer;
