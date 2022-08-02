import { Button, DatePicker, Form, Input, InputNumber, Modal, Tooltip, Typography, notification } from 'antd';
import { DateFormat } from '../../constants/ApplicationConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubscriptionPlanValidation } from '../../validate/SubscriptionPlanValidation';
import { convertMomentToMilliseconds, convertToDateString } from '../../utils/common';
import {
  createSubscriptionPlan,
  getAllSubscriptionPlanAPI,
  getSubscriptionPlanById,
  updateSubscriptionPlan
} from '../../services/jobhub-api/SubscriptionControllerService';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import SubscriptionPlanTableColumn from './SubscriptionPlanTable.column';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

const { Title } = Typography;
const { Search } = Input;

const SubscriptionPlanContainer = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [item, setItem] = useState({});

  const [form] = Form.useForm();

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const range = (start, end) => {
    const result = [];

    for (let i = start; i < end; i++) result.push(i);

    return result;
  };

  const disabledDate = (current) =>
    // Can not select days before today and today
    current && current < moment().endOf('day');

  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(30, 60),
    disabledSeconds: () => [55, 56]
  });

  const CreateSubscriptionForm = () => (
    <Form
      form={form}
      name='register'
      onFinish={handleCreateSubscription}
      scrollToFirstError
      layout='vertical'
      labelCol={21}
      wrapperCol={21}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Form.Item
            name='name'
            label='Name'
            rules={SubscriptionPlanValidation.name}
            style={{ marginRight: '1rem', flex: 1, width: '40%' }}>
            <Input placeholder='Enter subscription name' />
          </Form.Item>
          <Form.Item
            name='price'
            label='Price'
            rules={SubscriptionPlanValidation.price}
            style={{ flex: 1, width: '30%' }}>
            <InputNumber addonAfter='$' min={1} max={10000} />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Form.Item label='Valid date' name='validPeriod' rules={SubscriptionPlanValidation.validPeriod}>
            <DatePicker format={DateFormat} disabledDate={disabledDate} disabledTime={disabledDateTime} />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={SubscriptionPlanValidation.description}
            style={{ marginLeft: '1rem', flex: 1, width: '50%' }}>
            <TextArea showCount maxLength={300} autoSize={{ minRows: 3 }} />
          </Form.Item>
        </div>
        {isEditable ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button type='primary' onClick={() => handleEditSubscription(form.getFieldsValue(true))}>
                Edit
              </Button>
            </Form.Item>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Form.Item>
              <Button type='primary' htmlType='submit'>
                Create subscription
              </Button>
            </Form.Item>
          </div>
        )}
      </div>
    </Form>
  );

  const handleCreateSubscription = async (values) => {
    try {
      const body = {
        ...values,
        validPeriod: convertMomentToMilliseconds(values.validPeriod)
      };
      const res = await createSubscriptionPlan(body);
      if (res.status === 200) {
        setCreateModal(false);
        form.resetFields();
        notification['success']({
          message: 'Create new subscription plan successfully!'
        });
        fetchData();
      }
    } catch (err) {
      notification['error']({
        message: 'Create new subscription plan failed!'
      });
    }
  };

  const fetchData = async () => {
    try {
      const res = await getAllSubscriptionPlanAPI('ASC', searchValue, 0, pageSize, 'name');
      res.data.content.sort((a, b) => a.price - b.price);
      const result = res.data.content.map((item, index) => ({
        no: index,
        ...item
      }));

      setData(result);
    } catch (err) {
      notification['error']({
        message: 'Fetch subscription plans error'
      });
    }
  };

  useEffect(async () => {
    await fetchData();
  }, [currentPage, pageSize, searchValue]);

  const handleViewDetail = async (id) => {
    setIsEditable(true);
    const res = await getSubscriptionPlanById(id);
    res.data['validPeriod'] = moment(convertToDateString(item.validPeriod));
    setItem(res.data);
    setVisible(true);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleEditSubscription = async (values) => {
    const body = {
      description: values.description,
      id: values.id,
      name: values.name,
      price: values.price,
      validPeriod: convertMomentToMilliseconds(values.validPeriod)
    };
    const res = await updateSubscriptionPlan(body);
    if (res.status === 200) {
      notification['success']({
        message: 'Update subscription plan successfully!'
      });
      setVisible(false);
      fetchData();
    }
  };

  const handleOnSearch = (value) => {
    setSearchValue(value);
  };

  const tableProps = {
    tableData: data,
    tableColumns: SubscriptionPlanTableColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <>
            <Tooltip title='View detail'>
              <Button type='link' onClick={() => handleViewDetail(record.id)}>
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Tooltip>
          </>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  form.setFieldsValue(item);
  return (
    <div style={{ marginTop: '5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '0 2px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: '2rem' }}>
            <Title level={3}>Subscription plans management</Title>
          </div>
          <div className={'search-filter-container'}>
            <Search placeholder='Search plan' className={'search-bar'} onSearch={handleOnSearch} />
          </div>
        </div>
        <Button type='primary' onClick={() => setCreateModal(true)}>
          Create subscription plan
        </Button>
      </div>
      {createModal && (
        <Modal
          className={'add-employee-modal'}
          visible={createModal}
          onCancel={() => setCreateModal(false)}
          title={'Create subscription plan'}
          footer={null}>
          {item}
          {/*<CreateSubscriptionForm />*/}
        </Modal>
      )}
      {visible ? (
        <Modal visible={visible} onCancel={handleCloseModal} title={'Edit subscription plan'} footer={null}>
          <CreateSubscriptionForm />
        </Modal>
      ) : null}
      <CommonTableContainer {...tableProps} />
    </div>
  );
};

export default SubscriptionPlanContainer;
