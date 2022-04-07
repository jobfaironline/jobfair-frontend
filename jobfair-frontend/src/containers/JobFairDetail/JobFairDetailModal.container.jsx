import { Col, Modal, Typography, notification } from 'antd';
import { CompanyRegistrationStatus } from '../../constants/CompanyRegistrationConst';
import { convertEnumToString } from '../../utils/common';
import { evaluateJobFairPlanAPI } from '../../services/jobhub-api/JobFairConTrollerService';
import { getAccountByIdAPI } from '../../services/jobhub-api/AccountControllerService';
import { getLayoutDetail } from '../../services/jobhub-api/LayoutControllerService';
import { getRegistrationByJobFairId } from '../../services/jobhub-api/CompanyRegistrationControllerService';
import { mapperJobFairDetail } from '../../utils/mapperJobFairDetail';
import { useHistory } from 'react-router-dom';
import JobFairDetailComponent from '../../components/customized-components/JobFairDetail/JobFairDetail.component';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

const JobFairDetailModalContainer = ({ jobFairId, creatorId, visible, setModalVisible, jobFairList }) => {
  const [jobFairDetail, setJobFairDetail] = useState({});
  const [creatorInfo, setCreatorInfo] = useState('');
  const [totalApproval, setTotalApproval] = useState(0);
  const [totalRegistration, setTotalRegistration] = useState(0);
  const [totalBooth, setTotalBooth] = useState(0);
  const history = useHistory();

  const fetchData = async () => {
    if (jobFairList !== undefined && jobFairId !== undefined && jobFairList.length > 0) {
      const jobFair = jobFairList.find((item) => item.id === jobFairId);
      setJobFairDetail(jobFair);
      //get creator name by creatorId
      getAccountByIdAPI(creatorId)
        .then((res) => {
          setCreatorInfo(
            `Full name: ${res.data.firstname} ${res.data.middlename} ${res.data.lastname}. Role: ${convertEnumToString(
              res.data.role
            )}`
          );
        })
        .catch(() => {
          //
        });
    }
  };

  const onOk = () => {
    setModalVisible(false);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchData();
    getTotalCompanyRegistrationOfJobFair();
    getTotalBoothOfJobFair();
  }, [visible]);

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

  const getTotalCompanyRegistrationOfJobFair = async () => {
    if (jobFairId !== undefined) {
      //need API for getting company registrations have status APPROVE by jobfairId
      getRegistrationByJobFairId(jobFairId, 0, 5000, 'createDate', 'DESC')
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
    if (jobFairDetail !== null && jobFairDetail.layoutId !== undefined) {
      getLayoutDetail(jobFairDetail.layoutId)
        .then((res) => {
          const totalBooth = res.data.booths.length;
          setTotalBooth(totalBooth);
        })
        // eslint-disable-next-line no-empty-function
        .catch(() => {});
    }
  };

  const data = mapperJobFairDetail(jobFairDetail, creatorInfo);
  const { ...result } = data ? data : {};

  return !visible ? null : (
    <>
      <Modal title='Job Fair Detail' visible={visible} onOk={onOk} onCancel={onCancel} width={1300}>
        <JobFairDetailComponent
          data={data}
          onFinish={onFinish}
          totalRegistration={totalRegistration}
          totalBooth={totalBooth}
          totalApproval={totalApproval}
        />
        <Col span={24}>
          <Text strong>Creator Information: </Text>
          <Text italic>{result.creatorInfo}</Text>
        </Col>
      </Modal>
    </>
  );
};

export default JobFairDetailModalContainer;
