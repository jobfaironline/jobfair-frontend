import React from 'react';
import { Button, Space } from 'antd';
import { useHistory, generatePath } from 'react-router-dom';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { AssignmentConst } from '../../constants/AssignmentConst';

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
            disabled={
              new Date().setMilliseconds(record?.decorateStartTime) > Date.now() ||
              new Date().setMilliseconds(record?.decorateEndTime) < Date.now()
            }
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
        </Space>
      );
    default:
      return null;
  }
};

export default TaskActionButton;
