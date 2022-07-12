import { Button, Input, Space } from 'antd';
import { convertEnumToString, deepClone } from '../../utils/common';
import { fetchJobPositions } from '../../redux-flow/jobPositions/job-positions-action';
import { useDispatch, useSelector } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import JobPositionSubmodalContainer from '../JobPosition/JobPositionSubmodal.container';
import PickJobPositionTableColumn from './PickJobPositionTable.column';
import React, { useLayoutEffect, useRef, useState } from 'react';

const PickJobPositionTable = ({ selectable, form, calculateKeyArr }) => {
  //pagination
  const totalRecord = useSelector((state) => state.jobPosition.totalRecord);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [neededJobPositionDetail, setNeededJobPositionDetail] = useState(null);
  const [modalVisible, setModalVisibile] = useState(false);

  const jobPositionData = useSelector((state) => state?.jobPosition.data);

  const dispatch = useDispatch();
  const searchValueRef = useRef('');

  //select table logic
  const [initialSelectedValues, setInitialSelectedValues] = useState(() =>
    form.getFieldsValue(true).jobPositions ? [...form.getFieldsValue(true).jobPositions.map((item) => item.key)] : []
  );
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => [...initialSelectedValues]);
  const [selectedRows, setSelectedRows] = useState(
    form.getFieldsValue(true).jobPositions ? [...form.getFieldsValue(true).jobPositions] : []
  );

  //handle choose job button
  const chooseJobPositions = () => {
    const mappedData = [];

    selectedRows.forEach((item) => {
      if (!initialSelectedValues.includes(item.id)) mappedData.push(item);
    });

    const currentJobPositionsInForm = form.getFieldsValue(true).jobPositions
      ? [...form.getFieldsValue(true).jobPositions]
      : [];
    form.setFieldsValue({
      ...form.getFieldsValue(true),
      jobPositions: [...currentJobPositionsInForm, ...mappedData]
    });
    setInitialSelectedValues(selectedRowKeys);
    calculateKeyArr();
  };

  const rowSelection = {
    selectedRowKeys: [...selectedRowKeys],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: initialSelectedValues.includes(record.key),
      // Column configuration not to be checked
      name: record.name
    }),
    hideSelectAll: true,
    preserveSelectedRowKeys: true
  };

  const handleGetDetail = (jobPositionId) => {
    setNeededJobPositionDetail(jobPositionId);
    setModalVisibile(true);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const fetchData = async (currentPage, pageSize) => {
    dispatch(fetchJobPositions({ currentPage, pageSize, jobTitle: '' }));
  };

  useLayoutEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const jobPositionTableProps = {
    tableData: deepClone(jobPositionData).map((item) => ({
      ...item,
      jobType: convertEnumToString(item?.jobType),
      level: convertEnumToString(item?.level)
    })),
    tableColumns: PickJobPositionTableColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size='middle'>
            <a
              onClick={() => {
                handleGetDetail(record.id);
              }}>
              Detail
            </a>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    },
    rowSelection: { ...rowSelection }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <p style={{ marginBottom: '5px' }}>Search job position</p>
      <Input.Search
        onSearch={(value) => {
          searchValueRef.current = value;
          dispatch(fetchJobPositions({ currentPage, pageSize, jobTitle: value }));
        }}
      />
      <JobPositionSubmodalContainer
        jobPositionId={neededJobPositionDetail}
        visible={modalVisible}
        handleCloseModal={() => setModalVisibile(false)}
      />
      <CommonTableContainer {...jobPositionTableProps} />
      {selectable ? (
        <Button style={{ width: '100%' }} type='primary' onClick={chooseJobPositions}>
          Choose
        </Button>
      ) : null}
    </div>
  );
};

export default PickJobPositionTable;
