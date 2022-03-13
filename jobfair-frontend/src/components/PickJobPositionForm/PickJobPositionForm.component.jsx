import React, { useRef, useState } from 'react'
import { Button, Form, Input, Space, Anchor, Typography, Divider, Popconfirm } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import { PickJobPositionFormValidation } from '../../validate/PickJobPositionForm'
const { Link } = Anchor
import './PickJobPositionForm.styles.scss'

const PickJobPositionForm = props => {
  const { handlePickJobPosition, form, handleRemove } = props

  const jobPositions = form.getFieldsValue().jobPositions //for anchor

  return (
    <>
      {/* TODO: use anchor component and move it to pickjob registrationform container*/}
      {/* <div style={{ position: 'fixed', left: '0.8rem', top: '200px' }}>
        {jobPositions.length ? (
          <Typography style={{ fontSize: '1rem', paddingBottom: '0.3rem' }}>Job Positions</Typography>
        ) : null}
        <Anchor targetOffset={300} onClick={e => e.preventDefault()}>
          {jobPositions.map((jobPosition, index) => {
            return <Link href={`#${index}-job-position`} title={`${index + 1}: ${jobPosition.title}`} />
          })}
        </Anchor>
      </div> */}
      {/* /// */}
      <Form.List name="jobPositions">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, ...restField }) => {
                return (
                  <div>
                    <Divider></Divider>
                    <div id={`${key}-job-position`} key={key} style={{ width: '100%', display: 'flex' }}>
                      <div className="job-position-input-container ">
                        <div className="job-position-row-container">
                          <Typography style={{ fontSize: '1.5rem' }}>Job position: </Typography>
                          <Form.Item {...restField} name={[name, 'title']}>
                            <Input
                              disabled
                              style={{
                                border: 'none',
                                background: 'white',
                                color: 'black',
                                fontSize: '1.5rem',
                                padding: '0 0 0 0.2rem'
                              }}
                            />
                          </Form.Item>
                        </div>
                        <div className="job-position-row-container ">
                          <Form.Item
                            label="Number of position"
                            {...restField}
                            name={[name, 'numberOfPosition']}
                            rules={PickJobPositionFormValidation.numberOfPosition}
                            style={{ maxWidth: '14rem', width: '14rem' }}
                          >
                            <Input placeholder="Number of position" style={{ width: '12rem' }} />
                          </Form.Item>
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
                        </div>
                      </div>
                      <Popconfirm
                        placement="rightTop"
                        title="Are you sure to remove this job position?"
                        onConfirm={() => handleRemove(name, remove)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <MinusCircleOutlined />
                      </Popconfirm>
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
    </>
  )
}

export default PickJobPositionForm
