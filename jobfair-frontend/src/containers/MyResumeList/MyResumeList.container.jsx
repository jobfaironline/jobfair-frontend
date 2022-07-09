import { Divider, Input, Select } from 'antd';
import { PATH_ATTENDANT } from '../../constants/Paths/Path';
import { SearchCategories, SearchSubCategories } from '../../constants/CompanyProfileConstant';
import { generatePath, useHistory } from 'react-router-dom';
import { getAttendantCv } from '../../services/jobhub-api/CvControllerService';
import { getCountryOrder } from '../../utils/common';
import React, { useEffect, useState } from 'react';
import ResumeGridComponent from '../../components/customized-components/ResumeGrid/ResumeGrid.component';

const { Search } = Input;
const { OptGroup, Option } = Select;
const MyResumeListContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  useEffect(async () => {
    const res = await getAttendantCv();
    let content = [];
    if (res.status === 200) content = res.data;

    content.unshift({ isFirst: true });
    setData(content);
  }, []);

  // eslint-disable-next-line no-empty-function
  const handleAddCv = () => {};

  const handleViewCvDetail = (resumeId) => {
    const url = generatePath(PATH_ATTENDANT.RESUME_DETAIL_PAGE, { id: resumeId });
    history.push(url);
  };

  // eslint-disable-next-line no-empty-function
  const handleDeleteCv = () => {};

  return (
    <div className={'job-fair-grid-public-container'}>
      <div className={'header'}>
        <Search
          placeholder='Search by job fair name'
          // onSearch={(value) => handleOnSearch(value)}
          style={{ width: '30rem', marginRight: '5rem' }}
        />
        <Select
          style={{ width: '20rem' }}
          showSearch
          allowClear
          placeholder={'Filter by category'}
          // onChange={(value) => filterJobFair('category', value)}
          // onClear={() => filterJobFair('category', '')}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
            </>
          )}>
          {SearchCategories.map((category) => (
            <OptGroup label={category.label}>
              {SearchSubCategories.filter((item) => item.category_id === category.value).map((item) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </OptGroup>
          ))}
        </Select>
        <Select
          showSearch
          allowClear
          placeholder='Filter by country'
          //TODO: wait for implement company location
          style={{ width: 200, display: 'none' }}
          // onChange={(value) => filterJobFair('country', value)}
          // onClear={() => filterJobFair('country', '')}
        >
          {getCountryOrder().map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </div>
      <ResumeGridComponent
        data={data}
        onAddCv={handleAddCv}
        handleViewCvDetail={handleViewCvDetail}
        handleDeleteCv={handleDeleteCv}
      />
    </div>
  );
};

export default MyResumeListContainer;
