import React, { useEffect, useRef } from 'react'
import { Form, Input, Button, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { handleConvertRangePicker } from '../../utils/common'
import { useState } from 'react'
import { PickJobPositionFormValidation } from '../../validate/PickJobPositionForm'
import { useDispatch } from 'react-redux'
import { setJobPositions } from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import Item from 'antd/lib/list/Item'

const data = [
  {
    key: '123',
    id: '123',
    jobTitle: 'jobTitle 1',
    jobType: 'FULL_TIME',
    level: 'INTERNSHIP'
  },
  {
    id: '124',
    key: '124',
    jobTitle: 'jobTitle 2',
    jobType: 'PART_TIME',
    level: 'SENIOR'
  },
  {
    key: '125',
    id: '125',
    jobTitle: 'jobTitle 3',
    jobType: 'FREELANCE',
    level: 'JUNIOR'
  }
]

const PickJobPositionForm = props => {
  const { jobPositions, handlePickJobPosition, form, onFinish, handleRemove } = props

  return (
    <>
      <Form
        name="jobPositionsForm"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        initialValues={{ jobPositions: jobPositions }}
      >
        <Form.List name="jobPositions">
          {(fields, { add, remove }) => {
            return (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={[name, 'id']} rules={[{ required: true, message: 'Missing ID' }]}>
                      <Input disable placeholder="Job ID" />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, 'title']} rules={PickJobPositionFormValidation.jobTitle}>
                      <Input placeholder="Job title" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      rules={PickJobPositionFormValidation.description}
                    >
                      <TextArea rows={4} placeholder="Description" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'requirement']}
                      rules={PickJobPositionFormValidation.requirement}
                    >
                      <TextArea rows={4} placeholder="Requirement" />
                    </Form.Item>
                    <Input.Group compact>
                      <Form.Item
                        {...restField}
                        name={[name, 'minSalary']}
                        rules={PickJobPositionFormValidation.minSalary}
                      >
                        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Min salary" />
                      </Form.Item>
                      <Input
                        className="site-input-split"
                        style={{
                          width: 30,
                          borderLeft: 0,
                          borderRight: 0,
                          pointerEvents: 'none'
                        }}
                        placeholder="~"
                        disabled
                      />
                      <Form.Item
                        {...restField}
                        name={[name, 'maxSalary']}
                        rules={PickJobPositionFormValidation.maxSalary}
                      >
                        <Input
                          className="site-input-right"
                          style={{
                            width: 100,
                            textAlign: 'center'
                          }}
                          placeholder="Max salary"
                        />
                      </Form.Item>
                    </Input.Group>
                    <Form.Item
                      {...restField}
                      name={[name, 'numberOfPosition']}
                      rules={PickJobPositionFormValidation.numberOfPosition}
                    >
                      <Input placeholder="Number of position" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => handleRemove(name, remove)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => handlePickJobPosition()} block icon={<PlusOutlined />}>
                    Add field
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default PickJobPositionForm
