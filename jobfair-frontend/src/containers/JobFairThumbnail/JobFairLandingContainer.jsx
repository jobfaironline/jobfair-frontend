import './JobFairLandingPage.styles.scss';
import { Button, Divider, Image, Tag, Tooltip, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH } from '../../constants/Paths/Path';
import { convertToDateString } from '../../utils/common';
import { faLink, faMinus } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { getJobFairByIDAPI } from '../../services/jobhub-api/JobFairControllerService';
import React, { useEffect, useState } from 'react';

const { Text, Title } = Typography;

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

  const onClickLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className={'job-fair-landing-container'}>
      <div className={'shadow'}>
        <div
          className={'header'}
          style={{
            background: `linear-gradient(rgba(72,159,192,0.8), rgba(0,10,72,0.8)), url("${jobFairData.thumbnailUrl}")`
          }}>
          <div className={'overlay'}>
            <div>
              <Image src={jobFairData.thumbnailUrl} style={{ borderRadius: '8px' }} />
            </div>
            <div className={'general'}>
              <div className={'title'}>
                <Title level={1}>{jobFairData?.name}</Title>
                <Tooltip title={'Copy link'}>
                  <FontAwesomeIcon className={'icon'} icon={faLink} color={'white'} size={'xl'} onClick={onClickLink} />
                </Tooltip>
              </div>

              <Title level={5} style={{ marginBottom: '0.3rem' }}>
                <CalendarOutlined /> {convertToDateString(jobFairData?.publicStartTime)} -{' '}
                {convertToDateString(jobFairData?.publicEndTime)}
              </Title>
              <Title level={5} style={{ marginBottom: '0.3rem' }}>
                Host by {jobFairData?.hostName}
              </Title>
              <div style={{ marginBottom: '0.3rem' }}>
                <Typography.Text strong>Category: </Typography.Text>
                {jobFairData?.company?.subCategoryDTOs.map((item) => (
                  <Tag color='blue'>{item.name}</Tag>
                ))}
              </div>
              <Button
                type='default'
                shape='round'
                size='large'
                style={{ width: '20rem', backgroundColor: '#ffffff38', color: 'white', marginTop: '1rem' }}
                onClick={handleJoinJobFair}>
                Join now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={'detail'}>
        <Title level={3}>Description</Title>
        <Text className={'description'}>{jobFairData?.description}</Text>
        <Divider style={{ borderTop: '1px solid white' }} />
        <Title level={3}>Schedule</Title>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <div className={'time-cube'}>{convertToDateString(jobFairData?.publicStartTime)}</div>
          <FontAwesomeIcon icon={faMinus} style={{ color: 'white' }} />
          <div className={'time-cube'}>{convertToDateString(jobFairData?.publicEndTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default JobFairLandingContainer;
