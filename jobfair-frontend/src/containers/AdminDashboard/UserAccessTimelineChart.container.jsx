import { Area } from '@ant-design/plots';
import { Button, Col, DatePicker, Form, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const fakeData = [
  {
    Date: 1654041600000,
    scales: 1
  },
  {
    Date: 1654387200000,
    scales: 8
  },
  {
    Date: 1654819200000,
    scales: 10
  },
  {
    Date: 1655251200000,
    scales: 20
  },
  {
    Date: 1655683200000,
    scales: 13
  },
  {
    Date: 1656637200000,
    scales: 30
  },
  {
    Date: 1656982800000,
    scales: 32
  },
  {
    Date: 1657414800000,
    scales: 42
  },
  {
    Date: 1657846800000,
    scales: 19
  },
  {
    Date: 1659056400000,
    scales: 10
  }
];

const UserAccessTimelineChartContainer = () => {
  const [data, setData] = useState(
    [...fakeData]?.map((obj) => ({ ...obj, Date: moment(obj.Date).format('YYYY-MM-DD') }))
  );
  const [dateRange, setDateRange] = useState([moment.now(), moment.now()]);
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue('dateRange', dateRange);
  }, []);

  useEffect(() => {
    //please use this useEffect to force this chart rerender when changing date range
    const data = [...fakeData]?.map((obj) => ({ ...obj, Date: moment(obj.Date).format('YYYY-MM-DD') }));
    setData(data);
  }, [dateRange]);

  //   const { response, isLoading, isError } = useSWRFetch(`./fake-data-admin`, 'GET');

  //   if (isLoading) return <LoadingComponent isWholePage={true} />;
  //   if (isError) {
  //     notification['error']({
  //       message: `Something went wrong! Try again latter!`,
  //       description: `There is problem while fetching data, try again later`,
  //       duration: 2
  //     });
  //     return null;
  //   }
  //   const data = response.data;

  //   console.log(data);

  const onFinish = (values) => {
    setDateRange(values.dateRange);
  };

  const config = {
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      range: [0, 1],
      tickCount: 10
    },
    annotations: [
      {
        type: 'text',
        position: ['min', 'mean'],
        content: 'Average',
        offsetY: -4,
        style: {
          textBaseline: 'bottom'
        }
      },
      {
        type: 'line',
        start: ['min', 'mean'],
        end: ['max', 'mean'],
        style: {
          stroke: 'red',
          lineDash: [2, 2]
        }
      }
    ],
    areaStyle: () => ({
      fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'
    })
  };

  return (
    <>
      <Row align='middle'>
        <Col span={12}>
          <Typography.Title level={4}>User Access Timeline</Typography.Title>
        </Col>
        <Col span={12}>
          <Form name='time_related_controls' form={form} onFinish={onFinish}>
            <Row gutter={[16, 16]} align='middle'>
              <Col span={20}>
                <Form.Item name='dateRange' label='Date range'>
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>
                    Search
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Area {...config} />
    </>
  );
};

export default UserAccessTimelineChartContainer;
