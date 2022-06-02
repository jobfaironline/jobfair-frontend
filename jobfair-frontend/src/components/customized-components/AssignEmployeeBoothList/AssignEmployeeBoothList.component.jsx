import { AssignmentConst } from '../../../constants/AssignmentConst';
import { Card, Divider, List, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

const { Title, Text } = Typography;

export const AssignEmployeeBoothList = (props) => {
  const { data, onHoverIn, onHoverOut, onClick } = props;
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Title level={5}>Assign employee</Title>
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
          renderItem={(item) => (
            <Card
              hoverable={true}
              style={{ width: '350px', border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}
              bodyStyle={{ padding: '15px' }}
              onMouseEnter={() => onHoverIn(item.booth.name)}
              onMouseLeave={() => onHoverOut()}
              onClick={() => {
                onClick(item.id, item.booth.name);
              }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <Title level={5}>{item.booth.name}</Title>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Text>Supervisor: </Text>
                  {item.assignments
                    .filter((assign) => assign.type === AssignmentConst.SUPERVISOR)
                    .map((assign) => (
                      <Text>
                        {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
                        {assign.companyEmployee.account.lastname}
                      </Text>
                    ))}
                  <Text>Staff:</Text>
                  {item.assignments
                    .filter((assign) => assign.type === AssignmentConst.STAFF)
                    .map((assign) => (
                      <Text>
                        {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
                        {assign.companyEmployee.account.lastname}
                      </Text>
                    ))}
                  <Text>Decorator: </Text>
                  {item.assignments
                    .filter((assign) => assign.type === AssignmentConst.DECORATOR)
                    .map((assign) => (
                      <Text>
                        {assign.companyEmployee.account.firstname} {assign.companyEmployee.account.middlename}{' '}
                        {assign.companyEmployee.account.lastname}
                      </Text>
                    ))}
                </div>
              </div>
            </Card>
          )}
        />
      </InfiniteScroll>
    </>
  );
};
