import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { Space, Typography } from 'antd';
import { generatePath, useHistory } from 'react-router-dom';
import { getAssignmentByEmployeeId } from '../../services/jobhub-api/AssignmentControllerService';
import { mapperJobFairAssignment } from '../../utils/mapperJobFairAssignment';
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

  const handleStartDecorateBooth = (id) => {
    const url = generatePath(PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE, {
      assignmentId: id
    });
    history.push(url);
  };

  // eslint-disable-next-line no-unused-vars
  const handleReview = (id) => {};

  const handleDecorateAction = (record) => {
    const now = new Date().getTime();
    return record.decorateStartTimeValue <= now <= record.decorateEndTimeValue ? (
      <a onClick={() => handleStartDecorateBooth(record.id)}>Decorate booth</a>
    ) : null;
  };

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
        render: (text, record) => <Space size='middle'>{handleDecorateAction(record)}</Space>
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
