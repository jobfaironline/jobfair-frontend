import { getLayoutDetail } from '../../services/jobhub-api/LayoutControllerService';
import { notification } from 'antd';
import { useLocation } from 'react-router-dom';
import JobFairDetailComponent from '../../components/customized-components/JobFairDetail/JobFairDetail.component';
import React, { useEffect, useState } from 'react';

const JobFairDetailContainer = () => {
  const location = useLocation();
  const jobFair = location.state.jobFair;
  const [totalBooth, setTotalBooth] = useState(0);

  const getTotalCompanyRegistrationOfJobFair = async () => {
    //TODO: handle get total company registration
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

  return (
    <>
      <JobFairDetailComponent
        data={jobFair}
        totalApproval={totalApproval}
        totalRegistration={totalRegistration}
        totalBooth={totalBooth}
      />
    </>
  );
};

export default JobFairDetailContainer;
