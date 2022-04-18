import { Space, Typography } from 'antd';
import { getAssignmentByEmployeeId } from '../../services/jobhub-api/AssignmentControllerService';
import { mapperJobFairAssignment } from '../../utils/mapperJobFairAssignment';
import { useHistory } from 'react-router-dom';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import JobFairAssignmentTableColumn from '../JobFairAssignmentTable/JobFairAssignmentTable.column';
import React, { useLayoutEffect, useState } from 'react';

const fakeData = [
  {
    jobFairName: 'demo',
    assignmentType: 'INTERVIEWEE',
    status: 'PENDING'
  },
  {
    jobFairName: 'demo 1',
    assignmentType: 'IN CHARGE',
    status: 'FINISHED'
  },
  {
    jobFairName: 'demo 1',
    assignmentType: 'RECEPTIONIST',
    status: 'FINISHED'
  }
];

const JobFairAssignmentContainer = () => {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  const fetchData = async () => {
    const res = await getAssignmentByEmployeeId('', currentPage, pageSize, '');
    setTotalRecord(res.data.totalElements);
    setData([...res.data.content.map((item, index) => mapperJobFairAssignment(item, index))]);
  };
  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  // eslint-disable-next-line no-unused-vars
  const handleStartDecorateBooth = (id) => {};

  // eslint-disable-next-line no-unused-vars
  const handleReview = (id) => {};

  const jobFairAssignmentTableProps = {
    tableData: data,
    tableColumns: JobFairAssignmentTableColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size='middle'>
            <a onClick={() => handleStartDecorateBooth(record.id)}>Decorate booth</a>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  return (
    <div style={{}}>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
        <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
          My assignment
        </Typography.Title>
      </Space>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CommonTableContainer {...jobFairAssignmentTableProps} />
      </div>
    </div>
  );
};

export default JobFairAssignmentContainer;
