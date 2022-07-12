import { AccountProfile } from '../AccountProfile.component';
import { AttendantProfileValidation } from '../../../../validate/AttendantProfileValidation';
import { Card, Col, DatePicker, Form, Input, Radio, Row, Select } from 'antd';
import { CountryConst, JobLevelConst, MaritalConst, ResidenceConst } from '../../../../constants/AttendantConstants';
import { DateFormat } from '../../../../constants/ApplicationConst';
import { convertToDateValue } from '../../../../utils/common';
import React from 'react';

const { Option } = Select;

export const AttendantProfile = ({ form, id }) => (
  <Card className={'list anchor'} id={id}>
    <AccountProfile />
    <Row gutter={10}>
      <Col span={8}>
        <Form.Item label='Date of birth' name='dob' hasFeedback rules={AttendantProfileValidation.account.dob}>
          <DatePicker format={DateFormat} onChange={(date, dateString) => convertToDateValue(dateString)} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Title' name='title' hasFeedback rules={AttendantProfileValidation.title}>
          <Select>
            <Option value={'Mr'}>{'Mr'}</Option>
            <Option value={'Miss'}>{'Miss'}</Option>
            <Option value={'Mrs'}>{'Mrs'}</Option>
            <Option value={'Other'}>{'Other'}</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label='Marital status' name='maritalStatus'>
          <Radio.Group>
            {MaritalConst.map((item) => (
              <Radio.Button value={item.value}>{item.label}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={6}>
        <Form.Item
          label='Country'
          name='countryId'
          hasFeedback
          shouldUpdate
          rules={AttendantProfileValidation.account.countryId}>
          <Select
            showSearch
            placeholder='Search to Select'
            onChange={(value) => {
              if (value === 60) {
                form.setFieldsValue({
                  countryId: value,
                  residenceId: 12
                });
              } else {
                form.setFieldsValue({
                  countryId: value,
                  residenceId: 62
                });
              }
            }}
            optionFilterProp='children'
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }>
            {CountryConst.map((item) => (
              <Option value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item shouldUpdate style={{ margin: 0 }}>
          {() => (
            <Form.Item label='Province' name='residenceId'>
              <Select
                showSearch
                disabled={form.getFieldValue('countryId') !== 60}
                placeholder='Search to Select'
                optionFilterProp='children'
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }>
                {ResidenceConst.map((item) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label='Address' name='address' hasFeedback rules={AttendantProfileValidation.address}>
          <Input placeholder='Address' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={10}>
        <Form.Item label='Job title' name='jobTitle' hasFeedback rules={AttendantProfileValidation.jobTitle}>
          <Input placeholder='Job title' style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col span={9}>
        <Form.Item label='Job level' name='jobLevel'>
          <Select
            showSearch
            placeholder='Search to Select'
            optionFilterProp='children'
            style={{ width: '100%' }}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) =>
              optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }>
            {JobLevelConst.map((item) => (
              <Option value={item.name}>{item.description}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label='Year of experience' name='yearOfExp' hasFeedback rules={AttendantProfileValidation.yearOfExp}>
          <Input placeholder='Year of exp' style={{ width: '100%' }} type='number' min='0' />
        </Form.Item>
      </Col>
    </Row>
  </Card>
);
