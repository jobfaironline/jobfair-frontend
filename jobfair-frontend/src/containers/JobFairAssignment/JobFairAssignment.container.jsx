import { AssignmentConst } from '../../constants/AssignmentConst';
import { Button, Input, Modal, Select, Space, Tabs, Typography, notification } from 'antd';
import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../../constants/JobFairConst';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { generatePath } from 'react-router-dom';
import {
  getAssigmentByJobFairBoothId,
  getAssignmentByEmployeeId,
  getJobFairAssignmentByEmployeeId
} from '../../services/jobhub-api/AssignmentControllerService';
import { getCompanyBoothLatestLayout } from '../../services/jobhub-api/CompanyBoothLayoutControllerService';
import { mapperJobFairAssignment } from '../../utils/mapperJobFairAssignment';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import JobFairAssignmentTableColumn, {
  JobFairAllAssignmentColumn,
  JobFairAssignmentDetailTableColumn
} from '../JobFairAssignmentTable/JobFairAssignmentTable.column';
import MyBoothLayoutListContainer from '../MyBoothLayoutList/MyBoothLayoutList.container';
import React, { useEffect, useRef, useState } from 'react';
import TaskActionButton from './TaskActionButton.container';
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;

export const JobFairAssignmentModal = ({ data, visible, onClose }) => {
  if (data === undefined) return null;
  const jobFairAssignmentTableProps = {
    tableData: data,
    tableColumns: JobFairAssignmentDetailTableColumn,
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
      handlePageChange: () => {
        //ignore
      },
      totalRecord: data?.length ?? 0
    }
  };

  return (
    <Modal
      visible={visible}
      width={'90%'}
      onOk={onClose}
      onCancel={onClose}
      title={`Assignment(s) of "${data[0].jobFairName}"`}>
      <CommonTableContainer {...jobFairAssignmentTableProps} />
    </Modal>
  );
};

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
  //modal
  const [modalState, setModalState] = useState({
    data: undefined,
    visible: false
  });
  const searchValueRef = useRef('');

  const getAssignmentCompleted = async (data) => {
    const boothAssignmentPromises = data.map((assignment) => getAssigmentByJobFairBoothId(assignment.jobFairBooth.id));
    const boothAssignments = await Promise.all(boothAssignmentPromises);
    data.forEach((assignment, index) => {
      assignment.boothAssignments = boothAssignments[index].data;
    });
    for (const item of data) {
      if (item.type === AssignmentConst.DECORATOR) {
        try {
          await getCompanyBoothLatestLayout(item.jobFairBooth.id);
          item.isDoneDecorate = true;
        } catch (e) {
          item.isDoneDecorate = false;
        }
      }
    }
    data.sort((a, b) => b.createTime - a.createTime);
    setData(data);
    setTotalRecord(data.length);
  };

  const getJobFairAssignmentCompleted = async (data) => {
    for (const jobFairAssignment of data) {
      const assignments = jobFairAssignment.assignments;
      const boothAssignmentPromises = assignments.map((assignment) =>
        getAssigmentByJobFairBoothId(assignment.jobFairBooth.id)
      );
      const boothAssignments = await Promise.all(boothAssignmentPromises);
      assignments.forEach((assignment, index) => {
        assignment.boothAssignments = boothAssignments[index].data;
      });
      for (const item of assignments) {
        if (item.type === AssignmentConst.DECORATOR) {
          try {
            await getCompanyBoothLatestLayout(item.jobFairBooth.id);
            item.isDoneDecorate = true;
          } catch (e) {
            item.isDoneDecorate = false;
          }
        }
      }
    }
    setData(data);
    setTotalRecord(data.length);
  };

  const filterStaffAssignment = (jobFairAssignments) => {
    jobFairAssignments.forEach((jobFairAssignment) => {
      const assignments = jobFairAssignment.assignments;
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
      jobFairAssignment.assignments = result;
    });
    return jobFairAssignments;
  };

  const fetchData = async () => {
    try {
      if (!viewAllMode) {
        const res = await getAssignmentByEmployeeId(
          searchValueRef.current,
          'ASC',
          currentPage,
          pageSize,
          'createTime',
          currentTab
        );
        const data = res.data.content.map((item, index) => mapperJobFairAssignment(item, index));
        await getAssignmentCompleted(data);
        return;
      }
      const now = moment();
      const res = await getJobFairAssignmentByEmployeeId(
        searchValueRef.current,
        'DESC',
        currentPage,
        pageSize,
        'create_time'
      );
      let data = res.data.content;
      data = filterStaffAssignment(data);
      data.forEach((jobFairAssignment, index) => {
        jobFairAssignment.assignments = jobFairAssignment.assignments.map((item, index) =>
          mapperJobFairAssignment(item, index)
        );
        jobFairAssignment.assignments = jobFairAssignment.assignments.sort((a, b) => a.beginTime - b.beginTime);
        jobFairAssignment.no = index + 1;
        jobFairAssignment.jobFairName = jobFairAssignment.jobFair.name;
        jobFairAssignment.status = jobFairAssignment.jobFair.status;
        jobFairAssignment.startTime = jobFairAssignment.jobFair.decorateStartTime;
        jobFairAssignment.endTime = jobFairAssignment.jobFair.publicEndTime;
        jobFairAssignment.onClickJobFair = () => {
          const url = generatePath(PATH_COMPANY_EMPLOYEE.CHECKLIST, { jobFairId: jobFairAssignment.jobFair.id });
          window.open(`${window.location.origin}${url}`);
        };
        jobFairAssignment.onClickDetail = () => {
          setModalState((prevState) => ({ ...prevState, visible: true, data: jobFairAssignment.assignments }));
        };
        if (jobFairAssignment.jobFair.decorateStartTime < now && jobFairAssignment.jobFair.publicStartTime > now) {
          jobFairAssignment.status = JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING;
          jobFairAssignment.statusColor = 'blue';
        }
        if (jobFairAssignment.jobFair.decorateStartTime >= now) {
          jobFairAssignment.status = JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET;
          jobFairAssignment.statusColor = 'default';
        }
        if (jobFairAssignment.jobFair.publicStartTime <= now) {
          jobFairAssignment.status = JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE;
          jobFairAssignment.statusColor = 'green';
        }
      });
      await getJobFairAssignmentCompleted(data);
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
  }, [currentPage, pageSize, reRender, currentTab]);

  useEffect(() => {
    if (viewAllMode) setCurrentTab('');
    else setCurrentTab(AssignmentConst.SUPERVISOR);
  }, [viewAllMode]);

  useEffect(() => {
    webSocketClient.addEvent('refresh-assignment-list', () => {
      setRerender((prevState) => !prevState);
    });
    return () => {
      webSocketClient.removeEvent('refresh-assignment-list');
    };
  }, []);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const jobFairAllAssignmentTableProps = {
    tableData: data,
    tableColumns: JobFairAllAssignmentColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    paginationObject: {
      handlePageChange,
      totalRecord
    }
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

  const onSearchAssignment = (value) => {
    searchValueRef.current = value;
    fetchData();
  };

  return (
    <>
      <JobFairAssignmentModal
        visible={modalState.visible}
        data={modalState.data}
        onClose={() => setModalState((prevState) => ({ ...prevState, visible: false, data: undefined }))}
      />
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
          <Space>
            <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
              My assignment
            </Typography.Title>
            <Input.Search
              style={{ marginLeft: '1rem' }}
              placeholder={'Search by job fair name'}
              onSearch={onSearchAssignment}
            />
          </Space>
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
              <CommonTableContainer {...jobFairAllAssignmentTableProps} />
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
    </>
  );
};

export default JobFairAssignmentContainer;
