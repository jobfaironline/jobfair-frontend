import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { Space, Typography, notification } from 'antd';
import { generatePath, useHistory } from 'react-router-dom';
import { getAssignmentByEmployeeId } from '../../services/jobhub-api/AssignmentControllerService';
import { mapperJobFairAssignment } from '../../utils/mapperJobFairAssignment';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import JobFairAssignmentTableColumn from '../JobFairAssignmentTable/JobFairAssignmentTable.column';
import React, { useEffect, useState } from 'react';

const JobFairAssignmentContainer = () => {
  const history = useHistory();
  const webSocketClient = useSelector(selectWebSocket);

  const [data, setData] = useState([]);
  const [reRender, setRerender] = useState(false);
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async () => {
    try {
      const res = await getAssignmentByEmployeeId('', currentPage, pageSize, '');
      setTotalRecord(res.data.totalElements);
      setData([...res.data.content.map((item, index) => mapperJobFairAssignment(item, index))]);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };
  useEffect(() => {
    fetchData();
    return () => {
      webSocketClient.removeEvent('refresh-assignment-list');
    };
  }, [currentPage, pageSize, reRender]);

  webSocketClient.addEvent('refresh-assignment-list', () => {
    setRerender((prevState) => !prevState);
  });

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
