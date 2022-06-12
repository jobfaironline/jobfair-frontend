import { AssignmentConst } from '../../constants/AssignmentConst';
import { Button, Space } from 'antd';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

const TaskActionButton = ({ type, record }) => {
  const history = useHistory();

  switch (type?.toUpperCase()) {
    case AssignmentConst.RECEPTION:
      return (
        <Space>
          <Button
            disabled={
              new Date().setMilliseconds(record?.publicStartTime) > Date.now() ||
              new Date().setMilliseconds(record?.publicEndTime) < Date.now()
            }
            type='link'
            onClick={() =>
              history.push(
                generatePath(PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE, {
                  assignmentId: record.id
                })
              )
            }>
            Go to the booth
          </Button>
        </Space>
      );
    case AssignmentConst.INTERVIEWER:
      return (
        <Space>
          <Button
            disabled={
              new Date().setMilliseconds(record?.publicStartTime) > Date.now() ||
              new Date().setMilliseconds(record?.publicEndTime) < Date.now()
            }
            type='link'
            onClick={() => history.push(generatePath(PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE))}>
            Interview schedule
          </Button>
          <Button
            disabled={
              new Date().setMilliseconds(record?.publicStartTime) > Date.now() ||
              new Date().setMilliseconds(record?.publicEndTime) < Date.now()
            }
            type='link'
            onClick={() => history.push(generatePath(PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE))}>
            Application list
          </Button>
        </Space>
      );
    case AssignmentConst.DECORATOR:
      return (
        <Space>
          <Button
            type='link'
            disabled={record?.decorateStartTime > moment().valueOf() || record?.decorateEndTime < moment().valueOf()}
            onClick={() =>
              history.push(
                generatePath(PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE, {
                  jobFairId: record?.jobFair?.id,
                  companyBoothId: record?.jobFairBoothId
                })
              )
            }>
            Start decorate booth
          </Button>
        </Space>
      );
    case AssignmentConst.SUPERVISOR:
      return (
        <Space>
          <Button
            type='link'
            onClick={() =>
              history.push(
                generatePath(PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE, {
                  assignmentId: record.id
                })
              )
            }>
            My booth profile
          </Button>
          <Button
            type='link'
            onClick={() =>
              history.push(
                generatePath(PATH_COMPANY_EMPLOYEE.ASSIGN_TASK_PAGE, {
                  boothId: record?.jobFairBoothId
                })
              )
            }>
            Assign task
          </Button>
        </Space>
      );
    default:
      return null;
  }
};

export default TaskActionButton;
