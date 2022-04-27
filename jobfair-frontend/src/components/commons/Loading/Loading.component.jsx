import React from 'react';
import ReactLoading from 'react-loading';

export const LoadingComponent = () => (
  <div
    style={{
      display: 'flex',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <ReactLoading type={'spin'} color={'#1890ff'} height={'100px'} width={'100px'} />
  </div>
);
