import { AttendantProfileValidation } from '../../../../../validate/AttendantProfileValidation';
import { Button, Card, Col, Form, Input, Rate, Row, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

const { Title } = Typography;

export const SkillList = ({ id }) => (
  <Card className={'list'} id={id}>
    <Title level={4}>Skills</Title>
    <Form.List name='skills' label='Skills'>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'row' }}>
              <Row gutter={10} style={{ flex: 1 }}>
                <Col span={18}>
                  <Form.Item
                    {...restField}
                    label='Name'
                    name={[name, 'name']}
                    hasFeedback
                    rules={AttendantProfileValidation.skills.name}>
                    <Input placeholder='Name' />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item {...restField} name={[name, 'proficiency']} label='Proficiency' initialValue={1}>
                    <Rate />
                  </Form.Item>
                </Col>
              </Row>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </div>
          ))}
          <Form.Item>
            <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
              Add new skill
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </Card>
);
