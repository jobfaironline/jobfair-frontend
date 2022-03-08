import React, {useState} from 'react';
import {Button, Card, Divider, Form, Input, Modal, Popconfirm, Select, Space} from "antd";
import {JobLevelConst, LanguageConst, NUM_OF_SKILL_TAGS, SkillTagsConst} from "../../constants/JobPositionConst";
import {CompanyProfileValidation} from "../../validate/CompanyProfileValidation";
import {InfoCircleOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories} from "../../constants/CompanyProfileConstant";
import Text from "antd/es/typography/Text";
import {useHistory} from "react-router-dom";
import {JobPositionValidation} from "../../validate/CreateJobPositionValidation";

const {Option, OptGroup} = Select

const JobPositionDetailComponent = ({data, form, onFinish, handleDelete}) => {

    const [totalSelect, setTotalSelect] = useState(0);
    const [totalSkillTags, setTotalSkillTags] = useState(0)
    const history = useHistory();

    return (
        <>
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
                        rules={JobPositionValidation.title}
                    >
                        <Input placeholder="Title" style={{width: 200}}/>
                    </Form.Item>
                    <Form.Item
                        label="Job level"
                        name={'level'}
                        hasFeedback
                        rules={JobPositionValidation.jobLevel}
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
                        label="Language"
                        name={'language'}
                        hasFeedback
                        rules={JobPositionValidation.language}
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
                        rules={JobPositionValidation.email}
                    >
                        <Input placeholder="Contact email" style={{width: 200}}/>
                    </Form.Item>
                    <Form.Item
                        label="Contact person name"
                        name={'contactPersonName'}
                        hasFeedback
                        rules={JobPositionValidation.contactPerson}
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
                        rules={JobPositionValidation.jobCategory}
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
                    <Form.Item
                        label="Skill tags"
                        required
                        tooltip="This is required"
                        rules={JobPositionValidation.skillTags}
                        name="skillTagIds"
                    >
                        <Select
                            style={{width: 200}}
                            mode="multiple"
                            onChange={value => {
                                //value is a array
                                if (value.length > NUM_OF_SKILL_TAGS) {
                                    value.pop()
                                }
                                setTotalSkillTags(value.length)
                            }}
                            onSearch={value => {

                            }}
                            dropdownRender={menu => (
                                <>
                                    {menu}
                                    <Divider style={{margin: '8px 0'}}/>
                                    <Text type={totalSkillTags > 3 ? 'danger' : 'success'}>
                                        {totalSkillTags > 5
                                            ? null
                                            : `You can select ${NUM_OF_SKILL_TAGS} items only. (${NUM_OF_SKILL_TAGS - totalSkillTags} left)`}
                                    </Text>
                                </>
                            )}
                        >
                            {SkillTagsConst.map(item => (
                                <Option value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Card>
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
                    <Button type="primary" onClick={() => history.goBack()}>Back</Button>
                </Space>
            </Form>
        </>
    )
        ;
};

export default JobPositionDetailComponent;