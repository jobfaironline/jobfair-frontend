import { CompanyEmployeeProfileFormContainer } from '../../../containers/forms/ProfileForm/CompanyEmployeeProfileForm/CompanyEmployeeProfileForm.container';
import { useSelector } from 'react-redux';
import AttendantProfileFormContainer from '../../../containers/forms/ProfileForm/AttendantProfileForm/AttendantProfileForm.container';
import React, { useMemo } from 'react';
import RoleType from '../../../constants/RoleType';

const AccountProfilePage = () => {
  const role = useSelector((state) => state?.authentication?.user?.roles);
  const container = useMemo(() => {
    switch (role) {
      case RoleType.ATTENDANT:
        return <AttendantProfileFormContainer />;
      case RoleType.COMPANY_MANAGER:
      case RoleType.COMPANY_EMPLOYEE:
        return <CompanyEmployeeProfileFormContainer />;
      case RoleType.ADMIN:
      default:
        return null;
    }
  }, [role]);

  return <div className='page'>{container}</div>;
};

export default AccountProfilePage;
