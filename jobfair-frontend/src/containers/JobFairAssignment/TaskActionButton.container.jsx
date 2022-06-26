import { AssignmentConst } from '../../constants/AssignmentConst';
import { Button, Space } from 'antd';
import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../../constants/JobFairConst';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';

const TaskActionButton = ({ type, status, record }) => {
  const history = useHistory();

  switch (type?.toUpperCase()) {
    case AssignmentConst.RECEPTION:
      return (
        <Space>
          <Button
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
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
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
            type='link'
            onClick={() => history.push(generatePath(PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE))}>
            Interview schedule
          </Button>
          <Button
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
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
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
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
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
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
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
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
