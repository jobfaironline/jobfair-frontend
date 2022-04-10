import React from 'react';

const AboutApplicationPage = () => (
  <div className='page'>
    <div className='about-application'>
      <h2>{`The version of this app: ${process.env.REACT_APP_VERSION}`}</h2>
    </div>
  </div>
);
export default AboutApplicationPage;
