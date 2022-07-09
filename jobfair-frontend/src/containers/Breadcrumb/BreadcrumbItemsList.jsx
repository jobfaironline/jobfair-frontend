import { PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';

const breadcrumbItemsList = [
  {
    path: PATH_COMPANY_EMPLOYEE.ASSIGN_BOOTH_MAP_PAGE,
    title: '[Receptionist] - My booth',
    parentPath: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE,
    parentTitle: 'My Assignment'
  },
  {
    path: PATH_COMPANY_EMPLOYEE.INTERVIEW_SCHEDULE,
    title: '[Interviewer] - My interview schedule',
    parentPath: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE,
    parentTitle: 'My Assignment'
  },
  {
    path: PATH_COMPANY_EMPLOYEE.APPLICATION_MANAGEMENT_PAGE,
    title: "[Interviewer] - Booth's job application",
    parentPath: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE,
    parentTitle: 'My Assignment'
  },
  {
    path: PATH_COMPANY_EMPLOYEE.DECORATE_BOOTH_PAGE,
    title: '[Decorator] - Decorate booth',
    parentPath: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE,
    parentTitle: 'My Assignment'
  },
  {
    path: PATH_COMPANY_EMPLOYEE.BOOTH_DESCRIPTION_PAGE,
    title: '[Supervisor] - My booth profile',
    parentPath: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE,
    parentTitle: 'My Assignment'
  },
  {
    path: PATH_COMPANY_EMPLOYEE.ASSIGN_TASK_PAGE,
    title: '[Supervisor] - Assign staff',
    parentPath: PATH_COMPANY_EMPLOYEE.JOB_FAIR_ASSIGNMENT_PAGE,
    parentTitle: 'My Assignment'
  },
  {
    path: PATH_ATTENDANT.RESUME_DETAIL_PAGE,
    title: 'My resume',
    parentPath: PATH_ATTENDANT.RESUME_MANAGEMENT_PAGE,
    parentTitle: 'Resume list'
  },
  {
    path: PATH_ATTENDANT.EDIT_RESUME_PAGE,
    title: ['Edit resume'],
    parentPath: PATH_ATTENDANT.RESUME_DETAIL_PAGE,
    parentTitle: 'My resume',
    hasParam: true,
    paramNames: ['id']
  },
  {
    path: PATH_ATTENDANT.ADD_RESUME_PAGE,
    title: 'New resume',
    parentPath: PATH_ATTENDANT.RESUME_MANAGEMENT_PAGE,
    parentTitle: 'Resume list'
  }
];

export default breadcrumbItemsList;
