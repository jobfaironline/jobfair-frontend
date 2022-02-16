import React, {useState} from 'react';
import {Form, Input, Button, Radio, Tooltip, Select, Divider, Typography, Space, AutoComplete} from "antd";
import {CopyOutlined, GiftOutlined, InfoCircleOutlined, MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {
    benefitConst,
    CategoriesConst,
    NUM_OF_SIZE_MAXIMUM,
    SizeConst,
    SubCategories
} from "../../pages/ProfilePage/Company/CompanyProfileConstant";
import ImageUpload from "../image-upload/ImageUpload";

const CompanyProfileForm = props => {
    const [form] = Form.useForm();

    //state
    const [totalSelect, setTotalSelect] = useState(0);
    const [benefitId, setBenefitId] = useState(0);
    const [url, setUrl] = useState("");
    const [editable, setEditable] = useState(false);
    const defaultBenefit = [
        {
            name: 0,
            description: "des 1",
            fieldKey: 0,
            isListField: true,
            key: 0,
            id: 0
        },
        {
            name: 1,
            description: "des 2",
            fieldKey: 1,
            isListField: true,
            key: 1,
            id: 1
        },
    ];

    //
    const {Option, OptGroup} = Select;

    const {Text} = Typography;

    const handleOnChangeForm = (values) => {
        console.log('changing: ', values);
    }

    const onFinish = (values) => {
        const subCategoriesIds = values['subCategoriesIds'];
        const result = subCategoriesIds.map(item => SubCategories.find(subCategory => subCategory.label === item).value)
        values['subCategoriesIds'] = result;
        console.log('submitted: ', values)
    }

    return (
        <div>
            Company Information
            <Form
                form={form}
                initialValues={{
                    benefits: defaultBenefit
                }}

                layout="vertical"
                onFinish={onFinish}
                onValuesChange={e => handleOnChangeForm(e)}
                requiredMark="required"
            >
                <Form.Item label="Company Name" name='name' required tooltip="This is required">
                    <Input placeholder="Company name" style={{width: '20%'}}/>
                </Form.Item>
                <Form.Item
                    label="Company Address"
                    tooltip={{
                        title: 'This is optional',
                        icon: <InfoCircleOutlined/>,
                    }}
                    name='address'
                >
                    <Input placeholder="Company address" style={{width: '30%'}}/>
                </Form.Item>
                <Form.Item
                    label="Company Email"
                    required tooltip="This is required"
                    name="email"
                >
                    <Input placeholder="Company email" style={{width: '20%'}}/>
                </Form.Item>
                <Form.Item
                    label="Company tax ID"
                    required tooltip="This is required"
                    name="taxId"
                >
                    <Input placeholder="Company Tax ID" style={{width: '10%'}}/>
                </Form.Item>
                <div className="site-input-group-wrapper">
                    <Form.Item
                        label="Company URL"
                        tooltip={{
                            title: 'This is optional',
                            icon: <InfoCircleOutlined/>,
                        }}>
                        <Input.Group compact>
                            <Form.Item
                                noStyle
                                name="url"
                                rules={[{required: true}]}
                                style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                            >
                                <Input
                                    style={{width: 'calc( 40% - 200px)'}}
                                    defaultValue={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </Form.Item>
                            <Tooltip title="copy url">
                                <Button
                                    onClick={() => {
                                        navigator.clipboard.writeText(url)
                                    }}
                                    icon={<CopyOutlined/>}
                                />
                            </Tooltip>
                        </Input.Group>
                    </Form.Item>
                </div>
                <Form.Item
                    label="Company size"
                    name="sizeId"
                    tooltip={{
                        title: 'This is optional',
                        icon: <InfoCircleOutlined/>,
                    }}
                >
                    <Select
                        style={{width: 150}}
                        onChange={(value) => {
                            console.log(`size selected: ${value}`)
                        }}
                        defaultValue="Select a size..."
                    >
                        {SizeConst.map(item => (
                            <Option value={item.value}>{item.label}</Option>
                        ))}
                    </Select>
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
                        // defaultValue={}
                        onChange={(value) => {
                            //value is a array
                            console.log(value);
                            if (value.length > NUM_OF_SIZE_MAXIMUM) {
                                value.pop()
                            }
                            setTotalSelect(value.length);
                        }}
                        onSearch={(value) => {
                            console.log(value)
                        }}
                        dropdownRender={menu => (
                            <>
                                {menu}
                                <Divider style={{margin: '8px 0'}}/>
                                <Text type={totalSelect > 3 ? "danger" : "success"}>
                                    {totalSelect > 3 ?
                                        null :
                                        `You can select ${NUM_OF_SIZE_MAXIMUM} items only. (${NUM_OF_SIZE_MAXIMUM - totalSelect} left)`
                                    }
                                </Text>
                            </>
                        )}
                    >
                        {CategoriesConst.map(category => (
                            <OptGroup label={category.label}>
                                {SubCategories
                                    .filter(item => item.category_id === category.value)
                                    .map(item => (<Option value={item.label}>{item.label}</Option>))}
                            </OptGroup>
                        ))}
                    </Select>
                </Form.Item>
                {/*default benefits*/}
                <Form.List name="benefits">
                    {(fields, {add, remove}) => {
                        return (
                            <>
                                {fields.map(({key, name, ...restField}) => {
                                    return (
                                        <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'id']}
                                                rules={[{required: true, message: 'Missing id'}]}
                                                style={{width: '10%'}}
                                            >
                                                <Select
                                                    defaultValue="Select one..."
                                                    onChange={(value) => {
                                                        console.log('id: ', value);
                                                        setBenefitId(value);
                                                    }}>
                                                    {benefitConst.map(item => (
                                                        <Option value={item.value}>
                                                            <GiftOutlined/>
                                                            {item.label}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                rules={[{required: true, message: 'Missing description'}]}
                                                style={{width: '20%'}}
                                            >
                                                <Input placeholder="Description"/>
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)}/>
                                        </div>
                                    );
                                })}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )
                    }
                    }
                </Form.List>
                <Form.Item
                    label="Company medias"
                    name="mediaUrls"
                    tooltip={{
                        title: 'This is optional',
                        icon: <InfoCircleOutlined/>,
                    }}
                >
                    <ImageUpload/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary"
                            style={{background: "orange", borderColor: "orange", borderRadius: 8}}
                            htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CompanyProfileForm;