import { Card, Divider, List, Skeleton, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

const { Title, Text } = Typography;

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
              style={{ width: '400px', border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}
              bodyStyle={{ padding: '15px' }}
              onMouseEnter={() => onHoverIn(item.booth.name)}
              onMouseLeave={() => onHoverOut()}
              onClick={() => {
                onClick(item.id, item.booth.name);
              }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                  <Text style={{ marginRight: '10px' }}>{`Booth name:`}</Text>
                  <Card.Meta title={item.booth.name} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text style={{ marginRight: '10px' }}>{`Has assigned employee: `}</Text>
                  {item.assignments.length > 0 ? (
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} />
                  ) : (
                    <FontAwesomeIcon icon={faXmarkCircle} style={{ color: 'red' }} />
                  )}
                </div>
              </div>
            </Card>
          )}
        />
      </InfiniteScroll>
    </>
  );
};
