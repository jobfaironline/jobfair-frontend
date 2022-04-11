import { Button, Checkbox, Form, Steps } from 'antd';
import PolicyComponent from '../../../components/customized-components/Policy/Policy.component';
import React, { useState } from 'react';
import './OrganizeJobFairForm.styles.scss';
import ChooseTemplateJobFairContainer from '../../ChooseTemplateJobFair/ChooseTemplateJobFair.container';

const { Step } = Steps;
const OrganizeJobFairFormContainer = () => {
  const [form] = Form.useForm();
  const [agreeStatus, setAgreeStatus] = useState(false);

  //management step
  const [currentStep, setCurrentStep] = useState(0);

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
                  form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                  break;
                }
              }
            });
        };
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };
  const stepComponentList = [
    <>
      <ChooseTemplateJobFairContainer onHandleNext={nextStepButtonActions(currentStep)} />
    </>,
    <>
      <PolicyComponent />
      <Checkbox checked={agreeStatus} onChange={(e) => setAgreeStatus(e.target.checked)}>
        I have read and accept the Job fair Policy
      </Checkbox>
    </>,
    <>Step 3</>,
    <>Step 4</>
  ];

  const onSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <div>
      <Steps
        current={currentStep}
        style={{
          marginBottom: '3rem',
          position: 'sticky',
          top: '80px',
          background: '#FFF',
          zIndex: '1000',
          padding: '1rem',
          display: 'none'
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
        {/*<div className='next-step-button'>*/}
        {/*  <Form.Item>*/}
        {/*    <div className='submit-registration-popconfirm'>*/}
        {/*      {currentStep == 3 ? (*/}
        {/*        <Popconfirm*/}
        {/*          title='Are you sure to submit this form?'*/}
        {/*          onConfirm={nextStepButtonActions(currentStep)}*/}
        {/*          okText='Yes'*/}
        {/*          cancelText='No'>*/}
        {/*          <Button size='large' type='primary'>*/}
        {/*            Register*/}
        {/*          </Button>*/}
        {/*        </Popconfirm>*/}
        {/*      ) : currentStep == 1 && !agreeStatus ? (*/}
        {/*        <Button*/}
        {/*          size='large'*/}
        {/*          type='primary'*/}
        {/*          onClick={nextStepButtonActions(currentStep)}*/}
        {/*          disabled={true}*/}
        {/*          style={{*/}
        {/*            color: '#00000040',*/}
        {/*            borderColor: '#d9d9d9',*/}
        {/*            background: '#f5f5f5',*/}
        {/*            textShadow: 'none',*/}
        {/*            boxShadow: 'none'*/}
        {/*          }}>*/}
        {/*          Next*/}
        {/*        </Button>*/}
        {/*      ) : (*/}
        {/*        <Button size='large' type='primary' onClick={nextStepButtonActions(currentStep)}>*/}
        {/*          Next*/}
        {/*        </Button>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  </Form.Item>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default OrganizeJobFairFormContainer;
