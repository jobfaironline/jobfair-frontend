import { getCompanyLayoutAPI } from '../../services/jobhub-api/LayoutControllerService';
import { getTemplateLayoutAPI } from '../../services/jobhub-api/TemplateControllerService';
import React, { useEffect, useState } from 'react';
import SelectJobFairTemplateComponent from '../../components/customized-components/SelectJobFairTemplate/SelectJobFairTemplate.component';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const SelectCompanyTemplateJobFairContainer = ({ handleLoad3DMap, visible, setVisible, isDefaultTemplate }) => {
  const [data, setData] = useState([]);
  const [forceRerenderState, setForceRerenderState] = useState(false);

  const fetchData = async () => {
    let res;
    if (isDefaultTemplate) res = await getTemplateLayoutAPI();
    else res = await getCompanyLayoutAPI();
    setData(res.data);
  };

  const onSubmit = () => {
    setForceRerenderState((prevState) => !prevState);
    setVisible(false);
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, [forceRerenderState]);
  return (
    <div>
      <UploadModalContainer visible={visible} onSubmit={onSubmit} onCancel={onCancel} />
      <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap} />
    </div>
  );
};

export default SelectCompanyTemplateJobFairContainer;
