import { AssignmentConst } from '../../../constants/AssignmentConst';
import moment from 'moment';

//process to calculate datasource for table
//each row of the datasource comprise of employeeId, employee's info, assignments by date
//Ex: [
//  {
//    employeeId: "f996f062-c1d5-4fcc-a13c-8cae1e210d0d",
//    employee: {accountId: ....},
//    'Sat, Jun/4/2022': [{assignment1, assignment2}],
//    'Sun, Jun/5/2022': [{assignment1, assignment2}],
//  }
// ]
export const getDataSource = async (staffAssignments, staffs, dayRange, shiftData) => {
  const dataSource = [];

  for (const [key, value] of Object.entries(staffAssignments)) {
    const result = {
      employeeId: key,
      employee: staffs[key]
    };
    for (const title of Object.keys(dayRange)) result[title] = [];
    for (const [title, time] of Object.entries(dayRange)) {
      const { beginTime, endTime } = time;
      for (const assignment of value) {
        if (assignment.beginTime >= beginTime.valueOf() && assignment.endTime <= endTime.valueOf())
          result[title].push(assignment);
      }
    }
    dataSource.push(result);
  }
  //check for the remaining staffs if they have not yet assigned
  for (const staffId of Object.keys(staffs)) {
    const existedData = dataSource.find((data) => data.employeeId === staffId);
    if (existedData === undefined) {
      const data = {
        employeeId: staffId,
        employee: staffs[staffId]
      };
      for (const title of Object.keys(dayRange)) data[title] = [];
      dataSource.push(data);
    }
  }
  return dataSource
    .map((item) => {
      const { firstname, middlename, lastname } = item.employee.account;
      const fullName = `${firstname} ${middlename ? `${middlename} ` : ''} ${lastname}`;
      return { ...item, fullName, key: item.employee.account.id, shiftData, enabled: true };
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
};

//calculate the job fair public day range
//dayRange is the map with key is the string format of a moment and its start of day and end of day
//Ex: {Sat, Jun/4/2022: {beginTime: Moment, endTime: Moment}}
export const getJobFairPublicDayRange = async (jobFairInfo) => {
  const publicStartTime = moment(jobFairInfo.publicStartTime);
  const publicEndTime = moment(jobFairInfo.publicEndTime);
  let dayRange = [];
  const diff = publicEndTime.diff(publicStartTime, 'days');
  const publicStartBeginTime = publicStartTime.clone().startOf('day');
  for (let i = 0; i <= diff; i++) {
    publicStartBeginTime.add(i, 'days');
    dayRange.push(publicStartBeginTime.clone());
  }
  dayRange = dayRange.reduce((prev, current) => {
    const title = current.format('ddd, MMM/D/YYYY');
    prev[title] = { beginTime: current.clone(), endTime: current.clone().endOf('day') };
    return prev;
  }, {});
  return dayRange;
};

//get employee information and store in map with key is employeeId
//Ex: {123: {accountId:....}}
export const getStaffList = async (assignments) => {
  const staffAssignments = assignments.filter((assignment) =>
    [AssignmentConst.STAFF, AssignmentConst.INTERVIEWER, AssignmentConst.RECEPTION].includes(assignment.type)
  );
  return staffAssignments
    .map((assignment) => assignment.companyEmployee)
    .reduce((prev, employee) => {
      prev[employee.accountId] = employee;
      return prev;
    }, {});
};

//transform staffAssignments from list of assignment to map of assignments based on employeeId
//Ex: {3128aa05-fafa-4790-a8dd-219b6741f9d4: [{assignment1}, {assignment2}]
export const getStaffAssignments = async (assignments, shiftData) => {
  //get staff assignments
  let staffAssignments = assignments.filter((assignment) =>
    [AssignmentConst.STAFF, AssignmentConst.INTERVIEWER, AssignmentConst.RECEPTION].includes(assignment.type)
  );
  //transform staffAssignments from list of assignment to map of assignments based on employeeId
  //Ex: {3128aa05-fafa-4790-a8dd-219b6741f9d4: [{assignment1}, {assignment2}]
  staffAssignments = staffAssignments.reduce((prev, current) => {
    const employeeId = current.companyEmployee.accountId;
    if (prev[employeeId] === undefined) prev[employeeId] = [];
    current.shift = undefined;
    const { beginTime, endTime } = current;
    if (beginTime !== undefined && beginTime !== null) {
      const startOfDate = moment(beginTime).startOf('day');

      for (let i = 0; i < shiftData.length; i++) {
        if (
          beginTime - startOfDate.valueOf() >= shiftData[i].beginTime &&
          endTime - startOfDate.valueOf() <= shiftData[i].endTime
        ) {
          current.shift = i;
          break;
        }
      }
    }

    prev[employeeId].push(current);
    return prev;
  }, {});

  return staffAssignments;
};
