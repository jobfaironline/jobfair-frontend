import './RegisterPage.styles.scss';
import NewAccountRegisterFormComponent from '../../components/forms/NewAccountRegisterForm/NewAccountRegisterForm.component';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const RegisterPage = () => (
  <PageLayoutWrapper className='page register-page  fullscreen-page non-sub-nav-bar'>
    <div style={{ display: 'flex' }}>
      <div className='leftside-container'>
        <div className='register-container'>
          <NewAccountRegisterFormComponent />
        </div>
      </div>
      <div className='rightside-container'>
        <img src='https://images.unsplash.com/photo-1559437380-d5af8338577f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'></img>
      </div>
    </div>
  </PageLayoutWrapper>
);

export default RegisterPage;
