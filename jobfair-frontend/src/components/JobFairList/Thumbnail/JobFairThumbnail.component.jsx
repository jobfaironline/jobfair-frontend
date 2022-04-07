import { Image } from 'antd';
import React from 'react';

const JobFairThumbnailComponent = (props) => {
  const { urlImage } = props;
  return (
    <>
      <Image src={urlImage} height={260} width={450} />
    </>
  );
};
export default JobFairThumbnailComponent;
