import React from 'react';
import ReactLoading from 'react-loading';

export const LoadingComponent = () => (
  <div
    style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <ReactLoading type={'spin'} color={'#1890ff'} height={'100px'} width={'100px'} />
  </div>
);
