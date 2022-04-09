import { Col, Typography } from 'antd';
import { convertEnumToString } from '../../utils/common';
import { getAccountByIdAPI } from '../../services/jobhub-api/AccountControllerService';
import { getLayoutDetail } from '../../services/jobhub-api/LayoutControllerService';
import { mapperJobFairDetail } from '../../utils/mapperJobFairDetail';
import DocumentJobFairDetailComponent from '../../components/customized-components/JobFairDetail/DocumentJobFairDetail.component';
import React, { useEffect, useState } from 'react';

const { Text } = Typography;

const JobFairDetailModalContainer = ({ jobFairId, creatorId, visible, jobFairList }) => {
  const [jobFairDetail, setJobFairDetail] = useState({});
  const [creatorInfo, setCreatorInfo] = useState('');
  const [totalBooth, setTotalBooth] = useState(0);

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

  useEffect(() => {
    fetchData();
    getTotalCompanyRegistrationOfJobFair();
    getTotalBoothOfJobFair();
  }, [visible]);

  const getTotalCompanyRegistrationOfJobFair = async () => {
    //TODO: handle get total company registration
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
      <DocumentJobFairDetailComponent data={data} totalBooth={totalBooth} />
      <Col span={24}>
        <Text strong>Creator Information: </Text>
        <Text italic>{result.creatorInfo}</Text>
      </Col>
    </>
  );
};

export default JobFairDetailModalContainer;
