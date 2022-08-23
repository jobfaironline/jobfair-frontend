import './AdminDashboard.container.scss';
import { AdminDashBoardAccountStatistics } from './AdminDashBoardAccountStatistics.component';
import { AdminDashBoardJobFairStatistics } from './AdminDashboardJobFairStatistics.component';
import { Button, Col, DatePicker, Form, PageHeader, Row, Tabs, Tag, Typography, notification } from 'antd';
import { Column } from '@ant-design/charts';
import { ENDPOINT_ADMIN_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FundFilled, ProjectFilled } from '@ant-design/icons';
import { GenericDonutChart } from '../../components/commons/Chart/GenericDonutChart.component';
import { GenericPieChart } from '../../components/commons/Chart/GenericPieChart.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { faBuilding, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
import { getAllJobFairForAdminInRangeAPI } from '../../services/jobhub-api/JobFairControllerService';
import { useForm } from 'antd/lib/form/Form';
import { useSWRFetch } from '../../hooks/useSWRFetch';
import React, { useEffect, useState } from 'react';
import UserAccessTimelineChartContainer from './UserAccessTimelineChart.container';
import moment from 'moment/moment';

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const OverallDashBoardStatistics = ({ data }) => {
  const { companyNum = 'No data', jobFairNum = 'No data', accountNum = 'No data', visitorNum = 'No data' } = data;
  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faBuilding} style={{ fontSize: '40px' }} />
          </div>

          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of companies</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{companyNum}</p>
          </div>
        </div>
      </Tag>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <FundFilled style={{ fontSize: '40px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of job fairs</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{jobFairNum}</p>
          </div>
        </div>
      </Tag>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '40px' }} />
          </div>
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of attendants</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{accountNum}</p>
          </div>
        </div>
      </Tag>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '15px', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faChartLine} style={{ fontSize: '40px' }} />
          </div>
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of visitors</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{visitorNum}</p>
          </div>
        </div>
      </Tag>
    </div>
  );
};

const enumerateDaysBetweenDates = (startDate, endDate) => {
  const dates = [];

  const currDate = moment(startDate).startOf('day').subtract(1, 'day');
  const lastDate = moment(endDate).startOf('day').add(1, 'day');

  while (currDate.add(1, 'days').diff(lastDate) < 0) dates.push(currDate.clone().format('MM-DD'));

  return dates;
};

const JobFairChart = () => {
  const [dateRange, setDateRange] = useState([moment().subtract(10, 'd'), moment()]);
  const [data, setData] = useState();
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue('dateRange', dateRange);
  }, []);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    const res = await getAllJobFairForAdminInRangeAPI({ from: dateRange[0].valueOf(), to: dateRange[1].valueOf() });
    let data = res.data;
    data = data.reduce((prev, current) => {
      const date = moment(current.createTime).format('MM-DD');
      if (prev[date] === undefined) {
        prev[date] = 1;
        return prev;
      }
      prev[date] += 1;
      return prev;
    }, {});
    const mappedData = [];
    for (const date of enumerateDaysBetweenDates(dateRange[0], dateRange[1])) {
      mappedData.push({
        time: date,
        count: data[date] ?? 0,
        value: data[date] ?? 0
      });
    }

    setData(mappedData);
  };

  const onFinish = (values) => {
    setDateRange(values.dateRange);
  };

  const config = {
    data,
    xField: 'time',
    yField: 'count',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6
      }
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false
      }
    }
  };
  return (
    <>
      <Row align='middle'>
        <Col span={12}>
          <Typography.Title level={4}>Job fair count</Typography.Title>
        </Col>
        <Col span={12}>
          <Form
            name='time_related_controls'
            form={form}
            onFinish={onFinish}
            initialValues={{
              dateRange
            }}>
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
      {data !== undefined ? <Column {...config} /> : <LoadingComponent />}
    </>
  );
};

