import { AssignmentConst } from '../../constants/AssignmentConst';
import { Button, Select, Space, Tabs, Typography, notification } from 'antd';
import {
  getAssigmentByJobFairBoothId,
  getAssignmentByEmployeeId
} from '../../services/jobhub-api/AssignmentControllerService';
import { mapperJobFairAssignment } from '../../utils/mapperJobFairAssignment';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import JobFairAssignmentTableColumn from '../JobFairAssignmentTable/JobFairAssignmentTable.column';
import MyBoothLayoutListContainer from '../MyBoothLayoutList/MyBoothLayoutList.container';
import React, { useEffect, useState } from 'react';
import TaskActionButton from './TaskActionButton.container';

const { TabPane } = Tabs;
const { Option } = Select;

const JobFairAssignmentContainer = () => {
  const webSocketClient = useSelector(selectWebSocket);

  const [data, setData] = useState([]);
  const [reRender, setRerender] = useState(false);
  const [currentTab, setCurrentTab] = useState(AssignmentConst.SUPERVISOR);
  const [viewAllMode, setViewAllMode] = useState(true);
  const [myLayoutVisibility, setMyLayoutVisibility] = useState(false);
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const getAssignmentCompleted = async (data) => {
    const boothAssignmentPromises = data.map((assignment) => getAssigmentByJobFairBoothId(assignment.jobFairBooth.id));
    const boothAssignments = await Promise.all(boothAssignmentPromises);
    data.forEach((assignment, index) => {
      assignment.boothAssignments = boothAssignments[index].data;
    });
    setData(data);
    setTotalRecord(data.length);
  };

  const filterStaffAssignment = (assignments) => {
    const assignmentsByBooth = assignments.reduce((prev, current) => {
      const jobFairBoothId = current.jobFairBooth.id;
      if (prev[jobFairBoothId] !== undefined) {
        prev[jobFairBoothId].push(current);
        return prev;
      }
      prev[jobFairBoothId] = [current];
      return prev;
    }, {});
    const result = [];
    Object.keys(assignmentsByBooth).forEach((boothId) => {
      const assignments = assignmentsByBooth[boothId];
      const isHasStaff = assignments.some((assignment) => assignment.type === AssignmentConst.STAFF);
      if (!isHasStaff) {
        result.push(...assignments);
        return;
      }
      const isHasInterviewer = assignments.some((assignment) => assignment.type === AssignmentConst.INTERVIEWER);
      const isHasReceptionist = assignments.some((assignment) => assignment.type === AssignmentConst.RECEPTION);
      if (isHasInterviewer || isHasReceptionist)
        result.push(...assignments.filter((assignment) => assignment.type !== AssignmentConst.STAFF));
      else result.push(...assignments);
    });
    return result;
  };

  const fetchData = async () => {
    try {
      if (!viewAllMode) {
        const res = await getAssignmentByEmployeeId('', currentPage, pageSize, '', currentTab);
        const data = res.data.content.map((item, index) => mapperJobFairAssignment(item, index));
        await getAssignmentCompleted(data);
        return;
      }
      const res = await getAssignmentByEmployeeId('', currentPage, pageSize, '');
      let data = res.data.content;
      data = filterStaffAssignment(data);
      data = data.map((item, index) => mapperJobFairAssignment(item, index));
      await getAssignmentCompleted(data);
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
  }, [currentPage, pageSize, reRender, currentTab]);

  useEffect(() => {
    if (viewAllMode) setCurrentTab('');
    else setCurrentTab(AssignmentConst.SUPERVISOR);
  }, [viewAllMode]);

  webSocketClient.addEvent('refresh-assignment-list', () => {
    setRerender((prevState) => !prevState);
  });

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
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
        render: (text, record) => (
          <TaskActionButton type={record.assignmentType} status={record.status} record={record} />
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  const handleOpenMyBoothLayout = () => {
    setMyLayoutVisibility(true);
  };

  return (
    <div style={{ paddingTop: '2rem' }}>
      <MyBoothLayoutListContainer
        setMyLayoutVisibility={setMyLayoutVisibility}
        myLayoutVisibility={myLayoutVisibility}
        deletable
      />
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
        <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
          My assignment
        </Typography.Title>
        <Space>
          View mode:
          <Select
            defaultValue={true}
            style={{
              width: 200
            }}
            onChange={(value) => setViewAllMode(value)}>
            <Option value={true}>View all</Option>
            <Option value={false}>View by assignment type</Option>
          </Select>
        </Space>
      </Space>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {viewAllMode ? (
          <>
            <Space style={{ width: '100%', justifyContent: 'end', marginBottom: '1rem' }}>
              <Button type='primary' onClick={handleOpenMyBoothLayout}>
                My Booth Layout
              </Button>
            </Space>
            <CommonTableContainer {...jobFairAssignmentTableProps} />
          </>
        ) : (
          <Tabs
            activeKey={currentTab}
            centered
            onTabClick={(key) => {
              setCurrentTab(key);
            }}>
            <TabPane tab='Supervisor task' key={AssignmentConst.SUPERVISOR}>
              <CommonTableContainer {...jobFairAssignmentTableProps} />
            </TabPane>
            <TabPane tab='Receptionist task' key={AssignmentConst.RECEPTION}>
              <CommonTableContainer {...jobFairAssignmentTableProps} />
            </TabPane>
            <TabPane tab='Interview task' key={AssignmentConst.INTERVIEWER}>
              <CommonTableContainer {...jobFairAssignmentTableProps} />
            </TabPane>
            <TabPane tab='Decorate task' key={AssignmentConst.DECORATOR}>
              <Space style={{ width: '100%', justifyContent: 'end', marginBottom: '1rem' }}>
                <Button type='primary' onClick={handleOpenMyBoothLayout}>
                  My Booth Layout
                </Button>
              </Space>
              <CommonTableContainer {...jobFairAssignmentTableProps} />
            </TabPane>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default JobFairAssignmentContainer;
