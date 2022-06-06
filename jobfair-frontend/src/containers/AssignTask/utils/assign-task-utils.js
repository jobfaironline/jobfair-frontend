export const getAssignmentsData = async (oldDataSource, newDataSource, dayRange) => {
  //compare oldDataSource and newDataSource
  const newAssignments = [];
  const deletedAssignments = [];
  const updatedAssignments = [];

  for (let i = 0; i < oldDataSource.length; i++) {
    const oldData = oldDataSource[i];
    const newData = newDataSource[i];
    for (const date of Object.keys(dayRange)) {
      //find new or updated assignment
      for (const newAssignment of newData[date]) {
        if (newAssignment.id === null) {
          newAssignments.push(newAssignment);
          continue;
        }
        const oldAssigment = oldData[date].find((assignment) => assignment.id === newAssignment.id);
        if (
          oldAssigment.type !== newAssignment.type ||
          oldAssigment.beginTime !== newAssignment.beginTime ||
          oldAssigment.endTime !== newAssignment.endTime
        )
          updatedAssignments.push(newAssignment);
      }
      //find deleted assignment
      for (const oldAssigment of oldData[date]) {
        const index = newData[date].findIndex((assignment) => assignment.id === oldAssigment.id);
        if (index === -1) deletedAssignments.push(oldAssigment);
      }
    }
  }
  return [newAssignments, deletedAssignments, updatedAssignments];
};
