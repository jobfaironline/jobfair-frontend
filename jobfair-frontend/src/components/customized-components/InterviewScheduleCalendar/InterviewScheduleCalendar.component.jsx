import './InterviewScheduleCalendar.styles.scss';
import { Badge, Calendar, Col, Row, Select, Typography } from 'antd';
import { INTERVIEW_SCHEDULE_STATUS } from '../../../constants/InterviewScheduleConst';
import React from 'react';

const { Text } = Typography;

const getBadgeType = (status) => {
  switch (status) {
    case INTERVIEW_SCHEDULE_STATUS.NOT_YET:
      return 'warning';
    case INTERVIEW_SCHEDULE_STATUS.DONE:
      return 'success';
    case INTERVIEW_SCHEDULE_STATUS.REQUEST_CHANGE:
      return 'error';
    case INTERVIEW_SCHEDULE_STATUS.INTERVIEWING:
      return 'processing';
    default:
      return 'default';
  }
};

export const InterviewScheduleCalendar = (props) => {
  const { data, onPanelChange, onOpenScheduleDetail } = props;

  const dateCellRender = (date) => {
    const listData = data.filter(
      (item) => item.day === date.date() && item.month === date.month() && item.year === date.year()
    );
    if (listData === undefined || listData.length === 0) return;
    const notYetNum = listData.filter((item) => item.status === INTERVIEW_SCHEDULE_STATUS.NOT_YET).length;
    const doneNum = listData.filter((item) => item.status === INTERVIEW_SCHEDULE_STATUS.DONE).length;
    const requestChangeNum = listData.filter((item) => item.status === INTERVIEW_SCHEDULE_STATUS.REQUEST_CHANGE).length;
    const interviewingNum = listData.filter((item) => item.status === INTERVIEW_SCHEDULE_STATUS.INTERVIEWING).length;

    return (
      <div
        onClick={() => {
          onOpenScheduleDetail(date, listData);
        }}>
        {notYetNum === 0 ? null : (
          <Badge
            status={getBadgeType(INTERVIEW_SCHEDULE_STATUS.NOT_YET)}
            text={
              <Text style={{ fontSize: '1rem' }}>
                <Text strong={true}>{notYetNum}</Text> not yet interview(s)
              </Text>
            }
          />
        )}
        {doneNum === 0 ? null : (
          <Badge
            status={getBadgeType(INTERVIEW_SCHEDULE_STATUS.DONE)}
            text={
              <Text style={{ fontSize: '1rem' }}>
                <Text strong={true}>{doneNum}</Text> done interview(s)
              </Text>
            }
          />
        )}
        {requestChangeNum === 0 ? null : (
          <Badge
            status={getBadgeType(INTERVIEW_SCHEDULE_STATUS.REQUEST_CHANGE)}
            text={
              <Text style={{ fontSize: '1rem' }}>
                <Text strong={true}>{requestChangeNum}</Text> request change interview(s)
              </Text>
            }
          />
        )}
        {interviewingNum === 0 ? null : (
          <Badge
            status={getBadgeType(INTERVIEW_SCHEDULE_STATUS.INTERVIEWING)}
            text={
              <Text style={{ fontSize: '1rem' }}>
                <Text strong={true}>{interviewingNum}</Text> happening interview(s)
              </Text>
            }
          />
        )}
      </div>
    );
  };

  const monthCellRender = () => null;

  const headerRender = ({ value, onChange }) => {
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
          {/*<Col>
            <Radio.Group onChange={(e) => onTypeChange(e.target.value)} value={type}>
              <Radio.Button value='month'>Month</Radio.Button>
              <Radio.Button value='year'>Year</Radio.Button>
            </Radio.Group>
          </Col>*/}
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
