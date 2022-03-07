import { Button, Form, notification, Popconfirm, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useStepsForm } from 'sunflower-antd'
import CompanyProfileForm from '../../components/company-profile-form/CompanyProfileForm.component'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createDraftRegistration } from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-action'
import { getCompanyProfileAPI } from '../../services/company-controller/CompanyControllerService'
import TextArea from 'antd/es/input/TextArea'
import { CompanyProfileValidation } from '../../validate/CompanyProfileValidation'
import ConfirmContainer from '../Confirm/Confirm.container'
import JobfairRegistrationFormComponent from '../../components/JobfairRegistrationForm/JobfairRegistrationForm.component'
import { PATH } from '../../constants/Paths/Path'
import { setFormBody } from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
const { Step } = Steps
const JobfairRegistrationForm = () => {
  //please pass this form into component or USE REDUX TO STORE FORM HOOK

  const { jobfairId } = useParams()
  const dispatch = useDispatch()
  const companyId = useSelector(state => state.authentication.user.companyId)
  const [companyInfo, setCompanyInfo] = useState({})
  const [companyForm] = Form.useForm()
  const [pickJobForm] = Form.useForm()
  const history = useHistory()

  const getCompanyProfile = async () => {
    getCompanyProfileAPI(companyId)
      .then(res => {
        notification['success']({
          message: `Fetch company profile successfully`,
          description: `For company with ${companyId}`,
          duration: 2
        })
        const response = {
          ...res.data,
          benefits: res.data.companyBenefitDTOS.map(item => {
            return {
              ...item,
              id: item.benefitDTO.id,
              description: item.benefitDTO.description
            }
          }),
          mediaUrls: res.data.mediaDTOS,
          subCategoriesIds: res.data.subCategoryDTOs.map(item => item.id),
          url: res.data.websiteUrl
        }
        setCompanyInfo({ ...response })
      })
      .catch(() => {
        notification['error']({
          message: `Fetch company profile failed`,
          description: `Failed for company with ${companyId}`,
          duration: 2
        })
      })
  }

  useEffect(() => {
    getCompanyProfile()
  }, [])

  useEffect(() => {
    companyForm.setFieldsValue({ ...companyInfo })
  }, [companyInfo, companyForm])

  const { form, current, gotoStep, stepsProps, formProps, submit, formLoading } = useStepsForm({
    async submit(values) {
      const body = {
        description: values.description,
        jobFairId: jobfairId,
        jobPositions: values.jobPositions.map(item => {
          const result = {
            jobPositionId: item.id,
            maxSalary: item.maxSalary,
            minSalary: item.minSalary,
            numOfPosition: item.numberOfPosition
          }
          return result
        })
      }
      try {
        await dispatch(createDraftRegistration(body)).unwrap()
        notification['success']({
          message: `Registration draft version has been submitted`,
          description: `Submitted successfully`,
          duration: 2
        })
        //after submit success, push to success page
        history.push(PATH.PROCESSED_SUCCESS)
      } catch (err) {
        notification['error']({
          message: `An error has occurred while submitting`,
          description: `Submit failed. Server response: ${err}`,
          duration: 2
        })
        //else push to error page
        history.push(PATH.PROCESSED_FAIL)
      }
    },
    total: 2
    // total: 3
  })

  const onFinish = values => {}

  const formList = [
    <JobfairRegistrationFormComponent
      form={form}
      onPickJobFinish={onFinish}
      nextStep={() => {
        gotoStep(current + 1)
        dispatch(setFormBody(form.getFieldsValue()))
      }}
      preStep={() => gotoStep(current - 1)}
    />,
    <>
      <ConfirmContainer data={form.getFieldsValue(true)} companyInfo={companyInfo} />
      <div className="step-buttons">
        <div className="pre-step-button">
          <Form.Item>
            <Button size="large" type="primary" onClick={() => gotoStep(current - 1)}>
              Prev
            </Button>
          </Form.Item>
        </div>
        <div className="next-step-button">
          <Form.Item>
            <div className="submit-registration-popconfirm">
              <Popconfirm
                title="Are you sure to submit this form?"
                onConfirm={() => {
                  submit().then(result => {
                    if (result === 'ok') {
                      gotoStep(current + 1)
                    }
                  })
                }}
                okText="Yes"
                cancelText="No"
              >
                <Button size="large" type="primary" loading={formLoading}>
                  Submit
                </Button>
              </Popconfirm>
            </div>
          </Form.Item>
        </div>
      </div>
    </>
  ]

  const onChange = values => {}

  return (
    <div>
      <Steps {...stepsProps}>
        {/* <Step title="Confirm company profile" /> */}
        <Step title="Jobfair registration form" />
        <Step title="Confirm registration" />
      </Steps>

      <div style={{ marginTop: 60 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={submit}
          onValuesChange={e => onChange(e)}
          requiredMark="required"
          autoComplete="off"
        >
          {formList[current]}
        </Form>
      </div>
    </div>
  )
}

export default JobfairRegistrationForm
