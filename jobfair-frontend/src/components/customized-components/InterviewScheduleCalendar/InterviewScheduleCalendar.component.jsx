import './InterviewScheduleCalendar.styles.scss';
import { Badge, Calendar, Col, Radio, Row, Select, Typography } from 'antd';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

export const InterviewScheduleCalendar = (props) => {
  const { data, setScheduleModalVisible, setScheduleModalDetail, onPanelChange } = props;

  const generateContent = (item) => (
    <div>
      <Text strong>{item.title}</Text>
      <br />
      <Text>{`(${moment(item.timeStart).format('hh:mm')}-${moment(item.timeEnd).format('hh:mm')})`}</Text>
    </div>
  );

  const dateCellRender = (date) => {
    const listData = data.filter(
      (item) => item.day === date.date() && item.month === date.month() && item.year === date.year()
    );
    return (
      <div>
        {listData.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setScheduleModalVisible(true);
              setScheduleModalDetail(item);
            }}>
            <Badge status={item.badgeType} text={generateContent(item)} />
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
      <div className={'header'}>
        <Typography.Title level={3}>Interview schedule</Typography.Title>
        <Row gutter={8} style={{ marginLeft: 'auto' }}>
          <Col>
            <Select
              dropdownMatchSelectWidth={false}
              className='my-year-select'
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
      </div>
    );
  };

  return (
    <Calendar
      className={'interview-schedule-calendar'}
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onPanelChange={onPanelChange}
      headerRender={headerRender}
    />
  );
};
