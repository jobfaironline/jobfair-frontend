import '../../customized-components/InterviewScheduleCalendar/InterviewScheduleCalendar.styles.scss';
import { Badge, Calendar, Col, Radio, Row, Select, Typography } from 'antd';
import React from 'react';
import moment from 'moment';

const AssignTaskComponent = (props) => {
  const { data } = props;

  const generateData = (item) => (
    <div>
      <Typography.Text strong>{item.employeeName}</Typography.Text>
      <br />
      <Typography.Text>{`(${moment(item.timeStart).format('hh:mm')}-${moment(item.timeEnd).format(
        'hh:mm'
      )})`}</Typography.Text>
    </div>
  );

  const dateFullCellRender = (date) => {
    const result = data.filter(
      (item) => item.day === date.date() && item.month === date.month() && item.year === date.year()
    );
    return (
      <div>
        {result.map((item) => (
          <div key={item.id}>
            <Badge status={item.badgeType} text={generateData(item)} />
          </div>
        ))}
      </div>
    );
  };
  const monthCellRender = () => null;

  const headerRender = ({ value, type, onChange, onTypeChange }) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    const current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let index = start; index < end; index++) {
      monthOptions.push(
        <Select.Option className='month-item' key={`${index}`}>
          {months[index]}
        </Select.Option>
      );
    }
    const month = value.month();

    const year = value.year();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className='year-item'>
          {i}
        </Select.Option>
      );
    }
    return (
      <Row gutter={8} style={{ marginLeft: 'auto' }}>
        <Col>
          <Select
            dropdownMatchSelectWidth={false}
            onChange={(newYear) => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
            value={String(year)}>
            {options}
          </Select>
        </Col>
        <Col>
          <Select
            dropdownMatchSelectWidth={false}
            value={String(month)}
            onChange={(selectedMonth) => {
              const newValue = value.clone();
              newValue.month(parseInt(selectedMonth, 10));
              onChange(newValue);
            }}>
            {monthOptions}
          </Select>
        </Col>
        <Col>
          <Radio.Group onChange={(e) => onTypeChange(e.target.value)} value={type}>
            <Radio.Button value='month'>Month</Radio.Button>
            <Radio.Button value='year'>Year</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    );
  };

  return (
    <>
      <Calendar
        className={'interview-schedule-calendar'}
        dateFullCellRender={dateFullCellRender}
        monthCellRender={monthCellRender}
        headerRender={headerRender}
      />
    </>
  );
};

export default AssignTaskComponent;
