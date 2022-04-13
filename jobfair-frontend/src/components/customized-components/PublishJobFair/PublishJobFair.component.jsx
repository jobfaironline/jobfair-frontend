import './PublishJobFair.styles.scss';
import { Button, Card, Popconfirm, Steps, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToUTCString } from '../../../utils/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Text } = Typography;
const { Step } = Steps;
const PublishJobFairComponent = ({ onHandlePrev, onFinish, jobFairData, statistics }) => (
  <div>
    <Card
      title='Job fair summary detail'
      style={{ width: '35rem', height: '45rem', marginTop: '5rem', marginLeft: '43rem' }}>
      <div className='publish-job-fair'>
        {onHandlePrev ? (
          <a className={'prev-button'} type='primary' onClick={onHandlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
            <span>Back to landing page</span>
          </a>
        ) : null}
        <Steps direction='vertical'>
          <Step
            title='Choose job fair template'
            description={
              <div style={{ width: '100px', height: '200px' }}>
                <img src={jobFairData.thumbnailUrl} />
              </div>
            }
            status='finish'
          />
          <Step
            title='Schedule job fair'
            description={
              <div style={{ marginTop: '1rem' }}>
                <div>
                  <Text strong>Decorate time: </Text>
                  <Tag color='green'>{convertToUTCString(jobFairData.decorateStartTime)}</Tag>
                  <Tag color='orange'>-></Tag>
                  <Tag color='green'>{convertToUTCString(jobFairData.decorateEndTime)}</Tag>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Text strong>Public time: </Text>
                  <Tag color='green'>{convertToUTCString(jobFairData.publicStartTime)}</Tag>
                  <Tag color='orange'>-></Tag>
                  <Tag color='green'>{convertToUTCString(jobFairData.publicEndTime)}</Tag>
                </div>
              </div>
            }
            status='finish'
          />
          <Step
            title='Assign employee'
            description={
              <div style={{ marginTop: '1rem' }}>
                <div>
                  <Text strong>Total of booth: </Text>
                  <Text color='green'>{statistics.boothTotal}</Text>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Text strong>Number of assigned booth: </Text>
                  <Text color='green'>{statistics.assignedBoothNum}</Text>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Text strong>Total of employee: </Text>
                  <Text>{statistics.employeeTotal} </Text>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Text strong>Number of assigned employee: </Text>
                  <Text>{statistics.assignedEmployeeNum} </Text>
                </div>
              </div>
            }
            status='finish'
          />
          <Step
            title='Create landing page'
            description={
              <div style={{ marginTop: '1rem' }}>
                <div>
                  <Text strong>Host name: </Text>
                  <Text color='green'>{jobFairData.hostName}</Text>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Text strong>Description: </Text>
                  <Text color='green'>{jobFairData.description}</Text>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <Text strong>Target attendant: </Text>
                  <Text>{jobFairData.targetAttendant} </Text>
                </div>
              </div>
            }
            status='finish'
          />
        </Steps>
        {onFinish ? (
          <div className={'button-container'}>
            <Popconfirm
              title='Are you sure to publish this job fair?'
              onConfirm={onFinish}
              okText='Yes'
              cancelText='No'>
              <Button type='primary' className={'confirm-button'}>
                Publish job fair
              </Button>
            </Popconfirm>
          </div>
        ) : null}
      </div>
    </Card>
  </div>
);

export default PublishJobFairComponent;
