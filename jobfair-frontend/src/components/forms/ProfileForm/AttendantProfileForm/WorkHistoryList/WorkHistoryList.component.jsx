import './WorkHistoryList.style.scss';
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

const { RangePicker } = DatePicker;
const { Title, Text, Paragraph } = Typography;

const WorkHistoryComponent = ({ data, onClick }) => {
  const { id, position, company, description, range, isCurrentJob } = data;
  const fromDate = range?.[0];
  const toDate = range?.[1];

  return (
    <Card
      hoverable={true}
      className={'work-history'}
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
            {position}
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            {company}
          </Title>
          <div>
            {fromDate?.format(MonthFormat)} <ArrowRightOutlined />{' '}
            {isCurrentJob ? 'Present' : toDate?.format(MonthFormat)}
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

const EditableWorkHistoryComponent = (props) => {
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
              name={[name, 'position']}
              label='Position'
              rules={AttendantProfileValidation.workHistories.position}>
              <Input placeholder='Position' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...restField}
              label='Company'
              name={[name, 'company']}
              hasFeedback
              rules={AttendantProfileValidation.workHistories.company}>
              <Input placeholder='company' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={15}>
            <Form.Item
              style={{ width: '100%' }}
              label='Date range'
              {...restField}
              name={[name, 'range']}
              rules={AttendantProfileValidation.workHistories.range}>
              <RangePicker picker='month' format={MonthFormat} />
            </Form.Item>
          </Col>
          <Col span={9}>
            <Form.Item {...restField} name={[name, 'isCurrentJob']} label='Current job' initialValue={true}>
              <Radio.Group>
                {YesNoConst.map((item) => (
                  <Radio.Button value={item.value}>{item.label}</Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          {...restField}
          name={[name, 'description']}
          hasFeedback
          label='Description'
          rules={AttendantProfileValidation.workHistories.description}
          style={{ width: '100%' }}>
          <TextArea placeholder='description' maxLength={5000} autoSize={{ minRows: 5, maxRows: 5 }} />
        </Form.Item>
      </div>
      <div style={{ display: 'flex' }}>
        <Button style={{ marginLeft: 'auto' }} type={'primary'} icon={<DeleteOutlined />} onClick={remove}>
          Remove
        </Button>
      </div>
    </Card>
  );
};

export const WorkHistoryList = ({ form, id }) => (
  <Card className={'list'} id={id}>
    <Title level={4}>Work histories</Title>
    <EditableList
      form={form}
      buttonText={'Add new work history'}
      formItemName={'workHistories'}
      ReadComponent={WorkHistoryComponent}
      UpdateComponent={EditableWorkHistoryComponent}
    />
  </Card>
);
