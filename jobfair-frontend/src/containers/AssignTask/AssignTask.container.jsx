import './AssignTask.styles.scss';
import { AssignmentConst } from '../../constants/AssignmentConst';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  notification
} from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { assignEmployee, getAssigmentByJobFairBoothId } from '../../services/jobhub-api/AssignmentControllerService';
import { getCompanyBoothById } from '../../services/jobhub-api/JobFairBoothControllerService';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { Text } = Typography;
const { TextArea } = Input;
const AssignTaskContainer = (props) => {
  const { boothId } = props;
  const [tableData, setTableData] = useState({
    dataSource: undefined,
    columns: undefined
  });
  const [boothData, setBoothData] = useState(undefined);

  const [selectedCellData, setSelectedCellData] = useState({
    date: undefined,
    employee: undefined,
    visible: false,
    fullname: undefined,
    timeObj: undefined,
    assignments: undefined
  });

  const [chooseShift, setChooseShift] = useState({
    morningShift: false,
    afternoonShift: false
  });

  const [forceRerender, setForceRerender] = useState(false);

  const [form] = Form.useForm();

  const [hasChange, setHasChange] = useState(false);

  useEffect(() => {
    fetchData();
  }, [forceRerender]);

  const fetchData = async () => {
    try {
      let res = await getAssigmentByJobFairBoothId(boothId);
      const assignments = res.data;
      let staffAssignments = assignments.filter((assignment) =>
        [AssignmentConst.STAFF, AssignmentConst.INTERVIEWER, AssignmentConst.RECEPTION].includes(assignment.type)
      );
      const staffs = staffAssignments
        .map((assignment) => assignment.companyEmployee)
        .reduce((prev, employee) => {
          prev[employee.accountId] = employee;
          return prev;
        }, {});

      staffAssignments = staffAssignments.reduce((prev, current) => {
        const employeeId = current.companyEmployee.accountId;
        if (prev[employeeId] === undefined) prev[employeeId] = [];
        prev[employeeId].push(current);
        return prev;
      }, {});

      res = await getCompanyBoothById(boothId);
      const jobFairBooth = res.data;
      const jobFairInfo = res.data.jobFair;

      const publicStartTime = moment(jobFairInfo.publicStartTime);
      const publicEndTime = moment(jobFairInfo.publicEndTime);
      const timeRange = [];
      const diff = publicEndTime.diff(publicStartTime, 'days');
      const publicStartBeginTime = publicStartTime.clone().startOf('day');
      for (let i = 0; i <= diff; i++) {
        publicStartBeginTime.add(i, 'days');
        timeRange.push(publicStartBeginTime.clone());
      }

      const timeObj = timeRange.reduce((prev, current) => {
        const title = current.format('ddd, MMM/D/YYYY');
        prev[title] = { beginTime: current.clone(), endTime: current.clone().endOf('day') };
        return prev;
      }, {});

      const dataSource = [];

      for (const [key, value] of Object.entries(staffAssignments)) {
        const result = {
          employeeId: key,
          employee: staffs[key],
          timeObj
        };
        for (const title of Object.keys(timeObj)) result[title] = [];

        for (const [title, time] of Object.entries(timeObj)) {
          const { beginTime, endTime } = time;
          for (const assignment of value) {
            if (assignment.beginTime >= beginTime.valueOf() && assignment.endTime <= endTime.valueOf())
              result[title].push(assignment);
          }
        }
        dataSource.push(result);
      }
      for (const staffId of Object.keys(staffs)) {
        const existedData = dataSource.find((data) => data.employeeId === staffId);
        if (existedData === undefined) {
          const data = {
            employeeId: staffId,
            employee: undefined
          };
          for (const title of Object.keys(timeObj)) data[title] = [];

          dataSource.push(data);
        }
      }

      const columns = [
        {
          title: 'Employee',
          key: 'employee',
          width: '25rem',
          render: (_, record) => {
            const { firstname, middlename, lastname, profileImageUrl } = record.employee.account;
            const fullName = `${firstname} ${middlename ? `${middlename} ` : ''} ${lastname}`;
            return (
              <div>
                <Space>
                  <Avatar src={profileImageUrl} size={56} />
                  <Text>{fullName}</Text>
                </Space>
              </div>
            );
          }
        }
      ];
      for (const title of Object.keys(timeObj)) {
        columns.push({
          title,
          dataIndex: title,
          render: (_, record) => {
            const { firstname, middlename, lastname } = record.employee.account;
            const fullName = `${firstname} ${middlename ? `${middlename} ` : ''} ${lastname}`;
            const elements = [];
            record[title]
              .sort((a, b) => a.beginTime - b.beginTime)
              .forEach((assigment) => {
                const beginTime = moment(assigment.beginTime);
                const endTime = moment(assigment.endTime);
                elements.push(
                  <div
                    style={{
                      display: 'flex',
                      backgroundColor: assigment.type === AssignmentConst.INTERVIEWER ? '#dfdf149e' : '#02fd02',
                      padding: '1rem',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      fontWeight: 600,
                      marginBottom: '0.5rem'
                    }}>
                    <Text>
                      {beginTime.format('hh:mm')}-{endTime.format('hh:mm')}
                    </Text>
                    -<Text>{assigment.type}</Text>
                  </div>
                );
              });
            const assignTaskComponent = (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Tooltip title='assign task'>
                  <a
                    style={{ fontSize: '50px' }}
                    onClick={() => {
                      let isMorningShift = false;
                      let isAfternoonShift = false;
                      let morningShiftType = undefined;
                      let afternoonShiftType = undefined;

                      record[title].forEach((assignemnt) => {
                        if (moment(assignemnt.beginTime).hour() === 9) {
                          isMorningShift = true;
                          morningShiftType = assignemnt.type;
                        } else {
                          isAfternoonShift = true;
                          afternoonShiftType = assignemnt.type;
                        }
                      });
                      form.setFieldsValue({
                        'morning-shift': isMorningShift,
                        'morning-shift-type': morningShiftType,
                        'afternoon-shift': isAfternoonShift,
                        'afternoon-shift-type': afternoonShiftType
                      });

                      setSelectedCellData((prevState) => ({
                        ...prevState,
                        visible: true,
                        fullname: fullName,
                        date: title,
                        employee: record.employee,
                        timeObj: record.timeObj,
                        assignments: record[title]
                      }));
                      setChooseShift((prevState) => ({
                        ...prevState,
                        morningShift: isMorningShift,
                        afternoonShift: isAfternoonShift
                      }));
                    }}>
                    +
                  </a>
                </Tooltip>
              </div>
            );
            if (elements.length !== 2 && elements.length !== 0) {
              if (moment(record[title][0].beginTime).hour() === 9) elements.push(assignTaskComponent);
              else elements.unshift(assignTaskComponent);
            }
            if (elements.length === 0) elements.push(assignTaskComponent);

            return elements;
          }
        });
      }

      setTableData((prevState) => ({ ...prevState, dataSource, columns }));
      setBoothData(jobFairBooth);
    } catch (e) {
      notification['error']({
        message: 'Error when get employee data'
      });
    }
  };

  return (
    <>
      <Modal
        visible={selectedCellData.visible}
        title={`Assign task - ${selectedCellData.date} - ${selectedCellData.fullname}`}
        onCancel={() => {
          form.resetFields();
          setSelectedCellData((prevState) => ({
            ...prevState,
            visible: false,
            date: undefined,
            timeObj: undefined,
            employee: undefined,
            assignments: undefined,
            fullname: undefined
          }));
        }}
        onOk={async () => {
          const values = form.getFieldsValue(true);
          const beginTime = selectedCellData.timeObj[selectedCellData.date].beginTime;
          const NineAM = beginTime.clone().add(9, 'h');
          const TwelveAM = beginTime.clone().add(12, 'h');
          const TwelveHalfAM = beginTime.clone().add(12, 'h').add(30, 'm');
          const FivePM = beginTime.clone().add(17, 'h');
          if (chooseShift.morningShift) {
            await assignEmployee(
              selectedCellData.employee.accountId,
              boothData.id,
              values['morning-shift-type'],
              NineAM.valueOf(),
              TwelveAM.valueOf()
            );
          }
          if (chooseShift.afternoonShift) {
            await assignEmployee(
              selectedCellData.employee.accountId,
              boothData.id,
              values['afternoon-shift-type'],
              TwelveHalfAM.valueOf(),
              FivePM.valueOf()
            );
          }
          setHasChange(true);
          setSelectedCellData((prevState) => ({
            ...prevState,
            visible: false,
            date: undefined,
            timeObj: undefined,
            employee: undefined,
            assignments: undefined,
            fullname: undefined
          }));
          form.resetFields();
          setForceRerender((prevState) => !prevState);
        }}>
        <Form form={form}>
          <Text>Available shift</Text>
          <Form.Item name={'morning-shift'} valuePropName='checked'>
            <Checkbox
              onChange={(e) => {
                setChooseShift((prevState) => ({ ...prevState, morningShift: e.target.checked }));
              }}>
              Morning shift (9AM-12AM)
            </Checkbox>
          </Form.Item>
          {chooseShift.morningShift ? (
            <Form.Item name={'morning-shift-type'}>
              <Select placeholder={'Select role'}>
                <Select.Option value={AssignmentConst.RECEPTION}>{AssignmentConst.RECEPTION}</Select.Option>
                <Select.Option value={AssignmentConst.INTERVIEWER}>{AssignmentConst.INTERVIEWER}</Select.Option>
              </Select>
            </Form.Item>
          ) : null}

          <Form.Item name={'afternoon-shift'} valuePropName='checked'>
            <Checkbox
              onChange={(e) => {
                setChooseShift((prevState) => ({ ...prevState, afternoonShift: e.target.checked }));
              }}>
              Afternoon shift (12:30AM-17PM)
            </Checkbox>
          </Form.Item>
          {chooseShift.afternoonShift ? (
            <Form.Item name={'afternoon-shift-type'}>
              <Select placeholder={'Select role'}>
                <Select.Option value={AssignmentConst.RECEPTION}>{AssignmentConst.RECEPTION}</Select.Option>
                <Select.Option value={AssignmentConst.INTERVIEWER}>{AssignmentConst.INTERVIEWER}</Select.Option>
              </Select>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
      <div className={'assign-task-container'}>
        <div style={{ display: 'flex', marginBottom: '1rem' }}>
          <Typography.Title level={3}>Assign task</Typography.Title>
          <Button
            style={{ marginLeft: 'auto', display: hasChange ? 'block' : 'none', marginRight: '1rem' }}
            className={'button'}>
            Remove change
          </Button>
          <Button className={'button'} disabled={!hasChange} type={'primary'}>
            Save schedule
          </Button>
        </div>
        {tableData.dataSource === undefined ? (
          <LoadingComponent isWholePage={true} />
        ) : (
          <SideBarComponent
            rightSide={<Table dataSource={tableData.dataSource} columns={tableData.columns} pagination={false} />}
            leftSide={
              <div style={{ padding: '0 1rem 0 0' }}>
                <Typography.Title level={4}>Filter</Typography.Title>
                <Input.Search />
                <Typography.Title level={5}>Role</Typography.Title>
                <Checkbox.Group>
                  <Checkbox value={'all'}>
                    <Badge color={'black'} text={'ALL'} />
                  </Checkbox>
                  <br />
                  <Checkbox value={'INTERVIEWER'}>
                    <Badge color={'#dfdf149e'} text={'INTERVIEWEE'} />
                  </Checkbox>
                  <br />
                  <Checkbox value={'RECEPTION'}>
                    <Badge color={'#02fd02'} text={'RECEPTION'} />
                  </Checkbox>
                  <br />
                </Checkbox.Group>
                <br />

                <Button style={{ marginTop: '1rem' }} className={'button'} type={'primary'}>
                  Search
                </Button>
              </div>
            }
            isOrganizeJobFair={false}
            ratio={1 / 6}
          />
        )}
      </div>
    </>
  );
};
export default AssignTaskContainer;
