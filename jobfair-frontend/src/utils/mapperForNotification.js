import { AssignmentConst } from '../constants/AssignmentConst';
import { NotificationAction } from '../constants/NotificationConstant';
import { PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../constants/Paths/Path';
import { generatePath } from 'react-router-dom';
import RoleType from '../constants/RoleType';
import moment from 'moment';
import store from '../redux-flow';

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
        case AssignmentConst.DECORATOR: {
          const jobFairBoothId = assignmentData.jobFairBooth.id;
          const jobFairId = assignmentData.jobFairBooth.jobFair.id;
          notification.action = () => {
            window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE, {
              jobFairId,
              companyBoothId: jobFairBoothId
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
    case NotificationAction.WARNING_TASK_MANAGER: {
      try {
        const assignmentData = JSON.parse(notification.message);
        const { endTime, jobFairId } = assignmentData;
        const fromNow = moment(parseInt(endTime)).fromNow();
        notification.title = 'Incomplete job fair tasks';

        notification.message = (
          <>
            <p style={{ marginBottom: 0 }}>
              A job fair is about to be public <strong>{fromNow}</strong>. Click to check.
            </p>
          </>
        );
        notification.infoObj = assignmentData;
        notification.action = () => {
          window.location.href = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, {
            jobFairId
          });
        };
      } catch (e) {
        //ignore
      }
      break;
    }
    case NotificationAction.WARNING_TASK_SUPERVISOR_ASSIGN: {
      try {
        const assignmentData = JSON.parse(notification.message);
        const { endTime, jobFairBoothId } = assignmentData;
        const fromNow = moment(parseInt(endTime)).fromNow();
        notification.title = 'Incomplete job fair tasks';

        notification.message = (
          <>
            <p style={{ marginBottom: 0 }}>
              You need to assign staff for your booth <strong>{fromNow}</strong>. Click to assign now.
            </p>
          </>
        );
        notification.infoObj = assignmentData;
        notification.action = () => {
          window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.ASSIGN_TASK_PAGE, {
            boothId: jobFairBoothId
          });
        };
      } catch (e) {
        //ignore
      }
      break;
    }
    case NotificationAction.WARNING_TASK_SUPERVISOR_PROFILE: {
      try {
        const assignmentData = JSON.parse(notification.message);
        const { endTime, assignmentId } = assignmentData;
        const fromNow = moment(parseInt(endTime)).fromNow();
        notification.title = 'Incomplete job fair tasks';

        notification.message = (
          <>
            <p style={{ marginBottom: 0 }}>
              You need to describe your booth <strong>{fromNow}</strong>. Click to describe now.
            </p>
          </>
        );
        notification.infoObj = assignmentData;
        notification.action = () => {
          window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE, {
            assignmentId
          });
        };
      } catch (e) {
        //ignore
      }
      break;
    }
    case NotificationAction.WARNING_TASK_DECORATOR: {
      try {
        const assignmentData = JSON.parse(notification.message);
        const { endTime, jobFairId, jobFairBoothId } = assignmentData;
        const fromNow = moment(parseInt(endTime)).fromNow();
        notification.title = 'Incomplete decorate tasks';

        notification.message = (
          <>
            <p style={{ marginBottom: 0 }}>
              You need to decorate a booth <strong>{fromNow}</strong>. Click to decorate now.
            </p>
          </>
        );
        notification.infoObj = assignmentData;
        notification.action = () => {
          window.location.href = generatePath(PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE, {
            jobFairId,
            companyBoothId: jobFairBoothId
          });
        };
      } catch (e) {
        //ignore
      }
      break;
    }
    case NotificationAction.WARNING_INTERVIEW: {
      try {
        notification.title = 'Up comming interview schedule';

        notification.message = 'You have an up comming interview. Check your schedule now!';
        notification.action = () => {
          const { authentication } = store.getState();
          const role = authentication.user.roles;
          window.location.href =
            role === RoleType.COMPANY_EMPLOYEE
              ? generatePath(PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE)
              : generatePath(PATH_ATTENDANT.INTERVIEW_SCHEDULE);
        };
      } catch (e) {
        //ignore
      }
      break;
    }
    default:
      return notification;
  }
  return notification;
};
