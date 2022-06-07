import './JobFairLanding.container.styles.scss';
import { Button, Divider, Image, Tag, Tooltip, Typography } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { CompactCompanyProfile } from '../../components/customized-components/CompanyProfile/CompactCompanyProfile.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH } from '../../constants/Paths/Path';
import { convertToDateString } from '../../utils/common';
import { faLink, faMinus } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import { getJobFairByIDAPI } from '../../services/jobhub-api/JobFairControllerService';
import { mapCompanyProfileFromAPIResponse } from '../../utils/mapperCompanyProfile';
import React, { useEffect, useState } from 'react';

const { Text, Title } = Typography;

const JobFairLandingContainer = ({ jobFairId, isReview }) => {
  const [jobFairData, setJobFairData] = useState(undefined);
  const history = useHistory();

  useEffect(async () => {
    const data = (await getJobFairByIDAPI(jobFairId)).data;
    setJobFairData(data);
  }, []);

  const handleJoinJobFair = () => {
    if (isReview) return;
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {
      jobFairId
    });
    history.push(url);
  };

  const onClickLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  if (jobFairData === undefined) return <LoadingComponent isWholePage={true} />;

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
        <Divider />
        <Title level={3}>Schedule</Title>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
          <div className={'time-cube'}>{convertToDateString(jobFairData?.publicStartTime)}</div>
          <FontAwesomeIcon icon={faMinus} />
          <div className={'time-cube'}>{convertToDateString(jobFairData?.publicEndTime)}</div>
        </div>
        <Divider />
        <Title level={3}>About the host</Title>

        <CompactCompanyProfile data={mapCompanyProfileFromAPIResponse(jobFairData?.company)} />
      </div>
    </div>
  );
};

export default JobFairLandingContainer;
