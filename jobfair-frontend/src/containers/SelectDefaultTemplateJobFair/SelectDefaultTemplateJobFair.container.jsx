import '../../components/customized-components/ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.style.scss';
import { Button } from 'antd';
import { getTemplateLayoutAPI } from '../../services/jobhub-api/TemplateControllerService';
import React, { useEffect, useState } from 'react';
import SelectJobFairTemplateComponent from '../../components/customized-components/SelectJobFairTemplate/SelectJobFairTemplate.component';

const SelectDefaultTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, templateId }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await getTemplateLayoutAPI();
    setData(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
      <div className={'button-container'}>
        <Button className={'confirm-button'} type='primary' onClick={onHandleNext} disabled={templateId === ''}>
          Choose
        </Button>
      </div>
    </SelectJobFairTemplateComponent>
  );
};

export default SelectDefaultTemplateJobFairContainer;
