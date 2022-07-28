import { EyeFilled, HomeFilled, IdcardFilled, ReconciliationFilled } from '@ant-design/icons';
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
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <HomeFilled style={{ fontSize: '45px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of booths</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{boothNum}</p>
          </div>
        </div>
      </Tag>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <EyeFilled style={{ fontSize: '45px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of visitors</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>
              {participationNum}
            </p>
          </div>
        </div>
      </Tag>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <ReconciliationFilled
            style={{ fontSize: '45px', marginRight: '15px', display: 'flex', alignItems: 'center' }}
          />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of job positions</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{jobPositionNum}</p>
          </div>
        </div>
      </Tag>
      <Tag
        color={'blue'}
        style={{
          padding: '0.8rem 1.2rem 0.8rem',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          alignItems: 'center'
        }}>
        <div style={{ display: 'flex' }}>
          <IdcardFilled style={{ fontSize: '45px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of employees</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{employeeNum}</p>
          </div>
        </div>
      </Tag>
    </div>
  );
};
