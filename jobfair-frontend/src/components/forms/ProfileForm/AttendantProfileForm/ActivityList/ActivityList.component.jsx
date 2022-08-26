import './ActivityList.styles.scss';
import { ArrowRightOutlined, DeleteOutlined, ShrinkOutlined } from '@ant-design/icons';
import { AttendantProfileValidation } from '../../../../../validate/AttendantProfileValidation';
import { Button, Card, Col, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';
import { EditableList } from '../../../../commons/EditableList/EditableList.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MonthFormat } from '../../../../../constants/ApplicationConst';
import { YesNoConst } from '../../../../../constants/AttendantConstants';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const EditableActivityComponent = (props) => {
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
              name={[name, 'name']}
              label='Name'
              rules={AttendantProfileValidation.activities.name}>
              <Input placeholder='Name' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'functionTitle']}
              label='Function title'
              rules={AttendantProfileValidation.activities.functionTitle}>
              <Input placeholder='Function title' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...restField}
              name={[name, 'organization']}
              label='Organization'
              rules={AttendantProfileValidation.activities.organization}>
              <Input placeholder='Organization' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={15}>
            <Form.Item
              label='Date range'
              {...restField}
              name={[name, 'range']}
              rules={AttendantProfileValidation.workHistories.range}>
              <RangePicker picker={'month'} format={MonthFormat} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item {...restField} name={[name, 'isCurrentActivity']} label='Current activity' initialValue={true}>
              <Radio.Group>
                {YesNoConst.map((item) => (
                  <Radio.Button value={item.value}>{item.label}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              {...restField}
              name={[name, 'description']}
              label='Description'
              rules={AttendantProfileValidation.activities.description}
              style={{ width: '100%' }}>
              <TextArea placeholder='description' maxLength={5000} autoSize={{ minRows: 5, maxRows: 5 }} />
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

const ActivityComponent = ({ data, onClick }) => {
  const { id, description, functionTitle, isCurrentActivity, range, name, organization } = data;
  const fromDate = range?.[0];
  const toDate = range?.[1];

  return (
    <Card
      hoverable={true}
      className={'activity'}
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
            {name}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {functionTitle} - {organization}
          </Title>
          <div>
            {fromDate?.format(MonthFormat)} <ArrowRightOutlined />{' '}
            {isCurrentActivity ? 'Present' : toDate?.format(MonthFormat)}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1rem' }}>
        <Text strong>Descriptions</Text>
        <Paragraph style={{ whiteSpace: 'pre-line' }}>{description}</Paragraph>
      </div>
    </Card>
  );
};

export const ActivityList = ({ form, id }) => (
  <Card className={'list'} id={id}>
    <Title level={4}>Activities</Title>
    <EditableList
      form={form}
      buttonText={'Add new activity'}
      formItemName={'activities'}
      ReadComponent={ActivityComponent}
      UpdateComponent={EditableActivityComponent}
    />
  </Card>
);
