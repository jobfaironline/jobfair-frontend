import AdminRouter from './components/AdminRouter'
import ApprovalRegistrationPage from '../pages/ApprovalRegistrationPage/ApprovalRegistration.page'
import { PATH_ADMIN } from '../constants/Paths/Path'
const AdminRouting = () => {
  return (
    <>
      <AdminRouter
        key=""
        component={() => <ApprovalRegistrationPage />}
        path={PATH_ADMIN.APPROVAL_REGISTRATION_PAGE}
        exact
      />
    </>
  )
}
export default AdminRouting
