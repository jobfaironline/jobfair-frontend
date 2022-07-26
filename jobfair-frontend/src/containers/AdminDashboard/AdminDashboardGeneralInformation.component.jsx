import { Tag } from 'antd';
import React from 'react';

export const AdminDashBoardGeneralInformation = ({ data }) => {
  const { companyNum = 'No data', userNum = 'No data' } = data;
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Tag color={'blue'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of companies</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{companyNum}</p>
      </Tag>
      <Tag color={'green'} style={{ padding: '0.8rem 1rem 1.5rem 1rem', borderRadius: '10px', flex: 1 }}>
        <p style={{ marginBottom: 10, fontSize: '1.3rem' }}>Number of users</p>
        <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600' }}>{userNum}</p>
      </Tag>
    </div>
  );
};
