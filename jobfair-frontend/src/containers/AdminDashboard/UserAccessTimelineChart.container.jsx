import { Area } from '@ant-design/plots';
import { Button, Col, DatePicker, Form, Row, Typography } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;

const fakeData = [
  {
    Date: 1658840587,
    scales: 1998
  },
  {
    Date: 2668840588,
    scales: 1850
  },
  {
    Date: 3678840589,
    scales: 1720
  },
  {
    Date: 4688840590,
    scales: 1818
  },
  {
    Date: 5698840591,
    scales: 1920
  },
  {
    Date: 6708840592,
    scales: 1802
  },
  {
    Date: 7718840593,
    scales: 1945
  },
  {
    Date: 8728840594,
    scales: 1856
  },
  {
    Date: 9738840595,
    scales: 2107
  },
  {
    Date: 13678840589,
    scales: 1720
  },
  {
    Date: 14688840590,
    scales: 1818
  },
  {
    Date: 15698840591,
    scales: 1920
  },
  {
    Date: 16708840592,
    scales: 1802
  },
  {
    Date: 17718840593,
    scales: 1945
  },
  {
    Date: 18728840594,
    scales: 1856
  },
  {
    Date: 19738840595,
    scales: 2107
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
    setData([...fakeData]?.map((obj) => ({ ...obj, Date: moment(obj.Date).format('YYYY-MM-DD') })));
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
          <Typography.Title level={2}>User Access Timeline</Typography.Title>
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
