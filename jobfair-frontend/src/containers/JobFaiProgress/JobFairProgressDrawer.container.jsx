import './JobFairProgressDrawer.styles.scss';
import { Col, Collapse, Drawer, Progress, Row, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { getJobFairProgress } from '../../services/jobhub-api/JobFairControllerService';
import { green } from '@ant-design/colors';
import React, { useEffect, useState } from 'react';

const { Panel } = Collapse;
const { Title, Text } = Typography;

export const JobFairProgressDrawerContainer = ({ jobFairId, visibility, onClose }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, [visibility]);

  const fetchData = async () => {
    try {
      const { data } = await getJobFairProgress(jobFairId);
      setData(data);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  if (data === undefined) return <LoadingComponent isWholePage={false} />;

  return (
    <Drawer width={640} placement='right' closable={false} onClose={onClose} visible={visibility}>
      <div className={'job-fair-progress'}>
        <Title level={3}>Employee progress of job fair '{data.name}'</Title>
        <div className={'progress-bar'}>
          <Progress percent={(data.overallProgress * 100).toFixed(2)} strokeColor={green[6]} />
        </div>
        {data.booths.map((boothInfo) => {
          let taskCount = 0;
          if (boothInfo.supervisor.assignTask) taskCount++;
          if (boothInfo.supervisor.boothProfile) taskCount++;
          if (boothInfo.decorator.decorate) taskCount++;
          return (
            <Collapse>
              <Panel
                key={boothInfo.id}
                header={
                  <div className={'booth-header'}>
                    <Title level={5}>{boothInfo.name}</Title>
                    <Text strong={true} style={{ marginLeft: 'auto', color: taskCount === 3 ? green[6] : 'red' }}>
                      {taskCount}/3 tasks done
                    </Text>
                  </div>
                }>
                <Row gutter={10}>
                  <Col span={12}>
                    <Text strong={true} style={{ fontSize: '1rem' }}>
                      Supervisor: {boothInfo.supervisor.name}
                    </Text>
                    <div className={'task-item'}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        color={boothInfo.supervisor.assignTask ? 'green' : 'gray'}
                      />
                      <Text>Assign task</Text>
                    </div>
                    <div className={'task-item'}>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        color={boothInfo.supervisor.boothProfile ? 'green' : 'gray'}
                      />
                      <Text>Fill booth description</Text>
                    </div>
                  </Col>
                  <Col span={12}>
                    <Text strong={true} style={{ fontSize: '1rem' }}>
                      Decorator: {boothInfo.decorator.name}
                    </Text>
                    <div className={'task-item'}>
                      <FontAwesomeIcon icon={faCircleCheck} color={boothInfo.decorator.decorate ? 'green' : 'gray'} />
                      <Text>Decorate booth</Text>
                    </div>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          );
        })}
      </div>
    </Drawer>
  );
};
