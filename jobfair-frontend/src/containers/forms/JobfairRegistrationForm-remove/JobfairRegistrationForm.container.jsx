/* eslint-disable no-unused-vars */
import { Button, Checkbox, Form, Popconfirm, Steps, notification } from 'antd';
import { PATH } from '../../../constants/Paths/Path';
import {
  createDraftRegistrationAPI,
  submitRegistrationAPI
} from '../../../services/jobhub-api/CompanyRegistrationControllerService';
import { getCompanyProfileAPI } from '../../../services/jobhub-api/CompanyControllerService';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ConfirmComponent from '../../../components/customized-components/Confirm/Confirm.component';
import JobFairDetailCompanyContainer from '../../JobFairDetail/JobFairDetail.company.container';
import JobfairRegistrationFormComponent from '../../../components/forms/JobfairRegistrationForm/JobfairRegistrationForm.component';
import PolicyComponent from '../../../components/customized-components/Policy/Policy.component';
import React, { useEffect, useState } from 'react';

const { Step } = Steps;
const JobfairRegistrationForm = (props) => {
  const { jobFairId } = props;
  const history = useHistory();
  const [form] = Form.useForm(); //form for registration
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [agreeStatus, setAgreeStatus] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});

  //management step
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = async (values) => {
    const body = {
      description: values.description,
      jobFairId,
      jobPositions: values.jobPositions.map((item) => {
        const result = {
          jobPositionId: item.id,
          maxSalary: item.maxSalary,
          minSalary: item.minSalary,
          numOfPosition: item.numberOfPosition
        };
        return result;
      })
    };
    const companyRegistrationId = await onCreateDraft(body);
    if (companyRegistrationId) {
      await submitRegistration(
        companyRegistrationId,
        () => {
          history.push(PATH.RESULT_SUCCESS_PAGE);
        },
        () => history.push(PATH.RESULT_FAILED_PAGE)
      );
    }
  };

  const stepComponentList = [
    <>
      <div style={{ width: '70%', margin: '3rem auto' }}>
        <JobFairDetailCompanyContainer id={jobFairId} />
      </div>
    </>,
    <>
      <PolicyComponent />
      <Checkbox checked={agreeStatus} onChange={(e) => setAgreeStatus(e.target.checked)}>
        I have read and accept the Job fair Policy
      </Checkbox>
    </>,
    <JobfairRegistrationFormComponent form={form} jobFairId={jobFairId} />,
    <>
      <ConfirmComponent data={form.getFieldsValue(true)} companyInfo={companyInfo} />
    </>
  ];

  const nextStepButtonActions = (step) => {
    switch (step) {
      case 3:
        return () => {
          onSubmit(form.getFieldsValue(true));
        };
      case 2:
        return () => {
          form
            .validateFields()
            .then(() => {
              setCurrentStep(currentStep + 1);
            })
            .catch(() => {
              // notification['error']({
              //   message: 'job position must not be empty'
              // })
              const errorsArray = form.getFieldsError();
              for (const error of errorsArray) {
                if (error.errors.length > 0) {
                  form.scrollToField(error.name, {
                    behavior: 'smooth',
                    block: 'center'
                  });
                  break;
                }
              }
            });
        };
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    getCompanyProfile(companyId, setCompanyInfo);
  }, []);

  return (
    <div>
      <div className='jobfair-registration-form-container' style={{ background: '#FFF' }}>
        <Steps
          current={currentStep}
          style={{
            marginBottom: '3rem',
            position: 'sticky',
            top: '80px',
            background: '#FFF',
            zIndex: '1000',
            padding: '1rem'
          }}>
          <Step title="Job fair's details" />
          <Step title='Our policy' />
          <Step title='Jobfair registration form' />
          <Step title='Confirm registration' />
        </Steps>
        {stepComponentList[currentStep]}
        <div className='step-buttons'>
          {currentStep != 0 ? (
            <div className='pre-step-button'>
              <Form.Item>
                <Button
                  size='large'
                  type='primary'
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                  }}>
                  Prev
                </Button>
              </Form.Item>
            </div>
          ) : null}
          <div className='next-step-button'>
            <Form.Item>
              <div className='submit-registration-popconfirm'>
                {currentStep == 3 ? (
                  <Popconfirm
                    title='Are you sure to submit this form?'
                    onConfirm={nextStepButtonActions(currentStep)}
                    okText='Yes'
                    cancelText='No'>
                    <Button size='large' type='primary'>
                      Register
                    </Button>
                  </Popconfirm>
                ) : currentStep == 1 && !agreeStatus ? (
                  <Button
                    size='large'
                    type='primary'
                    onClick={nextStepButtonActions(currentStep)}
                    disabled={true}
                    style={{
                      color: '#00000040',
                      borderColor: '#d9d9d9',
                      background: '#f5f5f5',
                      textShadow: 'none',
                      boxShadow: 'none'
                    }}>
                    Next
                  </Button>
                ) : (
                  <Button size='large' type='primary' onClick={nextStepButtonActions(currentStep)}>
                    Next
                  </Button>
                )}
              </div>
            </Form.Item>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCompanyProfile = async (companyId, setCompanyInfo) => {
  getCompanyProfileAPI(companyId)
    .then((res) => {
      // notification['success']({
      //   message: `Fetch company profile successfully`,
      //   description: `For company with ${companyId}`,
      //   duration: 2
      // })
      const response = {
        ...res.data,
        benefits: res.data.companyBenefitDTOS.map((item) => ({
          ...item,
          id: item.benefitDTO.id,
          description: item.benefitDTO.description
        })),
        mediaUrls: res.data.mediaDTOS,
        subCategoriesIds: res.data.subCategoryDTOs.map((item) => item.id),
        url: res.data.websiteUrl
      };
      setCompanyInfo({ ...response });
    })
    .catch(() => {
      notification['error']({
        message: `Fetch company profile failed`,
        description: `Failed for company with ${companyId}`,
        duration: 2
      });
    });
};

const submitRegistration = async (companyRegistrationId, successCallback, failedCallback) => {
  try {
    const res = await submitRegistrationAPI(companyRegistrationId);
    notification['success']({
      message: `Registration draft version has been submitted`,
      description: `Submitted successfully`,
      duration: 2
    });
    successCallback();
  } catch (err) {
    notification['error']({
      message: `An error has occurred while create draft`,
      description: `Create draft failed. Server response: ${err}`,
      duration: 2
    });
    failedCallback();
  }
};

const onCreateDraft = async (body) => {
  try {
    const res = await createDraftRegistrationAPI(body);
    // notification['success']({
    //   message: `Registration draft version has been created`,
    //   description: `Created draft successfully`,
    //   duration: 2
    // })
    return res.data.companyRegistrationId;
  } catch (err) {
    notification['error']({
      message: `An error has occurred while create draft`,
      description: `Create draft failed. Server response: ${err}`,
      duration: 2
    });
  }
};

export default JobfairRegistrationForm;
