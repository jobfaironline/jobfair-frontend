import { Button, Checkbox, Form, Input, Modal, Tooltip, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cancelSubscriptionAPI, getInvoiceAPI } from '../../services/jobhub-api/SubscriptionControllerService';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import SubscriptionPlanTableColumn from './SubscriptionPlanTable.column';
import TextArea from 'antd/es/input/TextArea';

const fakeData = [
  {
    no: 1,
    id: 'ID001',
    name: 'Basic pack',
    description: 'Basic pack',
    price: '600'
  },
  {
    no: 2,
    id: 'ID002',
    name: 'Standard pack',
    description: 'Standard pack',
    price: '800'
  },
  {
    no: 3,
    id: 'ID003',
    name: 'Premium pack',
    description: 'Premium pack',
    price: '1000'
  }
];

const { Title } = Typography;
const { Search } = Input;

const SubscriptionPlanContainer = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [forceRender, setForceRender] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [form] = Form.useForm();

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

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
          <Form.Item name='name' label='Name' rules={[]} style={{ marginRight: '1rem', flex: 1, width: '40%' }}>
            <Input placeholder='Enter subscription name' />
          </Form.Item>
          <Form.Item name='price' label='Price' rules={[]} style={{ flex: 1, width: '30%' }}>
            <Input placeholder='Enter price' />
          </Form.Item>
        </div>
        <Form.Item
          name='description'
          label='Description'
          rules={[]}
          style={{ marginRight: '1rem', flex: 1, width: '50%' }}>
          <TextArea showCount maxLength={300} autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create subscription
          </Button>
        </Form.Item>
      </div>
    </Form>
  );

  const handleCreateSubscription = (values) => {
    console.log(values);
  };

  const fetchData = async () => {
    try {
      //   const res = await getAllCompanySubscriptionsAPI('ASC', 0, pageSize);
      //   if (res.status === 204) {
      //     notification['info']({
      //       message: 'The subscription history is empty'
      //     });
      //   }
      //   if (res.status === 404) {
      //     notification['error']({
      //       message: 'Error when get subscription history'
      //     });
      //   }
      //   setTotalRecord(res.data.totalElements);
      //   const result = res.data.content.map((item, index) => ({
      //     no: index + 1,
      //     id: item.id,
      //     currentPeriodStart: item.currentPeriodStart,
      //     currentPeriodEnd: item.currentPeriodEnd,
      //     price: item.price
      //   }));
      setData(fakeData);
    } catch (err) {
      //
    }
  };

  useEffect(async () => {
    await fetchData();
  }, [currentPage, pageSize, forceRender, searchValue]);

  const handleViewDetail = async (id) => {
    const res = await getInvoiceAPI(id);
    return window.open(res.data);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleEditSubscription = async () => {
    const res = await cancelSubscriptionAPI();
    notification['success']({
      message: res.data,
      duration: 2
    });
    setVisible(false);
    await fetchData();
    setForceRender(false);
  };

  const handleOpenModalEdit = (id) => {
    setVisible(true);
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
            {forceRender ? (
              <Tooltip title='Edit'>
                <Button type='link' onClick={() => handleOpenModalEdit(record.id)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              </Tooltip>
            ) : null}
          </>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };
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
          <CreateSubscriptionForm />
        </Modal>
      )}
      {visible ? (
        <Modal visible={visible} onCancel={handleCloseModal} title={'Edit subscription plan'} footer={null}>
          <Checkbox onChange={(e) => setIsAgree(e.target.checked)}>
            <span>I confirm that all information above are correct.</span>
          </Checkbox>
          {isAgree && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='primary' onClick={handleEditSubscription}>
                Edit
              </Button>
            </div>
          )}
        </Modal>
      ) : null}
      <CommonTableContainer {...tableProps} />
    </div>
  );
};

export default SubscriptionPlanContainer;
