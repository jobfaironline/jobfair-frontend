import React, { useRef, useState } from 'react'
import { Button, Form, Input, Space, Anchor, Typography, Divider } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { PickJobPositionFormValidation } from '../../validate/PickJobPositionForm'
const { Link } = Anchor
import './PickJobPositionForm.styles.scss'

const PickJobPositionForm = props => {
  const { jobPositions, handlePickJobPosition, form, onFinish, handleRemove } = props

  return (
    <>
      <div style={{ position: 'fixed', left: '0.8rem', top: '200px' }}>
        {jobPositions.length ? (
          <Typography style={{ fontSize: '1rem', paddingBottom: '0.3rem' }}>Job Positions</Typography>
        ) : null}
        <Anchor targetOffset={300}>
          {jobPositions.map((jobPosition, index) => {
            return <Link href={`#${index}-job-position`} title={`${index + 1}: ${jobPosition.title}`} />
          })}
        </Anchor>
      </div>
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
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <div>
                      <Divider></Divider>
                      <Typography.Title level={3}>{`Job position ${key + 1}`}</Typography.Title>
                      <div id={`${key}-job-position`} key={key} style={{ width: '100%', display: 'flex' }}>
                        <div className="job-position-input-container ">
                          <div className="job-position-row-container">
                            <Form.Item {...restField} name={[name, 'title']} label="Job Title">
                              <Input placeholder="Job title" disabled />
                            </Form.Item>
                          </div>
                          <div className="job-position-row-container ">
                            <Form.Item
                              label="Description"
                              {...restField}
                              name={[name, 'description']}
                              rules={PickJobPositionFormValidation.description}
                            >
                              <TextArea autoSize={{ minRows: 4 }} placeholder="Description" />
                            </Form.Item>
                          </div>
                          <div className="job-position-row-container ">
                            <Form.Item
                              label="Requirement"
                              {...restField}
                              name={[name, 'requirement']}
                              rules={PickJobPositionFormValidation.requirement}
                            >
                              <TextArea autoSize={{ minRows: 4 }} placeholder="Requirement" />
                            </Form.Item>
                          </div>
                          <div className="job-position-row-container ">
                            <div style={{ width: 'fit-content', flex: 'none' }}>
                              <Input.Group compact>
                                <Form.Item
                                  label="Min salary"
                                  {...restField}
                                  name={[name, 'minSalary']}
                                  rules={PickJobPositionFormValidation.minSalary(name)}
                                >
                                  <Input prefix="$" placeholder="Min salary" />
                                </Form.Item>
                                <Form.Item label=" ">
                                  <Input
                                    className="site-input-split"
                                    placeholder="~"
                                    disabled
                                    style={{ width: '2rem' }}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Max salary"
                                  name={[name, 'maxSalary']}
                                  rules={PickJobPositionFormValidation.maxSalary(name)}
                                >
                                  <Input prefix="$" className="site-input-right" placeholder="Max salary" />
                                </Form.Item>
                              </Input.Group>
                            </div>
                            <Form.Item
                              label="Number of position"
                              {...restField}
                              name={[name, 'numberOfPosition']}
                              rules={PickJobPositionFormValidation.numberOfPosition}
                              style={{ marginLeft: '2rem' }}
                            >
                              <Input placeholder="Number of position" style={{ width: '12rem' }} />
                            </Form.Item>
                          </div>
                        </div>
                        <MinusCircleOutlined onClick={() => handleRemove(name, remove)} />
                      </div>
                    </div>
                  )
                })}
                <Form.Item>
                  <Button type="dashed" onClick={() => handlePickJobPosition()} block icon={<PlusOutlined />}>
                    Add job
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
        {/*<Form.Item>*/}
        {/*    <Button type="primary" htmlType="submit">*/}
        {/*        Submit*/}
        {/*    </Button>*/}
        {/*</Form.Item>*/}
      </Form>
    </>
  )
}

export default PickJobPositionForm
