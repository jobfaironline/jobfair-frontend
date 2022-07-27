import { Tag } from 'antd';
import React from 'react';

export const CompanyDashBoardGeneralInformation = ({ data }) => {
  const {
    publishedJobFairNum = 'No data',
    participantNum = 'No data',
    inProgressJobFairNum = 'No data',
    pastJobFairNum = 'No data',
    upComingJobFairNum = 'No data'
  } = data;
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Tag color={'green'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of published job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{publishedJobFairNum}</p>
      </Tag>
      <Tag color={'magenta'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of visitor</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{participantNum}</p>
      </Tag>
      <Tag color={'purple'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of in progress job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{inProgressJobFairNum}</p>
      </Tag>
      <Tag color={'purple'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of past job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{pastJobFairNum}</p>
      </Tag>
      <Tag color={'purple'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of up coming job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{upComingJobFairNum}</p>
      </Tag>
    </div>
  );
};
