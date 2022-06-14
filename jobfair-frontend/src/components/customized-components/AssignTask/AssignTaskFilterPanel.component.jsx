import { AssignmentConst } from '../../../constants/AssignmentConst';
import { Badge, Button, Checkbox, Form, Input, Typography } from 'antd';
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
        }}>
        <Typography.Title level={4}>Filter</Typography.Title>
        <Typography.Title level={5}>Name</Typography.Title>
        <Form.Item name={'searchValue'}>
          <Input placeholder={"Employee's name"} />
        </Form.Item>
        <Typography.Title level={5}>Role</Typography.Title>
        <Form.Item name={'filter'}>
          <Checkbox.Group>
            <Checkbox value={AssignmentConst.RECEPTION}>
              <Badge color={'#02fd02'} text={'RECEPTION'} />
            </Checkbox>
            <br />
            <Checkbox value={AssignmentConst.INTERVIEWER}>
              <Badge color={'#dfdf149e'} text={'INTERVIEWER'} />
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <div style={{ marginTop: '1rem', display: 'flex' }}>
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
