import { Divider, List, Skeleton } from "antd";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//TODO: remove later because do not have template thumbnail
const fakeThumbnail =
  'https://p7.hiclipart.com/preview/467/727/791/google-maps-road-map-icon-paper-maps-and-map-pointer-thumbnail.jpg';
const SelectJobFairTemplateComponent = (props) => {
  const { listData, handleLoad3DMap } = props;

  console.log(listData);
  return (
    <>
      <InfiniteScroll
        dataLength={listData?.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget='scrollableDiv'
        style={{ height: '30rem' }}>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={listData}
          renderItem={(item) => (
            <div
              onClick={(e) => {
                handleLoad3DMap(item.url);
              }}>
              <List.Item key={item.id} extra={<img width={272} alt='logo' src={fakeThumbnail} />}>
                <List.Item.Meta title={item.name} description={item.description} />
              </List.Item>
            </div>
          )}
        />
      </InfiniteScroll>
      {props.children}
    </>
  );
};

export default SelectJobFairTemplateComponent;
