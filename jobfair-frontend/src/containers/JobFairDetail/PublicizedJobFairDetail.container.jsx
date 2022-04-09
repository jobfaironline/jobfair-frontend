import { COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType';
import PublicizedJobFairDetailComponent, {
  JobFairDetailForCompany
} from '../../components/customized-components/JobFairDetail/PublicizedJobFairDetail.component';
import React, { useEffect, useState } from 'react';

const PublicizedJobFairDetailContainer = (props) => {
  //TODO: not used props
  // eslint-disable-next-line no-unused-vars
  const { id, role } = props;
  //TODO: not used state
  // eslint-disable-next-line no-unused-vars
  const [jobFairDetailData, setJobFairDetailData] = useState();
  const getJobFairDetail = async () => {
    //TODO: implement call API later
    // getJobFairPlanById(id)
    //   .then((res) => {
    //     setJobFairDetailData(res.data);
    //   })
    //   .catch((err) => {
    //     if (err.response.status === 404) {
    //       notification['info']({
    //         message: `No booth has been assigned for this job fair yet.`
    //       });
    //     } else {
    //       notification['error']({
    //         message: `Error at get total booth: ${err}`
    //       });
    //     }
    //   });
  };
  useEffect(() => {
    getJobFairDetail();
  }, []);

  const handleDetailForCompany = (role, data) => {
    switch (role) {
      case COMPANY_MANAGER:
      case COMPANY_EMPLOYEE:
        return <JobFairDetailForCompany data={data} />;
      default:
        return null;
    }
  };
  return (
    <>
      <PublicizedJobFairDetailComponent
        data={jobFairDetailData}
        role={role}
        handleDetailForCompany={handleDetailForCompany}
      />
    </>
  );
};
export default PublicizedJobFairDetailContainer;
