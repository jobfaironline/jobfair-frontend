import ConfirmComponent from '../../components/Confirm/Confirm.component';
import React from 'react';

const ConfirmContainer = (props) => {
  const { data, companyInfo } = props;
  return (
    <>
      <ConfirmComponent data={data} companyInfo={companyInfo} />
    </>
  );
};

export default ConfirmContainer;
