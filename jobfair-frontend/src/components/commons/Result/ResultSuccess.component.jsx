import { Button, Result } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import React from 'react';

const ResultSuccessComponent = () => {
  const history = useHistory();

  return (
    <>
      <Result
        status='success'
        title='Your submission was successfully'
        subTitle='Please wait until admin evaluate your form. Thank you 😊'
        extra={[
          <Button type='primary' key='console' onClick={() => history.push(PATH.INDEX)}>
            Back to home page
          </Button>
        ]}
      />
      ,
    </>
  );
};

export default ResultSuccessComponent;
