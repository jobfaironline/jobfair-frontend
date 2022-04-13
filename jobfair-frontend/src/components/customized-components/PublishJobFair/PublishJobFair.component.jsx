import './PublishJobFair.styles.scss';
import { Button, Card, Popconfirm, Steps, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToUTCString } from '../../../utils/common';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Text } = Typography;
const { Step } = Steps;
const PublishJobFairComponent = ({ onHandlePrev, onFinish, data }) => {
  // eslint-disable-next-line no-unused-vars
  if (data === undefined) return null;
  console.log(data);
  return (
    <div>
      <Card
        title='Job fair summary detail'
        style={{ width: '35rem', height: '45rem', marginTop: '5rem', marginLeft: '43rem' }}>
        <div className='publish-job-fair'>
          <a className={'prev-button'} type='primary' onClick={onHandlePrev}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
            <span>Back to landing page</span>
          </a>
          <Card title='Job fair schedule'>
            <div style={{ marginTop: '1rem' }}>
              <div>
                <Text strong>Decorate time: </Text>
                <Tag color='green'>{convertToUTCString(data.decorateRange[0])}</Tag>
                <Tag color='orange'>-></Tag>
                <Tag color='green'>{convertToUTCString(data.decorateRange[1])}</Tag>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Text strong>Public time: </Text>
                <Tag color='green'>{convertToUTCString(data.publicRange[0])}</Tag>
                <Tag color='orange'>-></Tag>
                <Tag color='green'>{convertToUTCString(data.publicRange[1])}</Tag>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <Text strong>Target attendant: </Text>
                <Text>{data.targetAttendant} </Text>
              </div>
            </div>
          </Card>
          <Card>
            <Steps direction='vertical'>
              <Step
                title='Choose job fair template'
                description={
                  <div style={{ width: '100px', height: '200px' }}>
                    <img src='https://photo-cms-tpo.zadn.vn/w890/uploads/2019/09/5d89a07aa50db-yolo-idea-2-800x600-600x450.jpg' />
                  </div>
                }
                status='finish'
              />
              <Step title='Schedule job fair' description='This is a description.' status='finish' />
              <Step title='Assign employee' description='This is a description.' status='finish' />
              <Step title='Create landing page' description='This is a description.' status='finish' />
            </Steps>
          </Card>
          <div className={'button-container'}>
            <Popconfirm
              title='Are you sure to publish this job fair?'
              onConfirm={() => onFinish(data.id)}
              okText='Yes'
              cancelText='No'>
              <Button type='primary' className={'confirm-button'}>
                Publish job fair
              </Button>
            </Popconfirm>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublishJobFairComponent;
