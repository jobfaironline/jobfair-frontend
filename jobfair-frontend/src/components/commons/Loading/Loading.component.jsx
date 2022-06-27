import { PRIMARY_COLOR } from '../../../styles/custom-theme';
import React from 'react';
import ReactLoading from 'react-loading';

export const LoadingComponent = ({ isWholePage = false }) => (
  <div
    style={{
      display: 'flex',
      width: isWholePage ? '100vw' : '100%',
      height: isWholePage ? '100vh' : '100%',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <ReactLoading type={'spin'} color={PRIMARY_COLOR} height={'100px'} width={'100px'} />
  </div>
);
