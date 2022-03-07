import React, {useEffect, useState} from 'react';
import JobPositionDetailModalComponent from "./JobPositionDetailModal.component";
import {Form, notification} from "antd";
import {updateJobPositionAPI} from "../../../services/job-controller/JobControllerService";
import {
    setJobPositionSubmodalVisibility
} from "../../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice";
import {useDispatch} from "react-redux";

const JobPositionDetailModalContainer = props => {
    const {
        visible,
        setModalVisible,
        jobPosition,
        onFinish,
        handleDelete
    } = props

    const [form] = Form.useForm();

    const init = () => {
        jobPosition['skillTagIds'] = jobPosition['skillTagDTOS']
        jobPosition['subCategoriesIds'] = jobPosition['subCategoryDTOs']?.map(item => item.id)
        form.setFieldsValue({...jobPosition})
    }

    useEffect(() => {
        init();
    },[])

    const handleOk = () => {
        setModalVisible(false)
    }

    const handleCancel = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        init();
    }, [jobPosition])

    return (
        <>
            <JobPositionDetailModalComponent
                data={jobPosition}
                visible={visible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                onFinish={onFinish}
                form={form}
                handleDelete={handleDelete}
            />
        </>
    );
};


export default JobPositionDetailModalContainer;