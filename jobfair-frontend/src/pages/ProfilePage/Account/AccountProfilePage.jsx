import { useSelector } from 'react-redux';
import AttendantProfileFormContainer from '../../../containers/forms/AttendantProfileForm/AttendantProfileForm.container';
import React, { useMemo } from 'react';
import RoleType from '../../../constants/RoleType';

const AccountProfilePage = () => {
  const role = useSelector((state) => state?.authentication?.user?.roles);
  const container = useMemo(() => {
    switch (role) {
      case RoleType.ATTENDANT:
        return <AttendantProfileFormContainer />;
      case RoleType.COMPANY_MANAGER:
      case RoleType.ADMIN:
      case RoleType.COMPANY_EMPLOYEE:
      default:
        return null;
    }
  }, [role]);

  return <div className='page'>{container}</div>;
};

export default AccountProfilePage;
