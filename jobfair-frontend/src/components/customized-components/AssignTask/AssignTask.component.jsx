import { Badge, Calendar, Typography } from 'antd';
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
      (item) => item.date === date.date() && item.month === date.month() && item.year === date.year()
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

  return (
    <>
      <Calendar dateFullCellRender={dateFullCellRender} />
    </>
  );
};

export default AssignTaskComponent;
