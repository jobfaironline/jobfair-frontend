import { AttendantProfileValidation } from '../../../../../validate/AttendantProfileValidation';
import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from 'antd';
import { DeleteOutlined, ShrinkOutlined } from '@ant-design/icons';
import { EditableList } from '../../../../commons/EditableList/EditableList.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthFormat } from '../../../../../constants/ApplicationConst';
import { faPen, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Title } = Typography;

const EditableCertificationComponent = (props) => {
  const { key, restField, name, remove, collapse } = props;
  return (
    <Card>
      <div style={{ display: 'flex' }}>
        <ShrinkOutlined style={{ marginLeft: 'auto' }} onClick={collapse} />
      </div>
      <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
        <Row>
          <Col span={24}>
            <Form.Item
              {...restField}
              label='Name'
              name={[name, 'name']}
              rules={AttendantProfileValidation.certifications.name}
              style={{ width: '100%' }}>
              <Input placeholder='Name' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={15}>
            <Form.Item
              {...restField}
              name={[name, 'institution']}
              label='Institution'
              rules={AttendantProfileValidation.certifications.institution}>
              <Input placeholder='Institution' />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item
              {...restField}
              name={[name, 'issueDate']}
              label='Issue date'
              rules={AttendantProfileValidation.certifications.issueDate}>
              <DatePicker picker='month' format={MonthFormat} placeholder='Year' style={{ textAlign: 'right' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              {...restField}
              name={[name, 'certificationLink']}
              label='Certification link'
              rules={AttendantProfileValidation.certifications.certificationLink}>
              <Input placeholder='Certification link' />
            </Form.Item>
          </Col>
        </Row>

        <div style={{ display: 'flex' }}>
          <Button style={{ marginLeft: 'auto' }} type={'primary'} icon={<DeleteOutlined />} onClick={remove}>
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};

const CertificationComponent = ({ data, onClick }) => {
  const { id, name, institution, certificationLink, issueDate } = data;
  return (
    <Card
      hoverable={true}
      className={'certification'}
      onClick={() => {
        onClick(id);
      }}>
      <div style={{ position: 'absolute', left: '95%' }}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <div className={'container'}>
        <Title level={3} style={{ margin: 0 }}>
          {name}
        </Title>
        <Title level={5} style={{ margin: 0 }}>
          Institution: {institution}
        </Title>
        <Title level={5} style={{ margin: 0 }}>
          Issue date: {issueDate.format(MonthFormat)}
        </Title>
        <div>
          <a
            onClick={(e) => {
              e.stopPropagation();
              window.open(certificationLink);
            }}>
            Certification Link <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faUpRightFromSquare} />
          </a>
        </div>
      </div>
    </Card>
  );
};

export const CertificationList = ({ form, id }) => (
  <Card className={'list'} id={id}>
    <Title level={4}>Certification</Title>
    <EditableList
      form={form}
      buttonText={'Add new certification'}
      formItemName={'certifications'}
      ReadComponent={CertificationComponent}
      UpdateComponent={EditableCertificationComponent}
    />
  </Card>
);
