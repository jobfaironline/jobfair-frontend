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
      const data = await getEmployeesAPI({ companyId, searchContent: searchValue, pageSize, offset: currentPage });
      const mappedData = data.content.map((employee, index) => {
        const { firstName, middleName, lastName } = employee.account;
        const fullName = `${firstName} ${middleName} ${lastName}`;
        return {
          fullName,
          no: index + 1,
          department: employee.department,
          employeeId: employee.employeeId
        };
      });
      setData(mappedData);
      setTotalRecord(data.totalElements);
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Employee Id',
        dataIndex: 'employeeId',
        key: 'employeeId'
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role) => {
          let objStatus;
          switch (role) {
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
                message: role.toLowerCase()
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
                  employeeName: 'Son ga',
                  timeStart: 0,
                  timeEnd: 0,
                  month: 5,
                  year: 2022,
                  date: 15,
                  id: 'abc123',
                  badgeType: 'success'
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
