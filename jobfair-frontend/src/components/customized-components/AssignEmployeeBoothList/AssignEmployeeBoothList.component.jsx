import { BoothAssignmentDetail } from '../BoothAssigmentDetail/BoothAssignmentDetail.component';
import { Button, Card, Divider, List, Skeleton, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

const { Title } = Typography;

export const AssignEmployeeBoothList = (props) => {
  const { data, onHoverIn, onHoverOut, onBoothClick, onClickUploadCSV, boothData } = props;
  return (
    <>
      <div
        style={{
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
        <Title level={5}>
          Assign employee
          <Tooltip
            placement={'bottom'}
            title={
              <>
                <p>Assign your employee to different booth slots</p>
                <p>Each booth slot must have at least 1 supervisor, 1 decorator and 2 staffs</p>
                <p>Supervisor is responsible for assigning staffs to become Interviewer and Receptionist</p>
                <p>Decorator is responsible for decorate booth</p>
              </>
            }>
            <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
          </Tooltip>
        </Title>
        <Button style={{ marginLeft: '1rem' }} type={'primary'} icon={<UploadOutlined />} onClick={onClickUploadCSV}>
          Upload CSV
        </Button>
      </div>
      <InfiniteScroll
        dataLength={data?.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more</Divider>}
        style={{ height: '65vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={data}
          renderItem={(item) => {
            const color = `${Object.values(boothData).filter((booth) => booth.id === item.id)[0]?.color}` ?? 'white';
            return (
              <Card
                hoverable={true}
                style={{
                  width: '350px',
                  border: '1px solid black',
                  borderRadius: '20px',
                  marginBottom: '10px',
                  borderLeft: `10px solid ${color}`
                }}
                bodyStyle={{ padding: '15px' }}
                onMouseEnter={() => onHoverIn(item.booth.name)}
                onMouseLeave={() => onHoverOut()}
                onClick={() => {
                  onBoothClick(item.id, item.booth.name);
                }}>
                <BoothAssignmentDetail data={item} />
              </Card>
            );
          }}
        />
      </InfiniteScroll>
    </>
  );
};
