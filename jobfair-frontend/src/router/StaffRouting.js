import StaffRouter from './components/StaffRouter'
import { PATH_STAFF } from '../constants/Paths/Path'
const StaffRouting = () => {
  return (
    <>
      <StaffRouter
        key=""
        component={() => <ApprovalRegistrationPage />}
        path={PATH_STAFF.APPROVAL_REGISTRATION_PAGE}
        exact
      />
    </>
  )
}
export default StaffRouting
