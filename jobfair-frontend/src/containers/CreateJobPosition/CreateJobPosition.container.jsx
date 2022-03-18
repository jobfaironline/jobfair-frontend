import React, {useEffect, useState} from 'react'
import CreateJobPositionForm from '../../components/create-job-position-form/CreateJobPositionForm'
import {Button, Form, notification} from 'antd'
import {useHistory, useLocation} from 'react-router-dom'
import {createJobPositionsAPI} from '../../services/job-controller/JobControllerService'
import {getEmployeesAPI} from '../../services/company-employee-controller/CompanyEmployeeControllerService'
import {useSelector} from 'react-redux'
import {getSuggestionContactName, getSuggestionEmail} from "../../utils/common";
import {SkillTagsConst} from "../../constants/JobPositionConst";
import {SubCategories} from "../../constants/CompanyProfileConstant";

const CreateJobPositionContainer = () => {
  const [form] = Form.useForm()

  const history = useHistory()
  const companyId = useSelector(state => state?.authentication?.user?.companyId)
  const location = useLocation()

  const [listContactPersonSuggestion, setListContactPersonSuggestion] = useState()
  const [listEmailSuggestion, setListEmailSuggestion] = useState()
  const [resultNameSuggested, setResultNameSuggested] = useState([])
  const [resultEmailSuggested, setResultEmailSuggested] = useState([])

  useEffect(() => {
    setListContactPersonSuggestion(location.state?.listContactPersonSuggestion)
    setListEmailSuggestion(location.state?.listEmailSuggestion)
  }, [location])

  const handleAutoCompleteContactPerson = value => {
    const res = getSuggestionContactName(listContactPersonSuggestion, value)
    setResultNameSuggested(res)
  }
  const handleAutoCompleteEmail = value => {
    const res = getSuggestionEmail(listEmailSuggestion, value)
    setResultEmailSuggested(res)
  }

  const onFinish = values => {
    const body = {
      ...values,
      skillTagIds: values.skillTagIds.map(item => {
        return SkillTagsConst.find(skill => skill.name === item).id
      }),
      subCategoryIds: values.subCategoryIds?.map(item => {
        return SubCategories.find(sub => sub.label === item)?.value
      }),
      companyId: companyId
    }
    createJobPositionsAPI(body)
      .then(res => {
        notification['success']({
          message: `Create job position data successfully`,
          duration: 2
        })
        form.resetFields()
        history.goBack()
      })
      .catch(e => {
        notification['error']({
          message: `Create job position data failed`,
          description: `Error detail: ${e.response}`
        })
      })
  }
  return <CreateJobPositionForm
    form={form}
    onFinish={onFinish}
    handleAutoCompleteContactPerson={handleAutoCompleteContactPerson}
    handleAutoCompleteEmail={handleAutoCompleteEmail}
    resultNameSuggested={resultNameSuggested}
    resultEmailSuggested={resultEmailSuggested}
  />
}

export default CreateJobPositionContainer
