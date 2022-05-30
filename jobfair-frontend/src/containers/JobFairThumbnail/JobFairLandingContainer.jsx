import { Button, Card, Divider, Space, Tag, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH } from '../../constants/Paths/Path';
import { convertToDateString } from '../../utils/common';
import { faArrowRight, faHourglassEnd, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { getJobFairByIDAPI } from '../../services/jobhub-api/JobFairControllerService';
import JobFairThumbnailComponent from '../../components/customized-components/JobFairThumbnail/JobFairThumbnail.component';
import React, { useEffect, useState } from 'react';

const JobFairDetail = ({ jobFair, handleJoinJobFair }) => (
  <Space direction='vertical' size='middle'>
    <Typography.Title>{jobFair?.name}</Typography.Title>
    <Space>
      <div>
        <Typography.Text strong>
          <FontAwesomeIcon icon={faHourglassStart} /> Start Time:{' '}
        </Typography.Text>
        <Typography.Text>{convertToDateString(jobFair?.publicStartTime)}</Typography.Text>
      </div>
      <FontAwesomeIcon icon={faArrowRight} />
      <div>
        <Typography.Text strong>
          <FontAwesomeIcon icon={faHourglassEnd} /> End Time:{' '}
        </Typography.Text>
        <Typography.Text>{convertToDateString(jobFair?.publicEndTime)}</Typography.Text>
      </div>
    </Space>
    <div>
      <Typography.Text strong>Target attendant: </Typography.Text>
      <Typography.Text>{jobFair?.targetAttendant}</Typography.Text>
    </div>
    <div>
      <Typography.Text strong>Category: </Typography.Text>
      {jobFair?.company?.subCategoryDTOs.map((item) => (
        <Tag color='blue'>{item.name}</Tag>
      ))}
    </div>
    <Button type='default' shape='round' size='large' style={{ width: '25rem' }} onClick={handleJoinJobFair}>
      Join now
    </Button>
  </Space>
);

const JobFairDescription = ({ jobFair }) => (
  <div>
    <Typography.Text strong>Description:</Typography.Text>
    <Typography.Paragraph>{jobFair?.description}</Typography.Paragraph>
  </div>
);

const JobFairLandingContainer = () => {
  const { jobFairId } = useParams();
  const [jobFairData, setJobFairData] = useState({});
  const history = useHistory();

  useEffect(async () => {
    const data = (await getJobFairByIDAPI(jobFairId)).data;
    setJobFairData(data);
  }, []);

  const handleJoinJobFair = () => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {
      jobFairId
    });
    history.push(url);
  };

  return (
    <div>
      <Card style={{ marginTop: '15rem' }}>
        <Card.Meta
          title={
            <>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <JobFairThumbnailComponent urlImage={jobFairData.thumbnailUrl} />
                <JobFairDetail jobFair={jobFairData} handleJoinJobFair={handleJoinJobFair} />
              </div>
              <Divider />
            </>
          }
          description={
            <div style={{ marginLeft: '15rem' }}>
              <JobFairDescription jobFair={jobFairData} />
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default JobFairLandingContainer;
