import { EyeOutlined } from '@ant-design/icons';
import { Input, Space, Tooltip, notification } from 'antd';
import { PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import {
  getAllApplicationForAttendant,
  getAllApplicationForCompany
} from '../../services/jobhub-api/ApplicationControllerService';
import { useSelector } from 'react-redux';
import ApplicationTableColumn from '../CommonTableComponent/columns/ApplicationTable.column';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import RoleType, { COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType';

const ApplicationViewContainer = ({ tabStatus }) => {
  const role = useSelector((state) => state.authentication.user.roles);

  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [applicationData, setApplicationData] = useState([]);
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

  const fetchData = async (currentPage, pageSize, jobFairSearchValue, jobPositionSearchValue, attendantSearchValue) => {
    const testStatus = filterStatus(tabStatus);
    try {
      const fetchFunction = [RoleType.COMPANY_EMPLOYEE, RoleType.COMPANY_MANAGER].includes(role)
        ? getAllApplicationForCompany
        : getAllApplicationForAttendant;
      const res = await fetchFunction(
        currentPage,
        pageSize,
        [testStatus],
        jobFairSearchValue.toLowerCase(),
        jobPositionSearchValue.toLowerCase(),
        attendantSearchValue.toLowerCase(),
        tabStatus !== 1 ? 'evaluateDate' : 'appliedDate'
      );
      const { data } = res;
      if (res.status !== 204) {
        if (data) {
          setApplicationData(
            data.content.map((item, index) => ({
              ...item,
              key: item.id,
              no: index + data.number * data.size + 1
            }))
          );
          setTotalRecord(data.totalElements);
        }
      } else {
        setApplicationData([]);
        setTotalRecord(0);
      }
    } catch (err) {
      notification['error']({
        message: `Fetch data failed`,
        description: `Error detail: ${err}`
      });
    }
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleViewResumeDetail = (resumeId, role) => {
    switch (role) {
      case COMPANY_MANAGER: {
        const url = generatePath(PATH_COMPANY_MANAGER.RESUME_DETAIL_PAGE, { id: resumeId });
        history.push(url);
        break;
      }
      case COMPANY_EMPLOYEE: {
        const url = generatePath(PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE, { id: resumeId });
        history.push(url);
        break;
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize, searchValue, searchValue, searchValue);
  }, [currentPage, pageSize, searchValue]);

  const applicationTableProps = {
    tableData: applicationData,
    tableColumns: ApplicationTableColumn(role),
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
        title: 'Actions',
        key: 'action',
        width: '6rem',
        render: (text, record) => (
          <Space size='middle'>
            <Tooltip placement='top' title='View detail'>
              <a onClick={() => handleViewResumeDetail(record.id, role)}>
                <EyeOutlined />
              </a>
            </Tooltip>
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
    <div>
      <div>
        <Space style={{ marginBottom: '1rem' }}>
          <Input.Search
            placeholder='Search application'
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            enterButton='Search'
            style={{ width: 500 }}
          />
        </Space>
        <CommonTableContainer {...applicationTableProps} />
      </div>
    </div>
  );
};

const filterStatus = (key) => {
  switch (key) {
    case '1':
      return 'PENDING';
    case '3':
      return 'APPROVE';
    default:
      return 'REJECT';
  }
};

export default ApplicationViewContainer;
