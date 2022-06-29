import { AssignmentConst } from '../../../constants/AssignmentConst';
import { Badge, Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import React from 'react';

export const AssignTaskFilterPanel = (props) => {
  const { onFilter, onReset } = props;
  return (
    <div style={{ padding: '0 1rem 0 0', marginRight: '2rem' }}>
      <Form
        onFinish={onFilter}
        onReset={() => {
          onReset();
        }}
        initialValues={{
          searchValue: '',
          filter: []
        }}
        style={{ display: 'flex' }}>
        <Form.Item
          name={'searchValue'}
          label={
            <Typography.Title level={5} style={{ margin: 0 }}>
              Name
            </Typography.Title>
          }>
          <Input placeholder={"Employee's name"} style={{ width: '20rem' }} />
        </Form.Item>
        <Form.Item
          style={{ marginLeft: '1rem' }}
          name={'filter'}
          label={
            <Typography.Title level={5} style={{ margin: 0 }}>
              Role
            </Typography.Title>
          }>
          <Checkbox.Group style={{ display: 'flex' }}>
            <Checkbox value={AssignmentConst.RECEPTION}>
              <Badge color={'#02fd02'} text={'RECEPTION'} />
            </Checkbox>
            <Checkbox value={AssignmentConst.INTERVIEWER}>
              <Badge color={'#dfdf149e'} text={'INTERVIEWER'} />
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Divider type={'vertical'} />
        <div style={{ display: 'flex' }}>
          <Button style={{ marginLeft: 'auto', marginRight: '1rem' }} htmlType={'reset'}>
            Reset
          </Button>
          <Button type={'primary'} htmlType={'submit'}>
            Filter
          </Button>
        </div>
      </Form>
    </div>
  );
};
