import React, {useState} from 'react';
import {Avatar, Button, Card, Divider, Form, Input, Radio, Rate, Select, Space, DatePicker} from "antd";
import {GET_ATTENDANT_MODEL} from "./AttendantDefaultModel";
import {FrownOutlined, MehOutlined, MinusCircleOutlined, PlusOutlined, SmileOutlined} from "@ant-design/icons";
import {CountryConst, JobLevelConst, QualificationConst, ResidenceConst} from "./AttendantConstants";
import moment from "moment";
import {convertToDateString} from "../../utils/common";

const AttendantProfileForm = props => {
    const [defaultData, setDefaultData] = useState(GET_ATTENDANT_MODEL);


    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('submitted:', values)
    }

    const onFormChange = (values) => {
        console.log('changing: ', values)
    }

    const {Option} = Select;

    const ProficiencyIcons = {
        1: <FrownOutlined/>,
        2: <MehOutlined/>,
        3: <SmileOutlined/>
    }

    const DateFormat = 'YYYY/MM/DD';

    return (
        <div>
            <Divider orientation="left">
                Attendant profile
            </Divider>
            <Form form={form}
                  onFinish={onFinish}
                  initialValues={defaultData}
                  onValuesChange={e => onFormChange(e)}
                  requiredMark="required"
                  autoComplete="off"
            >
                <Space direction="vertical" size="large">
                    <Card
                        title="Contact information"
                        extra={<a href="#">can be triggered to do something</a>}
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Item
                                label="Email"
                                name={['account', 'email']}
                                rules={[{required: true, message: 'Email is required'}]}
                            >
                                <Input placeholder="Email" style={{width: 322}}/>
                            </Form.Item>
                            <Form.Item
                                label="Phone number"
                                name={['account', 'phone']}
                                rules={[{required: true, message: 'Phone is required'}]}
                            >
                                <Input placeholder="Phone" style={{width: 200}}/>
                            </Form.Item>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Item
                                label="Date of birth"
                                name="dob"
                                rules={[{required: true, message: 'Date of birth is required'}]}
                            >
                                {/*<Input placeholder="Date of birth" style={{width: 200}}/>*/}
                                <DatePicker format={DateFormat} />
                            </Form.Item>
                            <Form.Item
                                label="Country"
                                name="countryId"
                                rules={[{required: true, message: 'Country is required'}]}
                            >
                                <Select
                                    showSearch
                                    style={{width: 250}}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {CountryConst.map(item => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Avatar
                                size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100}}
                                name={['account', 'profileImageUrl']}
                                src={defaultData.account.profileImageUrl}
                            />
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Item
                                label="Gender"
                                name={['account', 'gender']}
                                rules={[{required: true, message: 'Gender is required'}]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="MALE">Male</Radio.Button>
                                    <Radio.Button value="FEMALE">Female</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                label="Marital status"
                                name="maritalStatus"
                                rules={[{required: true, message: 'Marital is required'}]}
                            >
                                <Radio.Group>
                                    <Radio.Button value="SINGLE">Single</Radio.Button>
                                    <Radio.Button value="MARRIED">Married</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{required: true, message: 'Address is required'}]}
                            >
                                <Input placeholder="Address" style={{width: '50%'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Residence"
                                name="residenceId"
                                rules={[{required: true, message: 'Residence is required'}]}
                            >
                                <Select
                                    showSearch
                                    style={{width: 250}}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {ResidenceConst.map(item => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Year of experience"
                                name="yearOfExp"
                                rules={[{required: true, message: 'Year of experience is required'}]}
                            >
                                <Input placeholder="Year of exp" style={{width: '50%', textAlign: 'right'}}
                                       type="number" min="0"/>
                            </Form.Item>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Item
                                label="First Name"
                                name={['account', 'firstname']}
                                rules={[{required: true, message: 'First name is required'}]}
                            >
                                <Input placeholder="First name" style={{width: '50%'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Middle Name"
                                name={['account', 'middlename']}
                                rules={[{required: true, message: 'Middle name is required'}]}
                            >
                                <Input placeholder="Middle name" style={{width: '50%'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Last Name"
                                name={['account', 'lastname']}
                                rules={[{required: true, message: 'Last name is required'}]}
                            >
                                <Input placeholder="Last name" style={{width: '50%'}}/>
                            </Form.Item>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{required: true, message: 'Title is required'}]}
                            >
                                <Input placeholder="Title" style={{width: '50%'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Job title"
                                name="jobTitle"
                                rules={[{required: true, message: 'Job title is required'}]}
                            >
                                <Input placeholder="Job title" style={{width: '50%'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Job level"
                                name="jobLevel"
                                rules={[{required: true, message: 'Job level is required'}]}
                            >
                                <Select
                                    showSearch
                                    style={{width: 250}}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    filterSort={(optionA, optionB) =>
                                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                    }
                                >
                                    {JobLevelConst.map(item => (
                                        <Option value={item.id}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                    </Card>
                    <Card
                        title="Skills"
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.List name="skills" label="Skills">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        {fields.map(({key, name, ...restField}) => {
                                            return (
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Name"
                                                            name={[name, 'name']}
                                                            rules={[{required: true, message: 'Missing name'}]}
                                                            style={{width: 250}}
                                                        >
                                                            <Input placeholder="Name"/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'proficiency']}
                                                            label="Proficiency"
                                                            rules={[{required: true, message: 'Missing proficiency'}]}
                                                            style={{width: 250}}
                                                        >
                                                            <Rate
                                                                character={({index}) => ProficiencyIcons[index + 1]}
                                                                tooltips={(['Beginner', 'Intermediate', 'Expert'])}
                                                            />
                                                        </Form.Item>
                                                    </div>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </div>
                                            );
                                        })}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                                    style={{width: '15%'}}>
                                                Add new skill
                                            </Button>
                                        </Form.Item>
                                    </>
                                )
                            }
                            }
                        </Form.List>
                    </Card>
                    <Card
                        title="Work history"
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.List name="workHistories">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        {fields.map(({key, name, ...restField}) => {
                                            return (
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Form.Item
                                                            {...restField}
                                                            label="Company"
                                                            name={[name, 'company']}
                                                            rules={[{required: true, message: 'Missing company'}]}
                                                            style={{width: 250}}
                                                        >
                                                            <Input placeholder="company"/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'description']}
                                                            label="Description"
                                                            rules={[{required: true, message: 'Missing description'}]}
                                                            style={{width: 450}}
                                                        >
                                                            <Input placeholder="description"/>
                                                        </Form.Item>
                                                    </div>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Form.Item
                                                            {...restField}
                                                            label="From date"
                                                            name={[name, 'fromDate']}
                                                            rules={[{required: true, message: 'Missing fromDate'}]}
                                                            style={{width: '20%'}}
                                                        >
                                                            <Input placeholder="From date"/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'toDate']}
                                                            label="To date"
                                                            rules={[{required: true, message: 'Missing toDate'}]}
                                                            style={{width: '20%'}}
                                                        >
                                                            <Input placeholder="To date"/>
                                                        </Form.Item>
                                                    </div>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'isCurrentJob']}
                                                            label="Current job"
                                                            rules={[{required: true, message: 'Missing current job'}]}
                                                            style={{width: '20%'}}
                                                        >
                                                            <Input placeholder="Current job"/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'position']}
                                                            label="Position"
                                                            rules={[{required: true, message: 'Missing position'}]}
                                                            style={{width: '20%'}}
                                                        >
                                                            <Input placeholder="Position"/>
                                                        </Form.Item>
                                                    </div>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </div>
                                            );
                                        })}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                                    style={{width: '15%'}}>
                                                Add new work history
                                            </Button>
                                        </Form.Item>
                                    </>
                                )
                            }}
                        </Form.List>
                    </Card>
                    <Card
                        title="Education"
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.List name="educations">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        {fields.map(({key, name, ...restField}) => {
                                            return (
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'subject']}
                                                            label="Subject"
                                                            rules={[{required: true, message: 'Missing subject'}]}
                                                            style={{width: 250}}
                                                        >
                                                            <Input/>
                                                        </Form.Item>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'school']}
                                                            label="School"
                                                            rules={[{required: true, message: 'Missing school'}]}
                                                            style={{width: 300}}
                                                        >
                                                            <Input placeholder="School"/>
                                                        </Form.Item>
                                                    </div>
                                                    <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'fromDate']}
                                                        label="From date"
                                                        rules={[{required: true, message: 'Missing fromDate'}]}
                                                        style={{width: '20%'}}
                                                    >
                                                        <Input placeholder="From date"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'toDate']}
                                                        label="To date"
                                                        rules={[{required: true, message: 'Missing toDate'}]}
                                                        style={{width: '20%'}}
                                                    >
                                                        <Input placeholder="To date"/>
                                                    </Form.Item>
                                                    </div>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'qualification']}
                                                        label="Qualification"
                                                        rules={[{required: true, message: 'Missing qualification'}]}
                                                        style={{width: '20%'}}
                                                    >
                                                        <Select
                                                            showSearch
                                                            style={{width: 250}}
                                                            placeholder="Search to Select"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                            filterSort={(optionA, optionB) =>
                                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                            }
                                                        >
                                                            {QualificationConst.map(item => (
                                                                <Option value={item.enumName}>{item.name}</Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </div>
                                            );
                                        })}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                                    style={{width: '15%'}}>
                                                Add new work education
                                            </Button>
                                        </Form.Item>
                                    </>
                                )
                            }}
                        </Form.List>
                    </Card>
                    <Card
                        title="Certification"
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.List name="certifications">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        {fields.map(({key, name, ...restField}) => {
                                            return (
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <Form.Item
                                                        {...restField}
                                                        label="Name"
                                                        name={[name, 'name']}
                                                        rules={[{required: true, message: 'Missing name'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'institution']}
                                                        label="Institution"
                                                        rules={[{required: true, message: 'Missing institution'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input placeholder="Institution"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'year']}
                                                        label="Year"
                                                        rules={[{required: true, message: 'Missing year'}]}
                                                        style={{width: '20%'}}
                                                    >
                                                        <Input placeholder="Year" style={{width: '50%', textAlign: 'right'}}
                                                               type="number" min="0"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'certificationLink']}
                                                        label="Certification link"
                                                        rules={[{required: true, message: 'Missing certificationLink'}]}
                                                        style={{width: 350}}
                                                    >
                                                        <Input placeholder="Certification link"/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </div>
                                            );
                                        })}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                                    style={{width: '15%'}}>
                                                Add new work certification
                                            </Button>
                                        </Form.Item>
                                    </>
                                )
                            }}
                        </Form.List>
                    </Card>
                    <Card
                        title="References"
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.List name="references">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        {fields.map(({key, name, ...restField}) => {
                                            return (
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'company']}
                                                        label="Company"
                                                        rules={[{required: true, message: 'Missing company'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'email']}
                                                        label="Email"
                                                        rules={[{required: true, message: 'Missing email'}]}
                                                        style={{width: 350}}
                                                    >
                                                        <Input placeholder="Email"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'fullname']}
                                                        label="Full name"
                                                        rules={[{required: true, message: 'Missing fullname'}]}
                                                        style={{width: 400}}
                                                    >
                                                        <Input placeholder="Full name"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'phone']}
                                                        label="Phone"
                                                        rules={[{required: true, message: 'Missing phone'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input placeholder="Phone"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'position']}
                                                        label="Position"
                                                        rules={[{required: true, message: 'Missing position'}]}
                                                        style={{width: 250}}
                                                    >
                                                        <Input placeholder="Position"/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </div>
                                            );
                                        })}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                                    style={{width: '15%'}}>
                                                Add new work reference
                                            </Button>
                                        </Form.Item>
                                    </>
                                )
                            }}
                        </Form.List>
                    </Card>
                    <Card
                        title="Activities"
                        style={{width: 1400}}
                        headStyle={{fontWeight: 700, fontSize: 24}}
                    >
                        <Form.List name="activities">
                            {(fields, {add, remove}) => {
                                return (
                                    <>
                                        {fields.map(({key, name, ...restField}) => {
                                            return (
                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'name']}
                                                        label="Name"
                                                        rules={[{required: true, message: 'Missing name'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input placeholder="Name"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'functionTitle']}
                                                        label="Function title"
                                                        rules={[{required: true, message: 'Missing function title'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input placeholder="Function title"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'organization']}
                                                        label="Organization"
                                                        rules={[{required: true, message: 'Missing organization'}]}
                                                        style={{width: 350}}
                                                    >
                                                        <Input placeholder="Organization"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'fromDate']}
                                                        label="From date"
                                                        rules={[{required: true, message: 'Missing fromDate'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input placeholder="From date"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'toDate']}
                                                        label="To date"
                                                        rules={[{required: true, message: 'Missing toDate'}]}
                                                        style={{width: 300}}
                                                    >
                                                        <Input placeholder="To date"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'isCurrentActivity']}
                                                        label="Current activity"
                                                        rules={[{required: true, message: 'Missing current activity'}]}
                                                        style={{width: 250}}
                                                    >
                                                        <Input placeholder="Current activity"/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'description']}
                                                        label="Description"
                                                        rules={[{required: true, message: 'Missing description'}]}
                                                        style={{width: 350}}
                                                    >
                                                        <Input placeholder="Description"/>
                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(name)}/>
                                                </div>
                                            );
                                        })}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}
                                                    style={{width: '15%'}}>
                                                Add new activity
                                            </Button>
                                        </Form.Item>
                                    </>
                                )
                            }}
                        </Form.List>
                    </Card>
                </Space>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};


export default AttendantProfileForm;