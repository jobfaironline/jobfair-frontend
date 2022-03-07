import React, {useState} from 'react';
import {Affix, Button, Card, Col, Divider, Form, Input, Modal, Popconfirm, Row, Select, Space} from "antd";
import {jobLevel} from "../../../constants/AppConst";
import {JobLevelConst, LanguageConst} from "../../../constants/JobPositionConst";
import {CountryConst} from "../../attendant-profile-form/AttendantConstants";
import {InfoCircleOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {CategoriesConst, NUM_OF_SIZE_MAXIMUM, SubCategories} from "../../../constants/CompanyProfileConstant";
import Text from "antd/es/typography/Text";
import {CompanyProfileValidation} from "../../../validate/CompanyProfileValidation";
import JobPositionDetailFormComponent from "./JobPositionDetailForm.component";

const {Option, OptGroup} = Select

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
                <JobPositionDetailFormComponent form={form} onFinish={onFinish}/>
            </Modal>
        </>
    )
        ;
};

export default JobPositionDetailModalComponent;