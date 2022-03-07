import React, {useState} from 'react';
import {Affix, Button, Card, Col, Divider, Form, Input, Modal, Popconfirm, Row, Select, Space} from "antd";
import {jobLevel} from "../../../constants/AppConst";
import {JobLevelConst, LanguageConst} from "../../../constants/JobPositionConst";
import {CountryConst} from "../../attendant-profile-form/AttendantConstants";
import {InfoCircleOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories} from "../../../constants/CompanyProfileConstant";
import Text from "antd/es/typography/Text";
import {CompanyProfileValidation} from "../../../validate/CompanyProfileValidation";

const JobPositionDetailModalComponent = (props) => {
    const {
        visible,
        handleOk,
        handleCancel,
        data,
        form,
        onFinish,
        handleDelete,
    } = props

    console.log('data: ', data)

    const {Option, OptGroup} = Select
    const [totalSelect, setTotalSelect] = useState(0);

    return (
        <>
            <Modal
                width={800}
                title="Job position detail"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >

                <Form
                    form={form}
                    onFinish={onFinish}
                    requiredMark="required"
                    autoComplete="off"
                    scrollToFirstError={{block: "center", behavior: "smooth"}}
                >
                    <Card
                        title="Basic information"
                        style={{width: 750}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.Item
                            noStyle
                            name={'id'}
                        >
                            <Input type="hidden"/>
                        </Form.Item>
                        <Form.Item
                            label="Title"
                            name={'title'}
                            hasFeedback
                            // rules={AttendantProfileValidation.account.email}
                        >
                            <Input placeholder="Title" style={{width: 200}}/>
                        </Form.Item>
                        <Form.Item
                            label="Job level"
                            name={'level'}
                            hasFeedback
                        >
                            <Select
                                showSearch
                                style={{width: 250}}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children
                                        .toLowerCase()
                                        .localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {JobLevelConst.map(item => (
                                    <Option value={item.value}>{item.label}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Job level"
                            name={'level'}
                            hasFeedback
                            // rules={AttendantProfileValidation.account.email}
                        >
                            <Input placeholder="Title" style={{width: 200}}/>
                        </Form.Item>
                        <Form.Item
                            label="Language"
                            name={'language'}
                            hasFeedback
                        >
                            <Select
                                showSearch
                                style={{width: 250}}
                                placeholder="Search to Select"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                                filterSort={(optionA, optionB) =>
                                    optionA.children
                                        .toLowerCase()
                                        .localeCompare(optionB.children.toLowerCase())
                                }
                            >
                                {LanguageConst.map(item => (
                                    <Option value={item.value}>{item.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Contact email"
                            name={'contactEmail'}
                            hasFeedback
                            rules={CompanyProfileValidation.email}
                        >
                            <Input placeholder="Contact email" style={{width: 200}}/>
                        </Form.Item>
                        <Form.Item
                            label="Contact person name"
                            name={'contactPersonName'}
                            hasFeedback
                            rules={CompanyProfileValidation.name}
                        >
                            <Input placeholder="Contact person name" style={{width: 200}}/>
                        </Form.Item>
                        <Form.Item
                            label="Company industry"
                            name="subCategoriesIds"
                            tooltip={{
                                title: 'You can select maximum 3 items',
                                icon: <InfoCircleOutlined/>,
                            }}
                        >
                            <Select
                                style={{width: 300}}
                                placeholder="Company industry"
                                mode="multiple"
                                onChange={value => {
                                    //value is a array
                                    if (value.length > NUM_OF_SIZE_MAXIMUM) {
                                        value.pop()
                                    }
                                    setTotalSelect(value.length)
                                }}
                                onSearch={value => {
                                    console.log(value)
                                }}
                                dropdownRender={menu => (
                                    <>
                                        {menu}
                                        <Divider style={{margin: '8px 0'}}/>
                                        <Text type={totalSelect > 3 ? 'danger' : 'success'}>
                                            {totalSelect > 3
                                                ? null
                                                : `You can select ${NUM_OF_SIZE_MAXIMUM} items only. (${
                                                    NUM_OF_SIZE_MAXIMUM - totalSelect
                                                } left)`}
                                        </Text>
                                    </>
                                )}
                            >
                                {CategoriesConst.map(category => (
                                    <OptGroup label={category.label}>
                                        {SubCategories.filter(
                                            item => item.category_id === category.value
                                        ).map(item => (
                                            <Option value={item.value}>{item.label}</Option>
                                        ))}
                                    </OptGroup>
                                ))}
                            </Select>
                        </Form.Item>
                    </Card>
                    <Space size="large">
                        <Card
                            title="Skills"
                            style={{width: 750}}
                            headStyle={{fontWeight: 700, fontSize: 24}}
                        >
                            <Form.List name="skillTagIds" label="Skills">
                                {(fields, {add, remove}) => {
                                    return (
                                        <>
                                            {fields.map(({key, name, ...restField}) => {
                                                return (
                                                    <div key={key} style={{display: 'flex', flexDirection: 'row'}}>
                                                        <div
                                                            style={{display: 'flex', flexDirection: 'column'}}
                                                        >
                                                            <Form.Item
                                                                {...restField}
                                                                label="Name"
                                                                name={[name, 'name']}
                                                                hasFeedback
                                                                rules={CompanyProfileValidation.name}
                                                                style={{width: 250}}
                                                            >
                                                                <Input placeholder="Name"/>
                                                            </Form.Item>
                                                        </div>
                                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                                    </div>
                                                )
                                            })}
                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined/>}
                                                    style={{width: '35%'}}
                                                >
                                                    Add new skill
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )
                                }}
                            </Form.List>
                        </Card>
                    </Space>
                    <Space>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Edit
                            </Button>
                        </Form.Item>
                        <Popconfirm
                            title="Are you sure to delete this task?"
                            onConfirm={() => handleDelete(data.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Form.Item>
                                <Button type="primary">
                                    Delete
                                </Button>
                            </Form.Item>
                        </Popconfirm>
                    </Space>
                </Form>
            </Modal>
        </>
    )
        ;
};

export default JobPositionDetailModalComponent;