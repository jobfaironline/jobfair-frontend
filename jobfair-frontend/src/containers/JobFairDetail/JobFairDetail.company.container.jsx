import { COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType';
import { getJobFairPlanById } from '../../services/job-fair-controller/JobFairConTrollerService';
import { notification } from 'antd';
import JobFairDetailComponent, {
  JobFairDetailForCompany
} from '../../components/customized-components/JobFairDetail/PublicizedJobFairDetail.component';
import React, { useEffect, useState } from 'react';

const JobFairDetailCompanyContainer = (props) => {
  const { id, role } = props;
  const [jobFairDetailData, setJobFairDetailData] = useState();
  const getJobFairDetail = async () => {
    getJobFairPlanById(id)
      .then((res) => {
        setJobFairDetailData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          notification['info']({
            message: `No booth has been assigned for this job fair yet.`
          });
        } else {
          notification['error']({
            message: `Error at get total booth: ${err}`
          });
        }
      });
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
      <JobFairDetailComponent data={jobFairDetailData} role={role} handleDetailForCompany={handleDetailForCompany} />
    </>
  );
};
export default JobFairDetailCompanyContainer;
