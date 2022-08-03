import { Button, notification } from 'antd';
import { chooseSubscriptionAction } from '../../redux-flow/choose-subscription/choose-subscription-slice';
import { getAllCompanySubscriptionsAPI } from '../../services/jobhub-api/SubscriptionControllerService';
import { useDispatch } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useLayoutEffect, useState } from 'react';
import SubscriptionHistoryTableColumn from './SubscriptionHistoryTable.column';

const PickSubscriptionFormContainer = ({ setSelectionVisible }) => {
  const [data, setData] = useState();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const fetchData = async () => {
    try {
      const res = await getAllCompanySubscriptionsAPI('ASC', 0, pageSize);
      if (res.status === 204) {
        notification['info']({
          message: 'The subscription history is empty'
        });
      }
      if (res.status === 404) {
        notification['error']({
          message: 'Error when get subscription history'
        });
      }
      setTotalRecord(res.data.totalElements);
      const result = res.data.content.map((item, index) => ({
        ...item,
        key: index + 1,
        no: index + 1,
        name: item.subscriptionPlan.name,
        description: item.subscriptionPlan.description,
        status: item.jobfairQuota == 0 ? 'OUT_OF_STOCK' : item.status
      }));
      result.filter((item) => item.jobfairQuota !== 0);
      setData(result);
    } catch (err) {
      //
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };
  const handleChooseSubscription = () => {
    dispatch(chooseSubscriptionAction.setSubscriptionItem(selectedRows.find((item) => item.id !== undefined)));
    setSelectionVisible(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.jobfairQuota == '0' || record.status === 'INACTIVE',
      // Column configuration not to be checked
      name: record.jobfairQuota
    })
  };

  const tableProps = {
    tableData: data,
    tableColumns: SubscriptionHistoryTableColumn,
    paginationObject: {
      handlePageChange,
      totalRecord
    },
    rowSelection: {
      type: 'radio',
      ...rowSelection
    }
  };
  return (
    <>
      <CommonTableContainer {...tableProps} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type={'primary'} onClick={handleChooseSubscription}>
          Choose subscription
        </Button>
      </div>
    </>
  );
};

export default PickSubscriptionFormContainer;
