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
      notification.message = `You has been assigned to a ${assignmentData.type} type by ${assignerFullName}`;
      notification.infoObj = assignmentData;
      notification.action = () => {
        const url = generatePath(PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE, {
          assignmentId: assignmentData.id
        });
        window.location.href = url;
      };
      return notification;
    }
    default:
      return notification;
  }
};
