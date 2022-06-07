import { CompanyProfile } from '../../components/customized-components/CompanyProfile/CompanyProfile.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { getCompanyProfileAPI } from '../../services/jobhub-api/CompanyControllerService';
import { mapCompanyProfileFromAPIResponse } from '../../utils/mapperCompanyProfile';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const CompanyProfileContainer = () => {
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const data = (await getCompanyProfileAPI(companyId)).data;
      setData(mapCompanyProfileFromAPIResponse(data));
    } catch (e) {
      notification['error']({
        message: `Fetch company profile failed`,
        description: `Failed for company with ${companyId}`
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data) return <CompanyProfile data={data} />;

  return <LoadingComponent isWholePage={true} />;
};
