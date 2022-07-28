import { ClockCircleFilled, EyeFilled, FundFilled, HourglassFilled } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

export const CompanyDashBoardGeneralInformation = ({ data }) => {
  const {
    participantNum = 'No data',
    inProgressJobFairNum = 'No data',
    pastJobFairNum = 'No data',
    upComingJobFairNum = 'No data'
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
          <EyeFilled style={{ fontSize: '40px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of visitors</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{participantNum}</p>
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
          <HourglassFilled style={{ fontSize: '40px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of past job fairs</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>{pastJobFairNum}</p>
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
          <FundFilled style={{ fontSize: '40px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of in progress job fairs</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>
              {inProgressJobFairNum}
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
          <ClockCircleFilled style={{ fontSize: '40px', marginRight: '15px', display: 'flex', alignItems: 'center' }} />
          <div>
            <p style={{ marginBottom: 0, fontSize: '1.3rem', fontWeight: '600' }}>Number of up coming job fairs</p>
            <p style={{ marginBottom: 0, fontSize: '2rem', fontWeight: '600', lineHeight: '2rem' }}>
              {upComingJobFairNum}
            </p>
          </div>
        </div>
      </Tag>
    </div>
  );
};
