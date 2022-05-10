import { Card, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';

//TODO: remove later because do not have template thumbnail
const fakeThumbnail =
  'https://p7.hiclipart.com/preview/467/727/791/google-maps-road-map-icon-paper-maps-and-map-pointer-thumbnail.jpg';
const SelectJobFairTemplateComponent = (props) => {
  const { listData, handleLoad3DMap } = props;

  return (
    <>
      <InfiniteScroll
        dataLength={listData?.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        style={{ height: '60vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={listData}
          renderItem={(item) => (
            <Card
              hoverable={true}
              style={{ width: '25rem', margin: '10px' }}
              cover={<img src={item.thumbnailUrl ? item.thumbnailUrl : fakeThumbnail} alt={item.name} />}
              onClick={() => {
                handleLoad3DMap(item.url, item.id);
              }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <Card.Meta title={item.name} />
                </div>
              </div>
            </Card>
          )}
        />
      </InfiniteScroll>
      {props.children}
    </>
  );
};

export default SelectJobFairTemplateComponent;
