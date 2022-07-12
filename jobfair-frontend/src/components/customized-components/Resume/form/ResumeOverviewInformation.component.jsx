import { AccountProfileValidation, AttendantProfileValidation } from '../../../../validate/AttendantProfileValidation';
import { Card, Col, Form, Input, Row, Select, Typography } from 'antd';
import { CountryConst, JobLevelConst } from '../../../../constants/AttendantConstants';

const { Title } = Typography;
const { Option } = Select;

export const ResumeOverviewInformation = ({ id, form }) => (
  <Card className={'list anchor'} id={id}>
    <Title level={4}>Overview information</Title>
    <Row gutter={10}>
      <Col span={16}>
        <Form.Item label='Full name' name={['fullName']} hasFeedback rules={AccountProfileValidation.firstname}>
          <Input placeholder='First name' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={8}>
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
    </Row>
    <Row gutter={10}>
      <Col span={12}>
        <Form.Item label='Phone number' name={['phone']} hasFeedback rules={AccountProfileValidation.phone}>
          <Input placeholder='Phone' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label='Email' name={['email']} hasFeedback>
          <Input placeholder='Email' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={10}>
      <Col span={9}>
        <Form.Item label='Job title' name='jobTitle' hasFeedback rules={AttendantProfileValidation.jobTitle}>
          <Input placeholder='Job title' style={{ width: '100%' }} />
        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item label='Year of experience' name='yearOfExp' hasFeedback rules={AttendantProfileValidation.yearOfExp}>
          <Input placeholder='Year of exp' style={{ width: '100%' }} type='number' min='0' />
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
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item label='About me' name='aboutMe' hasFeedback>
          <Input.TextArea placeholder='Year of exp' smaxLength={5000} autoSize={{ minRows: 10, maxRows: 10 }} />
        </Form.Item>
      </Col>
    </Row>
  </Card>
);
