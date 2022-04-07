import { PATH_ADMIN } from '../../constants/Paths/Path';
import { Pagination, Space, notification } from 'antd';
import { convertToDateString } from '../../utils/common';
import { getCompanyProfileAPI } from '../../services/company-controller/CompanyControllerService';
import { getRegistrationByJobFairId } from '../../services/company-registration-controller/CompanyRegistrationControllerService';
import { useHistory, useParams } from 'react-router-dom';
import EvaluateBoothInformationTableComponentRefactor from '../../components/EvaluateBoothInformationTable/EvaluateBoothInformationTable.component-refactor';
import React, { useLayoutEffect, useState } from 'react';

const EvaluateBoothInformationTableContainer = () => {
  const [data, setData] = useState([]);
  //paging state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const { jobFairId } = useParams();

  const history = useHistory();

  const fetchData = async () => {
    if (jobFairId !== undefined) {
      getRegistrationByJobFairId(jobFairId, currentPage, pageSize, 'createDate', 'DESC')
        .then(async (res) => {
          const result = await Promise.all(
            res.data.content.map(async (item, index) => {
              const company = await getCompanyProfileAPI(item.companyId);
              return {
                ...item,
                createDate: convertToDateString(item.createDate),
                no: index + 1,
                companyName: company.data.name
              };
            })
          );
          setData([...result]);
          notification['success']({
            message: `All registration has been loaded`,
            description: `with job fair ID: ${jobFairId}`,
            duration: 1
          });
        })
        .catch((err) => {
          notification['error']({
            message: `Not found company registration by job fair ID: ${jobFairId}`,
            description: `${err}`,
            duration: 2
          });
        });
    } else setData([]);
  };

  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleViewDetail = (id) => {
    history.push(PATH_ADMIN.COMPANY_REGISTRATION_DETAIL_PAGE, {
      companyRegistration: data.find((item) => item.id === id)
    });
  };

  return (
    <>
      <EvaluateBoothInformationTableComponentRefactor
        data={data}
        jobFairId={jobFairId}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          render: (text, record) => (
            <Space size='middle'>
              <a
                onClick={() => {
                  handleViewDetail(record.id);
                }}>
                View detail
              </a>
            </Space>
          )
        }}
      />
      <Pagination
        total={data.length}
        onChange={(page, pageSize) => handlePageChange(page, pageSize)}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `Total ${total} items`}
        pageSizeOptions={[5, 10, 15, 20]}
      />
      ,
    </>
  );
};

export default EvaluateBoothInformationTableContainer;
