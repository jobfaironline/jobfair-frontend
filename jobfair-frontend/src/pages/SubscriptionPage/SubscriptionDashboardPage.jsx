import { Typography } from 'antd';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';
import SubscriptionListContainer from '../../containers/Subscription/SubscriptionList.container';

const { Title } = Typography;

const SubscriptionDashboardPage = () => (
  <PageLayoutWrapper className={'page fullscreen-page non-sub-nav-bar'}>
    <div
      style={{
        backgroundColor: 'rgb(229, 234, 251)',
        padding: '5% 10% 3% 10%',
        boxSizing: 'border-box',
        width: '100%'
        // backgroundImage: `url(${window.location.origin}/icon/why-go-premium.png)`
      }}>
      {/*<div style={{ backdropFilter: 'blur(10px)', color: 'white' }}>*/}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
        <Title level={1}>Why go premium?</Title>
      </div>
      <div>
        <ul style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between', listStyle: 'none' }}>
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div>
              <img
                src={`${window.location.origin}/icon/save-money.png`}
                alt={'Save-money'}
                style={{ width: '200px', height: '200px' }}
              />
            </div>
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Cost saving</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', width: '20rem' }}>
                Package cost is only 1/10 of actual organization cost
              </p>
            </div>
          </li>
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img
              src={`${window.location.origin}/icon/back-in-time.png`}
              alt={'Save-time'}
              style={{ width: '200px', height: '200px' }}
            />
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Time saving</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>Save time organizing and attending job fair</p>
            </div>
          </li>
          <li style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img
              src={`${window.location.origin}/icon/recycle.png`}
              alt={'Recycle'}
              style={{ width: '200px', height: '200px', marginTop: '2rem' }}
            />
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Reusable resources</p>
              <p style={{ fontSize: '1rem', fontWeight: 'bold', width: '20rem' }}>
                Reduce paper and ink consumption in order to minimize Greenhouse effect and pollution
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    {/*</div>*/}
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#EFEFEF', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '5rem' }}>
        <Title level={3}>Pick your favorite pack</Title>
        <div>
          <Title level={5}>Explore all the features of JobHub with just 1 purchase!</Title>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          Available payment method:{' '}
          <img style={{ width: '5%' }} src={`${window.location.origin}/icon/Visa_Inc._logo.svg`} />
        </div>
      </div>
      <SubscriptionListContainer />
    </div>
  </PageLayoutWrapper>
);
export default SubscriptionDashboardPage;
