import React, {useState} from 'react';
import CompanyProfileForm from "../../../components/company-profile-form/CompanyProfile";
import {Button, Form} from "antd";
import {COMPANY_DEFAULT_MODEL} from "../../../default_models/CompanyProfileModel";
import {benefitConst} from "./CompanyProfileConstant";

const CompanyProfile = props => {
    const [form] = Form.useForm();
    const [data, setData] = useState(COMPANY_DEFAULT_MODEL);

    const handleOnChangeForm = (values) => {
        console.log('changing: ', values);
    }

    const onFinish = (values) => {
        const benefits = values['benefits'];
        if (benefits !== undefined) {
            const result = benefits.map(item => {
                return {
                    id: item.id,
                    description: item.description,
                }
            })
            values['benefits'] = result;
        }
        console.log('submitted: ', values)
    }
    return (
        <div>
            Company Information
            <Form
                form={form}
                initialValues={data}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={e => handleOnChangeForm(e)}
                requiredMark="required"
            >
            <CompanyProfileForm/>
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


export default CompanyProfile;