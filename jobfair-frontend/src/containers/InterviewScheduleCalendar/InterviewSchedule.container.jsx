import './styles.scss';
import { Alert, Badge, Popover, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { handleType } from '../../utils/common';
import InterviewScheduleCalendarComponent from '../../components/customized-components/InterviewScheduleCalendar/InterviewScheduleCalendar.component';
import InterviewScheduleModalDetailComponent from '../../components/customized-components/InterviewScheduleModalDetail/InterviewScheduleModalDetail.component';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { Text } = Typography;
const fakeData = [
  {
    title: 'Interview with Google',
    status: 'PENDING',
    description: 'something you want to write',
    interviewDate: 1650964804000,
    timeStart: 1651047604000,
    timeEnd: 1651051204000,
    interviewLink: 'https://google.com'
  },
  {
    title: 'Have fun with Google',
    status: 'FINISH',
    description: 'something you want to write',
    interviewDate: 1650964804000,
    timeStart: 1651047604000,
    timeEnd: 1651051204000,
    interviewLink: 'https://google.com'
  },
  {
    title: 'Interview with Twitter',
    status: 'FINISH',
    description: 'something you want to write',
    interviewDate: 1651051204000,
    timeStart: 1651047604000,
    timeEnd: 1651051204000,
    interviewLink: 'https://twitter.com'
  },
  {
    title: 'Interview with Facebook',
    status: 'CANCEL',
    description: 'something you want to write',
    interviewDate: 1651137604000,
    timeStart: 1651047604000,
    timeEnd: 1651051204000,
    interviewLink: 'https://facebook.com'
  }
];
const InterviewScheduleContainer = () => {
  const [value, setValue] = useState({
    value: moment('2022-04-26'),
    selectedValue: moment('2022-04-26')
  });
  const [interviewSchedule, setInterviewSchedule] = useState([]);
  const [visible, setVisible] = useState(false);
  const [modalDetail, setModalDetail] = useState();

  useEffect(() => {
    setInterviewSchedule(fakeData);
  }, []);

  const handleContent = (item) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Popover
        content={
          <div
            onClick={() => {
              setVisible(true);
              setModalDetail(item);
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
      <Text italic>{item.interviewLink}</Text>
    </div>
  );

  const getScheduleArray = () => {
    const result = {};
    fakeData
      .map((item) => {
        item['day'] = new Date(item.interviewDate).getUTCDate();
        return item;
      })
      .forEach((item) => {
        if (!result[item.day]) result[item.day] = [];
        result[item.day].push(item);
      });
    return result;
  };

  const getListData = (value) => {
    //value.date() will display all date on the screen
    const result = getScheduleArray();
    const listData = result[value.date()];
    const render = listData?.map((item) => ({
      content: handleContent(item),
      type: handleType(item.status)
    }));
    return render || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
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

  const disableDate = (value) => {
    if (value.date() === 30) return true;
    return false;
  };

  const onCancelModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <Alert message={`You selected date: ${value.selectedValue && value.selectedValue.format('YYYY-MM-DD')}`} />
      <InterviewScheduleModalDetailComponent visible={visible} onCancel={onCancelModal} data={modalDetail} />
      <InterviewScheduleCalendarComponent
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        value={value.value}
        onSelect={handleSelect}
        onPanelChange={handlePanelChange}
        disabledDate={disableDate}
      />
    </div>
  );
};

export default InterviewScheduleContainer;
