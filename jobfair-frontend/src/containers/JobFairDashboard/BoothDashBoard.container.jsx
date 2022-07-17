import { Col, PageHeader, Row } from 'antd';
import { DashBoardJobPositionStatistics } from '../../components/customized-components/JobFairDashboard/DashBoardJobPositionStatistics.component';
import { DashboardCVStatistics } from '../../components/customized-components/JobFairDashboard/DashboardCVStatistics.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import React, { useEffect, useState } from 'react';

const BoothDashBoardContainer = ({ boothId }) => {
  const [data, setData] = useState();

  useEffect(() => {
    //TODO: add polling interval
    fetchData();
  }, []);

  const fetchData = async () => {
    setData({
      jobFair: {
        name: 'hello world',
        beginTime: 0,
        endTime: 0
      },
      generalStatistics: {
        boothNum: 10,
        participationNum: 500,
        jobPositionNum: 500,
        employeeNum: 10
      },
      cvStatistics: {
        pendingNum: 300,
        approvedNum: 500,
        rejectNum: 400,
        matchingAverage: 0.55,
        matchingRange: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      jobPositions: [
        {
          id: '1',
          name: 'Job position',
          goal: 5,
          current: 1
        },
        {
          id: '2',
          name: 'Job position',
          goal: 5,
          current: 1
        },
        {
          id: '3',
          name: 'Job position',
          goal: 5,
          current: 1
        },
        {
          id: '4',
          name: 'Job position',
          goal: 5,
          current: 1
        }
      ],
      booths: [
        {
          id: '123',
          name: 'tien',
          visitNum: 10,
          cvNum: 10
        },
        {
          id: '112323',
          name: 'tien',
          visitNum: 10,
          cvNum: 10
        },
        {
          id: '123123',
          name: 'tien',
          visitNum: 10,
          cvNum: 10
        },
        {
          id: '112323',
          name: 'tien',
          visitNum: 10,
          cvNum: 10
        }
      ]
    });
  };

  if (data === undefined) return <LoadingComponent isWholePage={true} />;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <PageHeader
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            Booth's name: <span style={{ fontWeight: 400 }}>{data.jobFair.name}</span>
          </div>
        }
      />
      <Row gutter={20} style={{ marginTop: '1rem' }}>
        <Col xs={24} xxl={12}>
          <DashboardCVStatistics data={data.cvStatistics} />
        </Col>
        <Col xs={24} xxl={12}>
          <DashBoardJobPositionStatistics data={data.jobPositions} />
        </Col>
      </Row>
    </div>
  );
};

export default BoothDashBoardContainer;
