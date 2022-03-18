import React, {useEffect, useState} from 'react'
import {Form, notification} from 'antd'
import JobPositionDetailComponent from '../../components/JobPositionDetail/JobPositionDetail.component'
import {useHistory, useLocation} from 'react-router-dom'
import {deleteJobPositionAPI, updateJobPositionAPI} from '../../services/job-controller/JobControllerService'
import {getSuggestionContactName, getSuggestionEmail} from "../../utils/common";
import {SubCategories} from "../../constants/CompanyProfileConstant";
import {SkillTagsConst} from "../../constants/JobPositionConst";

const JobPositionDetailContainer = () => {
  const location = useLocation()
  const jobPosition = location.state.jobPosition
  const [listContactPersonSuggestion, setListContactPersonSuggestion] = useState()
  const [listEmailSuggestion, setListEmailSuggestion] = useState()
  const [resultNameSuggested, setResultNameSuggested] = useState([])
  const [resultEmailSuggested, setResultEmailSuggested] = useState([])


  const handleAutoCompleteContactPerson = value => {
    const res = getSuggestionContactName(listContactPersonSuggestion, value)
    setResultNameSuggested(res)
  }
  const handleAutoCompleteEmail = value => {
    const res = getSuggestionEmail(listEmailSuggestion, value)
    setResultEmailSuggested(res)
  }

  const [form] = Form.useForm()
  const history = useHistory()

  const handleDelete = id => {
    deleteJobPositionAPI(id)
      .then(res => {
        notification['success']({
          message: `Delete job position successfully`
        })
        //after delete success, push back to list page
        history.goBack()
      })
      .catch(err => {
        notification['error']({
          message: `Update job position failed`,
          description: `Error detail: ${err}`
        })
      })
  }

  const onFinish = values => {
    console.log(values)
    const body = {
      ...values,
      skillTagIds: values.skillTagIds.map(item => {
        return SkillTagsConst.find(skill => skill.name === item).id
      }),
      subCategoryIds: values.subCategoryIds?.map(item => {
        return SubCategories.find(sub => sub.label === item)?.value
      })
    }
    updateJobPositionAPI(body, values.id)
      .then(res => {
        notification['success']({
          message: `Update job position successfully`
        })
        //after update success, go back
        history.goBack()
      })
      .catch(err => {
        notification['error']({
          message: `Update job position failed`,
          description: `Error detail: ${err}`
        })
      })
  }

  const init = () => {
    jobPosition['skillTagIds'] = jobPosition['skillTagDTOS']?.map(item => item.name)
    jobPosition['subCategoryIds'] = jobPosition['subCategoryDTOs']?.map(item => item.name)
    jobPosition['preferredLanguage'] = jobPosition['language']
    form.setFieldsValue({...jobPosition})
    setListContactPersonSuggestion(location.state?.listContactPersonSuggestion)
    setListEmailSuggestion(location.state?.listEmailSuggestion)
  }

  useEffect(() => {
    init()
  }, [location])

  return (
    <>
      <JobPositionDetailComponent
        data={jobPosition}
        onFinish={onFinish}
        form={form}
        handleDelete={handleDelete}
        handleAutoCompleteContactPerson={handleAutoCompleteContactPerson}
        handleAutoCompleteEmail={handleAutoCompleteEmail}
        resultNameSuggested={resultNameSuggested}
        resultEmailSuggested={resultEmailSuggested}
      />
    </>
  )
}

export default JobPositionDetailContainer
