import React from 'react';
import {Button, Form, Modal, notification, Space, Typography} from "antd";
import JobPositionSubmodalDetailComponent from "../JobPositionModal/JobPositionSubmodalDetail.component";
import {ApplicationValidation} from "../../validate/ApplicationValidation";
import TextArea from "antd/es/input/TextArea";
import ResumeDetailComponent from "../ResumeDetail/ResumeDetail.component";
import {submitApplication} from "../../services/application-controller/ApplicationControllerService";

const {Text} = Typography
//confirm form before submit resume
const ConfirmSubmitResumeComponent = (props) => {
  const {
    dragId,
    cv,
    jobPosition
  } = props


  const onFinish = (values) => {
    const body = {
      ...values,
      cvId: cv.id,
      registrationJobPositionId: jobPosition.id,
    }
    submitApplication(body)
      .then(res => {
        notification['success']({
          message: 'Your application has been submitted'
        })
      })
      .catch(err => {

      })
  }

  const handleViewCvDetail = () => {
    console.log('cv: ', cv)
    Modal.info({
      title: "Cv detail",
      width: '1500',
      closable: true,
      maskClosable: true,
      wrapClassName: 'company-job-position-tab-modal',
      onOk: () => {

      },
      content: <ResumeDetailComponent data={cv}/>
    })
  }

  const handleViewJobPositionDetail = () => {
    Modal.info({
      title: "Job detail",
      width: '70rem',
      closable: true,
      maskClosable: true,
      wrapClassName: 'company-job-position-tab-modal',
      onOk: () => {

      },
      content: <JobPositionSubmodalDetailComponent data={jobPosition}/>
    })
  }

  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark="required"
      autoComplete="off"
      scrollToFirstError={{block: 'center', behavior: 'smooth'}}
    >
      <Space direction="vertical" style={{width: '40rem', marginTop: '2rem'}}>
        <Space direction="horizontal">
          <Text strong onClick={handleViewCvDetail}>CV detail</Text>
          <Text strong onClick={handleViewJobPositionDetail}>Job position detail</Text>
        </Space>
        <Form.Item
          label='Message to employers'
          name='summary'
          rules={ApplicationValidation.summary}
        >
          <TextArea placeholder="Summary" showCount maxLength={1000} autoSize={{minRows: 5}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginLeft: '30rem'}}>Apply</Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ConfirmSubmitResumeComponent;