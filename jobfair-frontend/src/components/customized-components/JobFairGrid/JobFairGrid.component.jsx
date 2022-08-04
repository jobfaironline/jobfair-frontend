import './JobFairGrid.styles.scss';
import { Button, Card, Col, List, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertToDateString } from '../../../utils/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Countdown from 'react-countdown';
import React from 'react';

const { Text } = Typography;

const handleCardContent = (role, jobFair) => {
  const renderer = ({ hours, minutes, seconds, days }) => (
    <div>
      {days ? `${days.toString()}day(s) ` : null}
      {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
    </div>
  );
  switch (role) {
    case 'COMPANY_MANAGER':
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ maxWidth: '200px' }}>
            <Card.Meta title={<Text>{jobFair?.name}</Text>} />
            <Text>{convertToDateString(jobFair?.createTime)}</Text>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <Text>{jobFair?.status}</Text>
          </div>
        </div>
      );
    case 'ATTENDANT':
      return (
        <div>
          <Card.Meta title={`${jobFair?.name} from ${jobFair?.company?.name}`} style={{ width: '100%' }} />
          <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex' }}>
              <p style={{ marginRight: '5px', marginBottom: '0' }}>Remaining time: </p>{' '}
              <Countdown date={jobFair?.publicEndTime} renderer={renderer} />
            </div>
            <div className={'card-footer-item'}>
              <Text>Visitors: </Text>
              <Text> {jobFair?.visitCount}</Text>
            </div>
          </div>
        </div>
      );
    default:
      return <Card.Meta title={jobFair?.name} description={jobFair?.companyName} />;
  }
};

const JobFairForGuestDescription = ({ jobFair }) => (
  <div style={{ marginRight: '15rem' }}>
    <Row>
      <Col span={12}>
        <Typography.Text strong>Miêu tả ngắn: </Typography.Text>
        <Typography.Text>{jobFair?.description}</Typography.Text>
      </Col>
      <Col span={12}>
        <Typography.Text strong>Đơn vị tổ chức: </Typography.Text>
        <Typography.Text>{jobFair?.hostName}</Typography.Text>
      </Col>
    </Row>
    <Row>
      <Col span={8}>
        <Typography.Text strong>Thời gian bắt đầu:: </Typography.Text>
        <Typography.Text>{convertToDateString(jobFair?.publicStartTime)}</Typography.Text>
      </Col>
      <Col span={8}> {' -> '}</Col>
      <Col span={8}>
        <Typography.Text strong>Thời gian kết thúc: </Typography.Text>
        <Typography.Text>{convertToDateString(jobFair?.publicEndTime)}</Typography.Text>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Typography.Text strong>Đối tượng tham gia chính:</Typography.Text>
        <Typography.Text>{jobFair?.targetAttendant}</Typography.Text>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Button type='primary' className='button'>
          Tham gia job fair ngay!
        </Button>
      </Col>
    </Row>
  </div>
);

const JobFairGridCard = ({ onClick, item, defaultImage, role }) => (
  <Card
    hoverable={true}
    className={'card'}
    cover={
      <img
        src={item.thumbnailUrl ? item.thumbnailUrl : defaultImage}
        alt={item.name}
        onClick={() => onClick(item.id)}
        className={'cover'}
      />
    }>
    {handleCardContent(role, item)}
  </Card>
);

const JobFairGridComponent = (props) => {
  const { data, onClick, role, onAddJobFair } = props;
  const defaultImage = 'https://d3polnwtp0nqe6.cloudfront.net/General/jobhub.png';
  return (
    <div className={'job-fair-grid'}>
      <List
        grid={{ gutter: 10, xs: 2, sm: 2, md: 3, lg: 3, xl: 4, xxl: 5 }}
        dataSource={data}
        renderItem={(item) => {
          if (item.isFirst) {
            return (
              <Card className={'card add-card'} hoverable={true} onClick={onAddJobFair}>
                <FontAwesomeIcon icon={faPlus} size={'xl'} />
              </Card>
            );
          }
          return (
            <>
              {role === undefined ? (
                <div>
                  <JobFairForGuestDescription jobFair={item} />
                  <JobFairGridCard item={item} onClick={onClick} role={role} defaultImage={defaultImage} />
                </div>
              ) : null}
              {role !== undefined ? (
                <div>
                  <JobFairGridCard item={item} onClick={onClick} role={role} defaultImage={defaultImage} />
                </div>
              ) : null}
            </>
          );
        }}
      />
    </div>
  );
};

export default JobFairGridComponent;
