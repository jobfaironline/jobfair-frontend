import { Button, Form, notification, Popconfirm, Steps } from 'antd'
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
const { Step } = Steps
const JobfairRegistrationForm = () => {
  const { jobfairId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm() //form for registration
  const companyId = useSelector(state => state.authentication.user.companyId)
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

  return (
    <div>
      <Steps current={currentStep}>
        <Step title="Jobfair registration form" />
        <Step title="Confirm registration" />
      </Steps>

      <div style={{ marginTop: 60 }}>
        <div style={{ display: currentStep == 0 ? 'block' : 'none' }}>
          <JobfairRegistrationFormComponent
            form={form}
            nextStep={() => {
              form.validateFields().then(res => {
                setCurrentStep(currentStep + 1)
              })
            }}
          />
        </div>
        {currentStep == 1 ? (
          <div style={{ display: currentStep == 1 ? 'block' : 'none' }}>
            <ConfirmContainer data={form.getFieldsValue(true)} companyInfo={companyInfo} />
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
                    <Popconfirm
                      title="Are you sure to submit this form?"
                      onConfirm={() => {
                        onSubmit(form.getFieldsValue(true))
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button size="large" type="primary">
                        Submit
                      </Button>
                    </Popconfirm>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default JobfairRegistrationForm
