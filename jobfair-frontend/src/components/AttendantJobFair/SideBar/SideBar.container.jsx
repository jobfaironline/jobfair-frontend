import { useEffect, useState } from 'react'
import SideBar from './SideBar.component'
import styles from '../../../pages/AttendantJobFairPage/AttendantJobFairPage.module.scss'
import { getCompanyBoothById } from '../../../services/company-booth-controller/CompanyBoothControllerService'
import { getCompanyProfileAPI } from '../../../services/company-controller/CompanyControllerService'

export const SideBarContainer = props => {
  const { companyBoothId, handleOpenDetail, isShow, activeKey, openInventory } = props
  const [state, setState] = useState({
    companyInformation: undefined,
    jobPositions: []
  })

  const fetchData = async () => {
    let response = await getCompanyBoothById(companyBoothId)
    const companyId = response.data.order.companyRegistration.companyId
    const jobPositions = response.data.order.companyRegistration.registrationJobPositions
    response = await getCompanyProfileAPI(companyId)
    setState(prevState => {
      return {
        ...prevState,
        companyInformation: response.data,
        jobPositions: jobPositions
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (state.companyInformation === undefined) return null

  const sideBarProps = {
    companyInformation: state.companyInformation,
    jobPositions: state.jobPositions,
    isShow,
    handleOpenDetail,
    activeKey,
    openInventory
  }

  return (
    <div className={styles.sideBar}>
      <SideBar {...sideBarProps} />
    </div>
  )
}
