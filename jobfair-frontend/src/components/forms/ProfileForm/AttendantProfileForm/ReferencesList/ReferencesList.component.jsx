import { AttendantProfileValidation } from '../../../../../validate/AttendantProfileValidation';
import { Button, Card, Col, Form, Input, Row, Typography } from 'antd';
import { DeleteOutlined, ShrinkOutlined } from '@ant-design/icons';
import { EditableList } from '../../../../commons/EditableList/EditableList.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Title, Text } = Typography;

const EditableReferenceComponent = (props) => {
  const { key, restField, name, remove, collapse } = props;
  return (
    <Card>
      <div style={{ display: 'flex' }}>
        <ShrinkOutlined style={{ marginLeft: 'auto' }} onClick={collapse} />
      </div>
      <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'fullname']}
              label='Full name'
              rules={AttendantProfileValidation.references.fullname}>
              <Input placeholder='Full name' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'company']}
              label='Company'
              rules={AttendantProfileValidation.references.company}>
              <Input placeholder='name' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              {...restField}
              name={[name, 'email']}
              label='Email'
              rules={AttendantProfileValidation.references.email}>
              <Input placeholder='Email' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'position']}
              label='Position'
              rules={AttendantProfileValidation.references.position}>
              <Input placeholder='Position' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'phone']}
              label='Phone'
              rules={AttendantProfileValidation.references.phone}>
              <Input placeholder='Phone' />
            </Form.Item>
          </Col>
        </Row>

        <Button style={{ marginLeft: 'auto' }} type={'primary'} icon={<DeleteOutlined />} onClick={remove}>
          Remove
        </Button>
      </div>
    </Card>
  );
};

const ReferenceComponent = ({ data, onClick }) => {
  const { id, fullname, company, phone, position, email } = data;
  return (
    <Card
      hoverable={true}
      className={'reference'}
      onClick={() => {
        onClick(id);
      }}>
      <div style={{ position: 'absolute', left: '95%' }}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <div className={'container'}>
        <Title level={3} style={{ margin: '0 0 5px 0' }}>
          {fullname}
        </Title>
        <Title level={5} style={{ margin: '0 0 3px' }}>
          Position: {position}
        </Title>
        <Title level={5} style={{ margin: '0 0 3px' }}>
          Company: {company}
        </Title>
        <Text>
          {email} - {phone}
        </Text>
      </div>
    </Card>
  );
};

export const ReferenceList = ({ form, id }) => (
  <Card className={'list'} id={id}>
    <Title level={4}>References</Title>
    <EditableList
      form={form}
      buttonText={'Add new reference'}
      formItemName={'references'}
      ReadComponent={ReferenceComponent}
      UpdateComponent={EditableReferenceComponent}
    />
  </Card>
);
