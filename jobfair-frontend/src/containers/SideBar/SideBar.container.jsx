import { getCompanyBoothById } from '../../services/company-booth-controller/CompanyBoothControllerService';
import { getCompanyProfileAPI } from '../../services/company-controller/CompanyControllerService';
import { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar/SideBar.component';
import styles from '../../pages/AttendantJobFairPage/AttendantJobFairPage.module.scss';

export const SideBarContainer = (props) => {
  const { companyBoothId, handleOpenDetail, isShow, activeKey, openInventory } = props;
  const [state, setState] = useState({
    companyInformation: undefined,
    jobPositions: []
  });

  const fetchData = async () => {
    let response = await getCompanyBoothById(companyBoothId);
    const companyId = response.data.order.companyRegistration.companyId;
    const jobPositions = response.data.order.companyRegistration.registrationJobPositions;
    response = await getCompanyProfileAPI(companyId);
    setState((prevState) => ({
      ...prevState,
      companyInformation: response.data,
      jobPositions
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (state.companyInformation === undefined) return null;

  const sideBarProps = {
    companyInformation: state.companyInformation,
    jobPositions: state.jobPositions,
    isShow,
    handleOpenDetail,
    activeKey,
    openInventory
  };

  return (
    <div className={styles.sideBar}>
      <SideBar {...sideBarProps} />
    </div>
  );
};
