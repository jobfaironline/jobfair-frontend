import React from 'react'
import {Button, Form, Input, Space} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import {PickJobPositionFormValidation} from '../../validate/PickJobPositionForm'

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
    const {jobPositions, handlePickJobPosition, form, onFinish, handleRemove} = props

    return (
        <>
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
                                {fields.map(({key, name, ...restField}) => (
                                    <Space key={key} style={{marginBottom: 8}} align="baseline">
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <Form.Item {...restField} name={[name, 'id']}
                                                           label="Job ID">
                                                    <Input disabled placeholder="Job ID"/>
                                                </Form.Item>
                                                <Form.Item {...restField} name={[name, 'title']}
                                                           label="Job Title">
                                                    <Input placeholder="Job title" disabled/>
                                                </Form.Item>
                                            </div>
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                                <Form.Item
                                                    label="Description"
                                                    {...restField}
                                                    name={[name, 'description']}
                                                    rules={PickJobPositionFormValidation.description}
                                                >
                                                    <TextArea rows={4} placeholder="Description"/>
                                                </Form.Item>
                                                <Form.Item
                                                    label="Requirement"
                                                    {...restField}
                                                    name={[name, 'requirement']}
                                                    rules={PickJobPositionFormValidation.requirement}
                                                >
                                                    <TextArea rows={4} placeholder="Requirement"/>
                                                </Form.Item>
                                            </div>
                                            <Input.Group compact>
                                                <Form.Item
                                                    label="Min salary"
                                                    {...restField}
                                                    name={[name, 'minSalary']}
                                                    rules={PickJobPositionFormValidation.minSalary(name)}
                                                >
                                                    <Input prefix="$" style={{width: 100, textAlign: 'center'}}
                                                           placeholder="Min salary"/>
                                                </Form.Item>
                                                <Input
                                                    className="site-input-split"
                                                    style={{
                                                        width: 50,
                                                        borderLeft: 1,
                                                        borderRight: 1,
                                                        pointerEvents: 'none',
                                                        marginTop: 30,
                                                        marginRight: 32,
                                                        marginLeft: 32,
                                                        textAlign: 'center',
                                                    }}
                                                    placeholder="~"
                                                    disabled
                                                />
                                                <Form.Item
                                                    {...restField}
                                                    label="Max salary"
                                                    name={[name, 'maxSalary']}
                                                    rules={PickJobPositionFormValidation.maxSalary(name)}
                                                >
                                                    <Input
                                                        prefix="$"
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
                                                label="Number of position"
                                                {...restField}
                                                name={[name, 'numberOfPosition']}
                                                rules={PickJobPositionFormValidation.numberOfPosition}
                                            >
                                                <Input placeholder="Number of position"/>
                                            </Form.Item>
                                        </div>
                                        <MinusCircleOutlined onClick={() => handleRemove(name, remove)}/>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => handlePickJobPosition()} block
                                            icon={<PlusOutlined/>}>
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
