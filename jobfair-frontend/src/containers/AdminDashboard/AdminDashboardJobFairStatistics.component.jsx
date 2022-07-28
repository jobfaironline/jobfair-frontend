import { Tag } from 'antd';
import React from 'react';

export const AdminDashBoardJobFairStatistics = ({ data }) => {
  const { pastNum = 'No data', inProgressNum = 'No data', incomingNum = 'No data' } = data;
  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      <Tag color={'blue'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of past job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{pastNum}</p>
      </Tag>
      <Tag color={'green'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of in progress job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{inProgressNum}</p>
      </Tag>
      <Tag color={'green'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of incoming job fair</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{incomingNum}</p>
      </Tag>
    </div>
  );
};
