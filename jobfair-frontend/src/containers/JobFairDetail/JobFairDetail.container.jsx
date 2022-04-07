import { CompanyRegistrationStatus } from '../../constants/CompanyRegistrationConst';
import { evaluateJobFairPlanAPI } from '../../services/job-fair-controller/JobFairConTrollerService';
import { getLayoutDetail } from '../../services/layout-controller/LayoutControllerService';
import { getRegistrationByJobFairId } from '../../services/company-registration-controller/CompanyRegistrationControllerService';
import { notification } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import JobFairDetailComponent from '../../components/JobFairDetail/JobFairDetail.component';
import React, { useEffect, useState } from 'react';

const JobFairDetailContainer = () => {
  const location = useLocation();
  const jobFair = location.state.jobFair;
  const history = useHistory();
  const [totalRegistration, setTotalRegistration] = useState(0);
  const [totalApproval, setTotalApproval] = useState(0);
  const [totalBooth, setTotalBooth] = useState(0);

  const getTotalCompanyRegistrationOfJobFair = async () => {
    if (jobFair !== undefined && jobFair.id !== undefined) {
      //need API for getting company registrations have status APPROVE by jobfairId
      getRegistrationByJobFairId(jobFair.id, 0, 5000, 'createDate', 'DESC')
        .then((res) => {
          const approvalRegistrations = res.data.content.filter(
            (item) => item.status === CompanyRegistrationStatus.APPROVE
          ).length;
          setTotalApproval(approvalRegistrations);
          const totalRegistrations = res.data.totalElements;
          setTotalRegistration(totalRegistrations);
        })
        .catch(() => {
          //
        });
    }
  };

  const getTotalBoothOfJobFair = async () => {
    //get total booth by layoutId
    if (jobFair !== undefined && jobFair.layoutId !== undefined) {
      getLayoutDetail(jobFair.layoutId)
        .then((res) => {
          const totalBooth = res.data.booths.length;
          setTotalBooth(totalBooth);
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
    }
  };

  useEffect(() => {
    getTotalCompanyRegistrationOfJobFair();
    getTotalBoothOfJobFair();
  }, []);

  const onFinish = (values) => {
    evaluateJobFairPlanAPI(values)
      .then(() => {
        notification['success']({
          message: `Your evaluation has been submitted`,
          description: `Evaluate job fair plan successfully`
        });
        history.goBack();
      })
      .catch((err) => {
        notification['error']({
          message: `An error occurred while submitting`,
          description: `Evaluate job fair plan failed - ${err}`
        });
      });
  };
  return (
    <>
      <JobFairDetailComponent
        data={jobFair}
        onFinish={onFinish}
        totalApproval={totalApproval}
        totalRegistration={totalRegistration}
        totalBooth={totalBooth}
      />
    </>
  );
};

export default JobFairDetailContainer;