const AdminDashBoardContainer = () => {
  const { response, isLoading, isError } = useSWRFetch(`${ENDPOINT_ADMIN_STATISTICS}`, 'GET');

  if (isLoading) return <LoadingComponent isWholePage={true} />;
  if (isError) {
    notification['error']({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2
    });
    return null;
  }
  const data = response.data;

  const jobfairStatusChartData = [
    {
      type: 'Finished',
      value: data.jobFairStatistics.pastNum,
      color: '#62daab'
    },
    {
      type: 'In progress',
      value: data.jobFairStatistics.inProgressNum,
      color: '#f6cf32'
    },
    {
      type: 'Incoming',
      value: data.jobFairStatistics.incomingNum,
      color: '#6395f9'
    }
  ];

  const jobfairStatusColorMapping = ({ type }) =>
    jobfairStatusChartData.find((category) => category.type === type).color;

  const jobfairChartConfig = {
    defaultTitle: 'Total',
    defaultValue: `${
      data.jobFairStatistics.pastNum + data.jobFairStatistics.inProgressNum + data.jobFairStatistics.incomingNum
    } Job fair(s)`,
    contentSuffix: ' Job fair(s)',
    color: jobfairStatusColorMapping,
    width: 450,
    height: 450
  };

  const accountStatusChartData = [
    {
      type: 'Verified',
      value: data.accountStatistics.verifiedNum,
      color: '#62daab'
    },
    {
      type: 'Registered',
      value: data.accountStatistics.registeredNum,
      color: '#f6cf32'
    },
    {
      type: 'Inactive',
      value: data.accountStatistics.inactiveNum,
      color: '#6395f9'
    },
    {
      type: 'Suspended',
      value: data.accountStatistics.suspendedNum,
      color: '#f34b49'
    }
  ];
  const accountStatusChartColorMapping = ({ type }) =>
    accountStatusChartData.find((category) => category.type === type).color;

  const accountRatioChartData = [
    {
      type: 'Attendant',
      value: data.accountStatistics.attendantNum,
      color: '#6395f9'
    },
    {
      type: 'Company manager',
      value: data.accountStatistics.companyManagerNum,
      color: '#62daab'
    },
    {
      type: 'Employee',
      value: data.accountStatistics.companyEmployeeNum,
      color: '#f34b49'
    }
  ];
  const accountRatioChartColorMapping = ({ type }) =>
    accountRatioChartData.find((category) => category.type === type).color;

  return (
    <div style={{ marginBottom: '2rem' }} className={'admin-dashboard-container'}>
      <PageHeader
        title={
          <div
            style={{
              width: '30vw',
              fontWeight: 500,
              fontSize: '2rem'
            }}>
            <ProjectFilled style={{ marginRight: '5px' }} />
            Admin dashboard
          </div>
        }
      />
      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='Overall statistic' key='1'>
          <div style={{ display: 'flex', margin: '0 15%', flexDirection: 'column' }}>
            <Title level={3} id={'overall-statistics'}>
              Overall statistic
            </Title>
            <div>
              <OverallDashBoardStatistics
                data={{
                  companyNum: data.generalStatistics.companyNum,
                  jobFairNum:
                    data.jobFairStatistics.inProgressNum +
                    data.jobFairStatistics.incomingNum +
                    data.jobFairStatistics.pastNum,
                  accountNum: data.accountStatistics.attendantNum,
                  visitorNum: data.generalStatistics.visitorNum
                }}
              />
            </div>
            <div style={{ marginTop: '2rem' }}>
              <JobFairChart />
            </div>
          </div>
        </TabPane>
        <TabPane tab='Job fair statistic' key='2'>
          <div style={{ display: 'flex', margin: '0 15%', flexDirection: 'column' }}>
            <Title level={3} id={'jobfair-statistics'}>
              Job fair statistics
            </Title>
            <Row gutter={[16, 16]}>
              <AdminDashBoardJobFairStatistics data={data.jobFairStatistics} />
            </Row>
            <Row gutter={[16, 16]} style={{ padding: '3rem 0rem' }} align='middle'>
              <Col span={14}>
                <UserAccessTimelineChartContainer />
              </Col>
              <Col span={10}>
                <GenericDonutChart
                  data={jobfairStatusChartData}
                  config={jobfairChartConfig}
                  title={'Job fair statistics'}
                />
              </Col>
            </Row>
          </div>
        </TabPane>
        <TabPane tab='Account statistic' key='3'>
          <div style={{ display: 'flex', margin: '0 15%', flexDirection: 'column' }}>
            <Title level={3} id={'account-company-statistic'}>
              Account and company statistic
            </Title>
            <AdminDashBoardAccountStatistics
              data={{
                attendantNum: data.accountStatistics.attendantNum,
                companyNum: data.generalStatistics.companyNum,
                accountNum:
                  data.accountStatistics.inactiveNum +
                  data.accountStatistics.registeredNum +
                  data.accountStatistics.suspendedNum +
                  data.accountStatistics.verifiedNum
              }}
            />
            <Row gutter={16} align={'middle'}>
              <Col span={12}>
                <GenericPieChart
                  data={accountStatusChartData}
                  config={{ color: accountStatusChartColorMapping }}
                  title={'Account status'}
                />
              </Col>
              <Col span={12}>
                <GenericPieChart
                  data={accountRatioChartData}
                  config={{ color: accountRatioChartColorMapping }}
                  title={'Role ratio'}
                />
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminDashBoardContainer;
