import React from 'react'
import { Button, Form, Input, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { EvaluateConst } from '../../constants/JobPositionConst'

const EvaluationFormComponent = ({ onFinish, id, name }) => {
  const [form] = Form.useForm()

  if (!id) {
    return null
  }

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        requiredMark="required"
        autoComplete="off"
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
      >
        <Space direction="vertical" size="medium">
          <Form.Item name={name} noStyle initialValue={id}>
            <Input type="text" type="hidden" />
          </Form.Item>
          <Form.Item label="Message" name={'message'} hasFeedback>
            <TextArea placeholder="Message" showCount maxLength="1000" />
          </Form.Item>
          <Space direction="horizontal">
            {name === 'companyRegistrationId'
              ? EvaluateConst.map(item => (
                  <div key={item.id}>
                    <Form.Item name="status" noStyle>
                      <Input type="text" type="hidden" />
                    </Form.Item>
                    <Button
                      value={item.id}
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        form.setFieldsValue({
                          status: item.id
                        })
                      }}
                    >
                      {item.name}
                    </Button>
                  </div>
                ))
              : EvaluateConst.filter(item => item.id !== 'REQUEST_CHANGE').map(
                  item => (
                    <div key={item.id}>
                      <Form.Item name="status" noStyle>
                        <Input type="text" type="hidden" />
                      </Form.Item>
                      <Button
                        value={item.id}
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                          form.setFieldsValue({
                            status: item.id
                          })
                        }}
                      >
                        {item.name}
                      </Button>
                    </div>
                  )
                )}
          </Space>
        </Space>
      </Form>
    </>
  )
}

export default EvaluationFormComponent
