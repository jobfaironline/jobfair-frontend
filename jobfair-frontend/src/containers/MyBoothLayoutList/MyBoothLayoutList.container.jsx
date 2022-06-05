import { Card, Modal } from 'antd';
import React from 'react';

const fakeData = [
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  },
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  },
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  },
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  },
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  },
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  },
  {
    name: 'Booth tuyển nhân viên',
    imgUrl: '/my-layout-tmp.png'
  }
];

const { Meta } = Card;

const MyBoothLayoutListContainer = ({ myLayoutVisibility, setMyLayoutVisibility }) => {
  const handleOk = () => {
    setMyLayoutVisibility(false);
  };

  const handleCancel = () => {
    setMyLayoutVisibility(false);
  };

  return (
    <Modal visible={myLayoutVisibility} title='Title' onOk={handleOk} onCancel={handleCancel} width='100vw'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {fakeData.map((layout) => {
          return (
            <Card
              hoverable
              style={{
                width: 240,
                marginBottom: '2rem'
              }}
              cover={<img alt='example' src={layout?.imgUrl} />}>
              <Meta title={layout.name} />
            </Card>
          );
        })}
      </div>
    </Modal>
  );
};

export default MyBoothLayoutListContainer;
