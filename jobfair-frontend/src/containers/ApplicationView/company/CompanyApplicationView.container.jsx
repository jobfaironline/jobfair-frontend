import { COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../../constants/RoleType';
import { EyeOutlined } from '@ant-design/icons';
import { Input, Space, Tooltip, notification } from 'antd';
import { PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { getAllApplication } from '../../../services/jobhub-api/ApplicationControllerService';
import { useHistory } from 'react-router-dom';
import ApplicationTableColumn from '../../CommonTableComponent/columns/ApplicationTable.column';
import CommonTableContainer from '../../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
const CompanyApplicationView = ({ role, tabStatus, ...otherProps }) => {
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [applicationData, setApplicationData] = useState([]);
  const history = useHistory();
  const [jobFairSearchValue, setJobfairSearchValue] = useState('');
  const [jobPositionSearchValue, setJobPositionSearchValue] = useState('');

  const fetchData = async (currentPage, pageSize, jobFairSearchValue, jobPositionSearchValue) => {
    const testStatus = filterStatus(tabStatus);
    try {
      const res = await getAllApplication(
        currentPage,
        pageSize,
        [testStatus],
        jobFairSearchValue,
        jobPositionSearchValue,
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
      case COMPANY_MANAGER:
        history.push(PATH_COMPANY_MANAGER.RESUME_DETAIL_PAGE, {
          resumeId
        });
        break;
      case COMPANY_EMPLOYEE:
        history.push(PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE, {
          resumeId
        });
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchData(currentPage, pageSize, jobFairSearchValue, jobPositionSearchValue);
  }, [currentPage, pageSize, jobFairSearchValue, jobPositionSearchValue]);

  const applicationTableProps = {
    tableData: applicationData,
    tableColumns: ApplicationTableColumn,
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
          <Input
            placeholder='Search by jobfair name'
            onChange={(e) => {
              setJobfairSearchValue(e.target.value);
            }}
            style={{ width: 200 }}
          />
          <Input
            placeholder='Search by job position'
            onChange={(e) => {
              setJobPositionSearchValue(e.target.value);
            }}
            style={{ width: 200 }}
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

export default CompanyApplicationView;
