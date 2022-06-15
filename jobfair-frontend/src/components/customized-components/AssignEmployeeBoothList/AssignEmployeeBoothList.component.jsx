import { AssignmentConst } from '../../../constants/AssignmentConst';
import { Button, Card, Divider, List, Skeleton, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

const { Title, Text } = Typography;

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
        <Title level={5}>Assign employee</Title>
        <Button style={{ marginLeft: '1rem' }} type={'primary'} icon={<UploadOutlined />} onClick={onClickUploadCSV}>
          Upload CSV
        </Button>
      </div>
      <InfiniteScroll
        dataLength={data?.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        style={{ height: '65vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={data}
          renderItem={(item) => {
            const color = `${Object.values(boothData).filter((booth) => booth.id === item.id)[0]?.color}50` ?? 'white';
            return (
              <Card
                hoverable={true}
                style={{
                  width: '350px',
                  border: '1px solid black',
                  borderRadius: '20px',
                  marginBottom: '10px',
                  backgroundColor: color
                }}
                bodyStyle={{ padding: '15px' }}
                onMouseEnter={() => onHoverIn(item.booth.name)}
                onMouseLeave={() => onHoverOut()}
                onClick={() => {
                  onBoothClick(item.id, item.booth.name);
                }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Title level={5}>
                      {`Slot name: ${item.booth.name}`}
                      <br />
                      {item.name ? `Booth name - ${item.name}` : ''}
                    </Title>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong>Supervisor: </Text>
                    {item.assignments
                      .filter((assign) => assign.type === AssignmentConst.SUPERVISOR)
                      .map((assign) => (
                        <Text>
                          {'- '}
                          {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
                          {assign.companyEmployee.account.lastname}
                        </Text>
                      ))}
                    <Text strong>Staff:</Text>
                    {item.assignments
                      .filter((assign) => assign.type === AssignmentConst.STAFF)
                      .map((assign) => (
                        <Text>
                          {'- '}
                          {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
                          {assign.companyEmployee.account.lastname}
                        </Text>
                      ))}
                    <Text strong>Decorator: </Text>
                    {item.assignments
                      .filter((assign) => assign.type === AssignmentConst.DECORATOR)
                      .map((assign) => (
                        <Text>
                          {'- '}
                          {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
                          {assign.companyEmployee.account.lastname}
                        </Text>
                      ))}
                  </div>
                </div>
              </Card>
            );
          }}
        />
      </InfiniteScroll>
    </>
  );
};
