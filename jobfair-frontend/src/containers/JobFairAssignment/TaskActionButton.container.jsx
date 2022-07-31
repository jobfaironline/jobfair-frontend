import { AssignmentConst } from '../../constants/AssignmentConst';
import { Button, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../../constants/JobFairConst';
import { PATH, PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';

const TaskActionButton = ({ type, status, record }) => {
  const history = useHistory();

  switch (type?.toUpperCase()) {
    case AssignmentConst.RECEPTION:
      return (
        <Space>
          <Button
            style={{ paddingLeft: 0 }}
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
            type='link'
            onClick={() => {
              const url = generatePath(PATH.BOOTH_PAGE, {
                companyBoothId: record.jobFairBooth.id
              });
              history.push(url);
            }}>
            Go to the booth
          </Button>
        </Space>
      );
    case AssignmentConst.INTERVIEWER:
      return (
        <Space>
          <Button
            style={{ paddingLeft: 0 }}
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
            type='link'
            onClick={() => history.push(generatePath(PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE))}>
            Interview schedule
          </Button>
          <Button
            style={{ paddingLeft: 0 }}
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
            type='link'
            onClick={() => history.push(generatePath(PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE))}>
            Application list
          </Button>
        </Space>
      );
    case AssignmentConst.DECORATOR: {
      const isDoneDecorate = record.isDoneDecorate;
      return (
        <Space>
          {status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING ? (
            <Button
              style={{ paddingLeft: 0 }}
              type='link'
              onClick={() =>
                history.push(
                  generatePath(PATH_COMPANY_EMPLOYEE.JOB_FAIR_BOOTH_REVIEW, {
                    boothId: record?.jobFairBoothId
                  })
                )
              }>
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={isDoneDecorate ? 'green' : 'gray'}
                style={{ marginRight: '5px' }}
              />
              See your decoration
            </Button>
          ) : (
            <Button
              style={{ paddingLeft: 0 }}
              type='link'
              onClick={() =>
                history.push(
                  generatePath(PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE, {
                    jobFairId: record?.jobFair?.id,
                    companyBoothId: record?.jobFairBoothId
                  })
                )
              }>
              <FontAwesomeIcon
                icon={faCircleCheck}
                color={isDoneDecorate ? 'green' : 'gray'}
                style={{ marginRight: '5px' }}
              />
              Start decorate booth
            </Button>
          )}
        </Space>
      );
    }
    case AssignmentConst.SUPERVISOR: {
      const isDoneAssignTask = record.boothAssignments.some(
        (assignment) => assignment.type === AssignmentConst.INTERVIEWER || assignment.type === AssignmentConst.RECEPTION
      );
      const isDoneDescription = record.jobFairBooth.boothJobPositions?.length > 0 ?? false;

      return (
        <Space>
          <Button
            style={{ paddingLeft: 0 }}
            type='link'
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
            onClick={() =>
              history.push(
                generatePath(PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE, {
                  assignmentId: record.id
                })
              )
            }>
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={isDoneDescription ? 'green' : 'gray'}
              style={{ marginRight: '5px' }}
            />
            My booth profile
          </Button>
          <Button
            style={{ paddingLeft: 0 }}
            disabled={status !== JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING}
            type='link'
            onClick={() =>
              history.push(
                generatePath(PATH_COMPANY_EMPLOYEE.ASSIGN_TASK_PAGE, {
                  boothId: record?.jobFairBoothId
                })
              )
            }>
            <FontAwesomeIcon
              icon={faCircleCheck}
              color={isDoneAssignTask ? 'green' : 'gray'}
              style={{ marginRight: '5px' }}
            />
            Assign task
          </Button>
        </Space>
      );
    }
    default:
      return null;
  }
};

export default TaskActionButton;
