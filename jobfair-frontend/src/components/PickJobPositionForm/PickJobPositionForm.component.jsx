import React from 'react'
import {Anchor, Button, Divider, Form, Input, Typography} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {PickJobPositionFormValidation} from '../../validate/PickJobPositionForm'
import './PickJobPositionForm.styles.scss'

const {Link} = Anchor

const PickJobPositionForm = props => {
  const {jobPositions, handlePickJobPosition, form, onFinish, handleRemove} = props

  return (
    <>
      <div style={{position: 'fixed', left: '0.8rem', top: '200px'}}>
        {jobPositions.length ? (
          <Typography style={{fontSize: '1rem', paddingBottom: '0.3rem'}}>Job Positions</Typography>
        ) : null}
        <Anchor targetOffset={300} onClick={e => e.preventDefault()}>
          {jobPositions.map((jobPosition, index) => {
            return <Link href={`#${index}-job-position`} title={`${index + 1}: ${jobPosition.title}`}/>
          })}
        </Anchor>
      </div>
      <Form
        name="jobPositionsForm"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
        initialValues={{jobPositions: jobPositions}}
      >
        <Form.List name="jobPositions">
          {(fields, {add, remove}) => {
            return (
              <>
                {fields.map(({key, name, ...restField}) => {
                  return (
                    <div>
                      <Divider></Divider>
                      <Typography.Title level={3}>{`Job position ${key + 1}`}</Typography.Title>
                      <Divider style={{width: '10rem', minWidth: 0, margin: '0.5rem'}}></Divider>
                      <div id={`${key}-job-position`} key={key} style={{width: '100%', display: 'flex'}}>
                        <div className="job-position-input-container ">
                          <div className="job-position-row-container">
                            <Typography.Title level={4}>{`Job's title: ${
                              form.getFieldsValue().jobPositions[key]?.title
                            }`}</Typography.Title>

                            <Form.Item {...restField} name={[name, 'title']} style={{display: 'none'}}>
                              <Input type="hidden" placeholder="Job title" disabled/>
                            </Form.Item>
                          </div>
                          <div className="job-position-row-container ">
                            <div style={{width: 'fit-content', flex: 'none'}}>
                              <Input.Group compact>
                                <Form.Item
                                  label="Min salary"
                                  {...restField}
                                  name={[name, 'minSalary']}
                                  rules={PickJobPositionFormValidation.minSalary(name)}
                                >
                                  <Input prefix="$" placeholder="Min salary"/>
                                </Form.Item>
                                <Form.Item label=" ">
                                  <Input
                                    className="site-input-split"
                                    placeholder="~"
                                    disabled
                                    style={{width: '2rem'}}
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  label="Max salary"
                                  name={[name, 'maxSalary']}
                                  rules={PickJobPositionFormValidation.maxSalary(name)}
                                >
                                  <Input prefix="$" className="site-input-right" placeholder="Max salary"/>
                                </Form.Item>
                              </Input.Group>
                            </div>
                            <Form.Item
                              label="Number of position"
                              {...restField}
                              name={[name, 'numberOfPosition']}
                              rules={PickJobPositionFormValidation.numberOfPosition}
                              style={{marginLeft: '2rem'}}
                            >
                              <Input placeholder="Number of position" style={{width: '12rem'}}/>
                            </Form.Item>
                          </div>
                        </div>
                        <MinusCircleOutlined onClick={() => handleRemove(name, remove)}/>
                      </div>
                    </div>
                  )
                })}
                <Form.Item>
                  <Button type="dashed" onClick={() => handlePickJobPosition()} block icon={<PlusOutlined/>}>
                    Add job
                  </Button>
                </Form.Item>
              </>
            )
          }}
        </Form.List>
      </Form>
    </>
  )
}

export default PickJobPositionForm
