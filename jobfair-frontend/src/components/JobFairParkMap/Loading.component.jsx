import ReactLoading from 'react-loading'
import React from 'react'

export const LoadingComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ReactLoading
        type={'spin'}
        color={'#1890ff'}
        height={'100px'}
        width={'100px'}
      />
    </div>
  )
}
