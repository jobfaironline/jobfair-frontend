import { Button, Checkbox, Form, notification, Popconfirm, Steps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useForm, useStepsForm } from 'sunflower-antd'
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
import PolicyComponent from '../../components/Policy/Policy.component'
import JobFairDetailCompanyContainer from '../JobFairDetail/JobFairDetail.company.container'
const { Step } = Steps
const JobfairRegistrationForm = () => {
  const { jobfairId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm() //form for registration
  const companyId = useSelector(state => state.authentication.user.companyId)
  const [agreeStatus, setAgreeStatus] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({}) //TODO: check this later with Bao Huynh new code to remove
  const [companyForm] = Form.useForm() //TODO: check this later with Bao Huynh new code to remove

  //management step
  const [currentStep, setCurrentStep] = useState(0)

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

  const onSubmit = async values => {
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
  }

  useEffect(() => {
    getCompanyProfile()
  }, [])

  useEffect(() => {
    //TODO: check this again with Bao Huynh code
    companyForm.setFieldsValue({ ...companyInfo })
  }, [companyInfo, companyForm])

  const stepComponentList = [
    <>
      <div className="jobfair-registration-form-container">
        <JobFairDetailCompanyContainer id={jobfairId} />
      </div>
    </>,
    <>
      <div className="jobfair-registration-form-container">
        <PolicyComponent />
        <Checkbox checked={agreeStatus} onChange={e => setAgreeStatus(e.target.checked)}>
          I have read and accept the Job fair Policy
        </Checkbox>
      </div>
    </>,
    <div className="jobfair-registration-form-container">
      <JobfairRegistrationFormComponent form={form} />
    </div>,
    <>
      <div className="jobfair-registration-form-container">
        <ConfirmContainer data={form.getFieldsValue(true)} companyInfo={companyInfo} />
      </div>
    </>
  ]

  const nextStepButtonActions = step => {
    switch (step) {
      case 3:
        return () => {
          onSubmit(form.getFieldsValue(true))
        }
      case 2:
        return () => {
          form.validateFields().then(res => {
            setCurrentStep(currentStep + 1)
          })
        }
      default:
        return () => setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div>
      <Steps current={currentStep} style={{ marginBottom: '3rem' }}>
        <Step title="Job fair's details" />
        <Step title="Our policy" />
        <Step title="Jobfair registration form" />
        <Step title="Confirm registration" />
      </Steps>
      {stepComponentList[currentStep]}
      <div className="step-buttons">
        <div className="pre-step-button">
          <Form.Item>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                setCurrentStep(currentStep - 1)
              }}
            >
              Prev
            </Button>
          </Form.Item>
        </div>
        <div className="next-step-button">
          <Form.Item>
            <div className="submit-registration-popconfirm">
              {currentStep == 3 ? (
                <Popconfirm
                  title="Are you sure to submit this form?"
                  onConfirm={nextStepButtonActions(currentStep)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="large" type="primary">
                    Register
                  </Button>
                </Popconfirm>
              ) : (
                <Button
                  size="large"
                  type="primary"
                  onClick={nextStepButtonActions(currentStep)}
                  disabled={currentStep == 1 && !agreeStatus}
                >
                  Next
                </Button>
              )}
            </div>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default JobfairRegistrationForm
