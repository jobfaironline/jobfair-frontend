import { AccountProfileValidation } from '../../../validate/AttendantProfileValidation';
import { Col, Form, Input, Radio, Row } from 'antd';
import { GenderConst } from '../../../constants/AttendantConstants';
import React from 'react';

export const AccountProfile = () => (
  <>
    <Form.Item hidden={true} name={['account', 'email']} />
    <Form.Item hidden={true} name={['account', 'id']} />
    <Row gutter={10}>
      <Col span={8}>
        <Form.Item
          label='First name'
          name={['account', 'firstname']}
          hasFeedback
          rules={AccountProfileValidation.firstname}>
          <Input placeholder='First name' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Middle name'
          name={['account', 'middlename']}
          hasFeedback
          rules={AccountProfileValidation.middlename}>
          <Input placeholder='Middle name' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          label='Last name'
          name={['account', 'lastname']}
          hasFeedback
          rules={AccountProfileValidation.lastname}>
          <Input placeholder='Last name' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <Form.Item label='Phone number' name={['account', 'phone']} hasFeedback rules={AccountProfileValidation.phone}>
          <Input placeholder='Phone' style={{ width: '100%' }} />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item label='Gender' name={['account', 'gender']}>
          <Radio.Group>
            {GenderConst.map((item) => (
              <Radio.Button value={item.enumName}>{item.name}</Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </Col>
    </Row>
  </>
);
