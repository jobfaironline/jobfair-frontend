import { Tag } from 'antd';
import React from 'react';

export const JobFairDashBoardGeneralInformation = ({ data }) => {
  const {
    boothNum = 'No data',
    participationNum = 'No data',
    jobPositionNum = 'No data',
    employeeNum = 'No data'
  } = data;
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Tag color={'blue'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of booth</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{boothNum}</p>
      </Tag>
      <Tag color={'green'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of visit</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{participationNum}</p>
      </Tag>
      <Tag color={'magenta'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of job position</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{jobPositionNum}</p>
      </Tag>
      <Tag color={'purple'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of employee</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{employeeNum}</p>
      </Tag>
    </div>
  );
};
