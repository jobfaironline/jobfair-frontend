import { Card, Divider, List, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

const { Title } = Typography;

export const AssignEmployeeBoothList = (props) => {
  const { data, onHoverIn, onHoverOut, onClick } = props;
  return (
    <>
      <Divider size='small' plain>
        <Title>Assign employee</Title>
      </Divider>
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
              style={{ width: 300, margin: '10px' }}
              onMouseEnter={() => onHoverIn(item.booth.name)}
              onMouseLeave={() => onHoverOut()}
              onClick={() => {
                onClick(item.id, item.booth.name);
              }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <Card.Meta title={item.booth.name} />
                </div>
              </div>
            </Card>
          )}
        />
      </InfiniteScroll>
    </>
  );
};
