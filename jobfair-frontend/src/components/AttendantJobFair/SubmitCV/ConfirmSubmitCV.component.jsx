import React from 'react';
import {Button, Form, Modal, notification, Space} from "antd";
import TextArea from "antd/es/input/TextArea";
import JobPositionSubmodalDetailComponent from "../../JobPositionModal/JobPositionSubmodalDetail.component";
import {ApplicationValidation} from "../../../validate/ApplicationValidation";
import {
  draftApplication,
  submitApplication
} from "../../../services/application-controller/ApplicationControllerService";


const ConfirmSubmitResumeComponent = (props) => {
  const {cv, jobPosition, closeModal} = props


  const onFinish = async (values) => {
    const body = {
      ...values,
      cvId: cv.id,
      registrationJobPositionId: jobPosition.id,
    }
    try {
      const response = await draftApplication(body);
      const data = response.data;
      await submitApplication(data.id);
      notification['success']({
        message: 'Your application has been submitted'
      })
    } catch (err) {
      notification['error']({
        message: err.response.data.message
      })
    }

    closeModal();
  }

  const handleViewCvDetail = () => {

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
        {/*<Space direction="horizontal">
          <Text strong onClick={handleViewCvDetail}>CV detail</Text>
          <Text strong onClick={handleViewJobPositionDetail}>Job position detail</Text>
        </Space>*/}
        <Form.Item
          label='Message to employers'
          name='summary'
          rules={ApplicationValidation.summary}
          style={{marginLeft: '1rem', width: '96%', display: "flex", flexDirection: "column"}}
        >
          <TextArea placeholder="Summary" showCount maxLength={1000} autoSize={{minRows: 5}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{position: "absolute", right: "0"}}>Apply</Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ConfirmSubmitResumeComponent;