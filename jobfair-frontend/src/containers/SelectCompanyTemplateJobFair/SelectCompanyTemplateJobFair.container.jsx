import '../../components/customized-components/ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.style.scss';
import { Button } from 'antd';
import { getCompanyLayoutAPI } from '../../services/jobhub-api/LayoutControllerService';
import React, { useEffect, useState } from 'react';
import SelectJobFairTemplateComponent from '../../components/customized-components/SelectJobFairTemplate/SelectJobFairTemplate.component';

const SelectCompanyTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, templateId, setVisible }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await getCompanyLayoutAPI();
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
        <div className={'button-container'}>
          <Button className={'confirm-button'} type='primary' onClick={onHandleNext} disabled={templateId === ''}>
            Choose
          </Button>
          <Button className={'confirm-button'} type='primary' onClick={() => setVisible(true)}>
            Upload template
          </Button>
        </div>
      </SelectJobFairTemplateComponent>
    </div>
  );
};

export default SelectCompanyTemplateJobFairContainer;
