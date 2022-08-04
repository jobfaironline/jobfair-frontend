import { Tag } from 'antd';
import React from 'react';

export const AdminDashBoardAccountStatistics = ({ data }) => {
  const { attendantNum = 'No data', companyNum = 'No data', accountNum = 'No data' } = data;
  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      <Tag color={'blue'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of accounts</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{accountNum}</p>
      </Tag>
      <Tag color={'blue'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of visitors</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{attendantNum}</p>
      </Tag>
      <Tag color={'blue'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of companies</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{companyNum}</p>
      </Tag>
    </div>
  );
};
