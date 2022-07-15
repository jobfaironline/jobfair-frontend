import { AssignmentConst } from '../constants/AssignmentConst';
import { NotificationAction } from '../constants/NotificationConstant';
import { PATH_COMPANY_EMPLOYEE } from '../constants/Paths/Path';
import { generatePath } from 'react-router-dom';

export const mapperForNotification = (data) => {
  const notification = JSON.parse(JSON.stringify(data));
  switch (notification.title) {
    case NotificationAction.ASSIGMENT: {
      const assignmentData = JSON.parse(notification.message);
      const assignerFullName = `${assignmentData?.assigner?.account.firstname} ${assignmentData?.assigner?.account.middlename} ${assignmentData?.assigner?.account.lastname}`;

      notification.title = 'You have new assignment';
      notification.message = `You has been assigned to role ${assignmentData.type} by ${assignerFullName}`;
      notification.infoObj = assignmentData;
      switch (assignmentData.type) {
        case AssignmentConst.SUPERVISOR: {
          notification.action = () => {
            window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE, {
              assignmentId: assignmentData.id
            });
          };
          break;
        }
        default:
          notification.action = () => {
            window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE);
          };
      }

      return notification;
    }
    case NotificationAction.APPLICATION: {
      const applicationData = JSON.parse(notification.message);

      notification.title = 'You have new pending application';
      notification.message = `You have a new pending application from ${applicationData.fullName}`;
      notification.action = () => {
        window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE, { id: applicationData.id });
      };
      return notification;
    }
    case NotificationAction.UN_ASSIGNMENT: {
      const assignmentData = JSON.parse(notification.message);
      const assignerFullName = `${assignmentData?.assigner?.account.firstname} ${assignmentData?.assigner?.account.middlename} ${assignmentData?.assigner?.account.lastname}`;

      notification.title = 'You have been unassigned';
      notification.message = `You has been un assigned from role ${assignmentData.type} by ${assignerFullName}`;
      notification.infoObj = assignmentData;
      return notification;
    }
    default:
      return notification;
  }
};
