import {Button, Checkbox, Form, notification, Popconfirm, Steps} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {getCompanyProfileAPI} from '../../services/company-controller/CompanyControllerService'
import ConfirmContainer from '../Confirm/Confirm.container'
import JobfairRegistrationFormComponent
  from '../../components/JobfairRegistrationForm/JobfairRegistrationForm.component'
import {PATH} from '../../constants/Paths/Path'
import PolicyComponent from '../../components/Policy/Policy.component'
import JobFairDetailCompanyContainer from '../JobFairDetail/JobFairDetail.company.container'
import {
  createDraftRegistrationAPI,
  submitRegistrationAPI
} from '../../services/company-registration-controller/CompanyRegistrationControllerService'

const {Step} = Steps
const JobfairRegistrationForm = () => {
  const {jobfairId} = useParams()
  const history = useHistory()
  const [form] = Form.useForm() //form for registration
  const companyId = useSelector(state => state.authentication.user.companyId)
  const [agreeStatus, setAgreeStatus] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({})

  //management step
  const [currentStep, setCurrentStep] = useState(0)

  //total job position
  const [_, rerender] = useState()

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
    const companyRegistrationId = await onCreateDraft(body)
    if (companyRegistrationId) {
      await submitRegistration(
        companyRegistrationId,
        () => {
          history.push(PATH.RESULT_SUCCESS_PAGE)
        },
        () => history.push(PATH.PROCESSED_FAIL)
      )
    }
  }

  const stepComponentList = [
    <>
      <div style={{width: '70%', margin: '3rem auto'}}>
        <JobFairDetailCompanyContainer id={jobfairId}/>
      </div>
    </>,
    <>
      <PolicyComponent/>
      <Checkbox checked={agreeStatus} onChange={e => setAgreeStatus(e.target.checked)}>
        I have read and accept the Job fair Policy
      </Checkbox>
    </>,
    <JobfairRegistrationFormComponent form={form} jobFairId={jobfairId} rerender={rerender}/>,
    <>
      <ConfirmContainer data={form.getFieldsValue(true)} companyInfo={companyInfo}/>
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
          form
            .validateFields()
            .then(res => {
              setCurrentStep(currentStep + 1)
            })
            .catch(err => {
              const errorsArray = form.getFieldsError()
              for (const error of errorsArray) {
                if (error.errors.length > 0) {
                  form.scrollToField(error.name, {behavior: 'smooth', block: 'center'})
                  break
                }
              }
            })
        }
      default:
        return () => setCurrentStep(currentStep + 1)
    }
  }

  useEffect(() => {
    getCompanyProfile(companyId, setCompanyInfo)
  }, [])



  return (
    <div>
      <div className="jobfair-registration-form-container" style={{background: '#FFF'}}>
        <Steps
          current={currentStep}
          style={{
            marginBottom: '3rem',
            position: 'sticky',
            top: '80px',
            background: '#FFF',
            zIndex: '1000',
            padding: '1rem'
          }}
        >
          <Step title="Job fair's details"/>
          <Step title="Our policy"/>
          <Step title="Jobfair registration form"/>
          <Step title="Confirm registration"/>
        </Steps>
        {stepComponentList[currentStep]}
        <div className="step-buttons">
          {currentStep != 0 ? (
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
          ) : null}
          <div className="next-step-button">
            <Form.Item>
              <div className="submit-registration-popconfirm">
                {currentStep == 3 ? ( //current step = 3 => show pop up to confirm
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
                ) : ( //else current step = 1 or 2
                  (currentStep == 1 && !agreeStatus) ? //current step = 1 and agreeStatus is unchecked
                    <Button
                      size="large"
                      type="primary"
                      onClick={nextStepButtonActions(currentStep)}
                      disabled={true}
                      style={{
                        color: '#00000040',
                        borderColor: '#d9d9d9',
                        background: '#f5f5f5',
                        textShadow: 'none',
                        boxShadow: 'none'
                      }}
                    >
                      Next
                    </Button> : //else current step = 2
                    (
                      (currentStep == 2 && (form.getFieldsValue().jobPositions === undefined || form.getFieldsValue().jobPositions?.length === 0)) ? //current step = 2 and total job position = 0
                        <Button
                          size="large"
                          type="primary"
                          onClick={nextStepButtonActions(currentStep)}
                          disabled={true}
                          style={{
                            color: '#00000040',
                            borderColor: '#d9d9d9',
                            background: '#f5f5f5',
                            textShadow: 'none',
                            boxShadow: 'none'
                          }}
                        >
                          Next
                        </Button>
                        : <Button //else all conditions are passed
                          size="large"
                          type="primary"
                          onClick={nextStepButtonActions(currentStep)}
                        >
                          Next
                        </Button>
                    )
                )}
              </div>
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  )
}

const getCompanyProfile = async (companyId, setCompanyInfo) => {
  getCompanyProfileAPI(companyId)
    .then(res => {
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
      setCompanyInfo({...response})
    })
    .catch(() => {
      notification['error']({
        message: `Fetch company profile failed`,
        description: `Failed for company with ${companyId}`,
        duration: 2
      })
    })
}

const submitRegistration = async (companyRegistrationId, successCallback, failedCallback) => {
  try {
    const res = await submitRegistrationAPI(companyRegistrationId)
    // notification['success']({
    //   message: `Registration draft version has been submitted`,
    //   description: `Submitted successfully`,
    //   duration: 2
    // })
    successCallback()
  } catch (err) {
    notification['error']({
      message: `An error has occurred while create draft`,
      description: `Create draft failed. Server response: ${err}`,
      duration: 2
    })
    failedCallback()
  }
}

const onCreateDraft = async body => {
  try {
    const res = await createDraftRegistrationAPI(body)
    // notification['success']({
    //   message: `Registration draft version has been created`,
    //   description: `Created draft successfully`,
    //   duration: 2
    // })
    return res.data.companyRegistrationId
  } catch (err) {
    notification['error']({
      message: `An error has occurred while create draft`,
      description: `Create draft failed. Server response: ${err}`,
      duration: 2
    })
  }
}

export default JobfairRegistrationForm
