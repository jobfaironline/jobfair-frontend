import './OrganizeJobFairForm.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button, DatePicker, Divider, Form, Input, Typography } from 'antd';
import { HourMinuteDateFormat } from '../../../constants/ApplicationConst';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

import SideBarComponent from '../../commons/SideBar/SideBar.component';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const OrganizeJobFairFormComponent = ({ form, onHandleNext, onHandlePrev, onFinish }) => {
  const [isError, setIsError] = useState(false);
  return (
    <div className={'organize-job-fair-form'}>
      <SideBarComponent>
        <a className={'prev-button'} type='primary' onClick={onHandlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
          <span>Back to choose job fair layout</span>
        </a>
        <Divider size='small' plain>
          <Title>Schedule job fair event</Title>
        </Divider>
        <div className={'form-container'}>
          <Form
            form={form}
            requiredMark='required'
            autoComplete='off'
            onFinish={onFinish}
            // onFieldsChange={() => {
            //   form.validateFields();
            //   // form.validateFields().catch((errInfo) => {});
            //   const isFormValid = form.getFieldsError().every((fieldErr) => fieldErr.errors.length === 0);
            //   form.getFieldsError().forEach((fieldErr) => {
            //     console.log(fieldErr);
            //   });
            //   console.log(isFormValid);
            //   setIsError(!isFormValid);
            // }}
            scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
            style={{ height: '20rem', width: '25rem' }}>
            <Form.Item
              label='Name'
              name={'name'}
              rules={OrganizeJobFairValidation.name}
              style={{
                display: 'inline-block',
                width: '100%',
                marginRight: '1rem',
                marginLeft: '1rem'
              }}>
              <Input placeholder='Job fair name' />
            </Form.Item>
            <Form.Item
              label='Decoration booth time range'
              name={'decorateRange'}
              rules={OrganizeJobFairValidation.decorateRange}
              style={{
                display: 'inline-block',
                width: '100%',
                marginRight: '1rem',
                marginLeft: '1rem'
              }}>
              <RangePicker format={HourMinuteDateFormat} showTime />
            </Form.Item>
            <Form.Item
              label='Public time range'
              name={'publicRange'}
              rules={OrganizeJobFairValidation.publicRange}
              style={{
                display: 'inline-block',
                width: '25rem',
                marginRight: '1rem',
                marginLeft: '1rem'
              }}>
              <RangePicker format={HourMinuteDateFormat} showTime />
            </Form.Item>
          </Form>
        </div>
        <div className={'button-container'}>
          <Button
            className={'confirm-button'}
            type='primary'
            onClick={() => {
              onHandleNext();
            }}>
            Start assign employee
          </Button>
        </div>
      </SideBarComponent>
    </div>
  );
};

export default OrganizeJobFairFormComponent;
