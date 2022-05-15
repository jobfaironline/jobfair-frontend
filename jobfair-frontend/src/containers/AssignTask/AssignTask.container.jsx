import { Col, Row, Tag, Typography, notification } from 'antd';
import { getEmployeesAPI } from '../../services/jobhub-api/CompanyEmployeeControllerService';
import { useSelector } from 'react-redux';
import AssignTaskComponent from '../../components/customized-components/AssignTask/AssignTask.component';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import Search from 'antd/es/input/Search';

const AssignTaskContainer = () => {
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(async () => {
    try {
      const res = await getEmployeesAPI({ companyId, searchContent: searchValue, pageSize, offset: currentPage });
      const mappedData = res.data.content.map((employee, index) => {
        const { firstname, middlename, lastname } = employee.account;
        const fullName = `${firstname} ${middlename ? `${middlename} ` : ''}${lastname}`;
        return {
          fullName,
          no: index + 1,
          department: employee.department,
          employeeId: employee.employeeId,
          status: employee.account.status
        };
      });
      setTotalRecord(data.totalElements);
      setData(mappedData);
    } catch (e) {
      notification['error']({
        message: 'Error when get employee data'
      });
    }
  }, [currentPage, pageSize, searchValue]);
  const employeeTableProps = {
    tableData: data,
    tableColumns: () => [
      {
        title: 'No.',
        dataIndex: 'no',
        key: 'no'
      },
      {
        title: 'Employee Id',
        dataIndex: 'employeeId',
        key: 'employeeId'
      },
      {
        title: 'Full name',
        dataIndex: 'fullName',
        key: 'fullName'
      },
      {
        title: 'Department',
        dataIndex: 'department',
        key: 'department'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          let objStatus;
          switch (status) {
            case 'INTERVIEWER':
              objStatus = {
                color: 'success',
                message: 'Interviewer'
              };
              break;
            case 'RECEPTIONIST':
              objStatus = {
                color: 'processing',
                message: 'Receptionist'
              };
              break;
            default:
              objStatus = {
                color: 'error',
                message: status.toLowerCase()
              };
              break;
          }
          return (
            <Tag color={objStatus.color}>{objStatus.message}</Tag> // prettier-ignore
          );
        }
      }
    ],
    paginationObject: {
      handlePageChange: (page, pageSize) => {
        if (page > 0) setCurrentPage(page - 1);
        else setCurrentPage(page);
        setPageSize(pageSize);
      },
      totalRecord
    }
  };
  const onSearch = (value) => {
    setSearchValue(value);
  };
  return (
    <>
      <Typography.Title level={4}>Assign task</Typography.Title>
      <Search placeholder='Search...' onSearch={onSearch} style={{ width: 200 }} />
      <Row wrap={false}>
        <Col flex={'35rem'}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 120px)',
              overflowY: 'hidden',
              border: '0.5px solid gray',
              borderRadius: '5px'
            }}>
            <CommonTableContainer {...employeeTableProps} />
          </div>
        </Col>
        <Col flex={'auto'}>
          <div style={{ marginLeft: '2rem' }}>
            <AssignTaskComponent
              data={[
                {
                  attendantId: '3f6eda7f-4c49-4f6c-83b2-a4c72612510a',
                  employeeName: 'son',
                  badgeType: 'processing',
                  beginTime: 1652691071000,
                  day: 16,
                  endTime: 1652777471000,
                  id: '04682dea-9ee5-48b0-826a-150baabf6315',
                  month: 4,
                  status: 'INTERVIEWING',
                  timeEnd: 1652777471000,
                  timeStart: 1652691071000,
                  year: 2022
                }
              ]}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default AssignTaskContainer;
