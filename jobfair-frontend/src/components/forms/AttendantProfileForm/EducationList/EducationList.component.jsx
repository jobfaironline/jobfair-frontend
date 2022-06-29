import './EducationList.style.scss';
import { ArrowRightOutlined, DeleteOutlined, ShrinkOutlined } from '@ant-design/icons';
import { AttendantProfileValidation } from '../../../../validate/AttendantProfileValidation';
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import { EditableList } from '../../../commons/EditableList/EditableList.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthFormat } from '../../../../constants/ApplicationConst';
import { QualificationConst } from '../../../../constants/AttendantConstants';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const EditableEducationComponent = (props) => {
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
              name={[name, 'school']}
              label='School'
              rules={AttendantProfileValidation.educations.school}>
              <Input placeholder='School' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...restField} name={[name, 'qualification']} label='Qualification'>
              <Select
                showSearch
                placeholder='Search to Select'
                optionFilterProp='children'
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                filterSort={(optionA, optionB) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }>
                {QualificationConst.map((item) => (
                  <Option value={item.enumName}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              {...restField}
              name={[name, 'subject']}
              label='Subject'
              style={{ width: '100%' }}
              rules={AttendantProfileValidation.educations.subject}>
              <Input placeholder='Subject' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label='Date range'
              {...restField}
              name={[name, 'range']}
              rules={AttendantProfileValidation.educations.range}>
              <RangePicker picker='month' format={MonthFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              {...restField}
              name={[name, 'achievement']}
              label='Achievement'
              rules={AttendantProfileValidation.educations.achievement}>
              <TextArea placeholder='Achievement' maxLength={5000} autoSize={{ minRows: 5, maxRows: 5 }} />
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

const EducationComponent = ({ data, onClick }) => {
  const { id, school, subject, achievement, range, qualification } = data;
  const fromDate = range?.[0];
  const toDate = range?.[1];
  return (
    <Card
      hoverable={true}
      className={'education'}
      onClick={() => {
        onClick(id);
      }}>
      <div style={{ position: 'absolute', left: '95%' }}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <div className={'container'}>
        <div className={'month'}>
          <div>{toDate?.diff(fromDate, 'months')}</div>
          <div>Months</div>
        </div>
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {subject}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {school} - {qualification}
          </Title>
          <div>
            {fromDate?.format(MonthFormat)} <ArrowRightOutlined /> {toDate?.format(MonthFormat)}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Text strong>Achievement:</Text>
        <Paragraph>{achievement}</Paragraph>
      </div>
    </Card>
  );
};

export const EducationList = ({ form, id }) => (
  <Card className={'list'} id={id}>
    <Title level={4}>Education</Title>
    <EditableList
      form={form}
      buttonText={'Add new education'}
      formItemName={'educations'}
      ReadComponent={EducationComponent}
      UpdateComponent={EditableEducationComponent}
    />
  </Card>
);
