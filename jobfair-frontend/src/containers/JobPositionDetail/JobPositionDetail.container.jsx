import React, {useEffect} from 'react';
import {Form, notification} from "antd";
import JobPositionDetailModalComponent
    from "../../components/JobPosition/JobPositionManagement/JobPositionDetailModal.component";
import JobPositionDetailComponent from "../../components/JobPositionDetail/JobPositionDetail.component";
import {useLocation} from "react-router-dom";
import {deleteJobPositionAPI, updateJobPositionAPI} from "../../services/job-controller/JobControllerService";

const JobPositionDetailContainer = () => {

    const location = useLocation();
    const jobPosition = location.state.jobPosition;

    const [form] = Form.useForm();

    const handleDelete = (id) => {
        deleteJobPositionAPI(id)
            .then(res => {
                notification['success']({
                    message: `Delete job position successfully`,
                })
            })
            .catch(err => {
                notification['error']({
                    message: `Update job position failed`,
                    description: `Error detail: ${err}`
                })
            })
    }

    const onFinish = (values) => {
        values['skillTagIds'] = values['skillTagIds']?.map(item => item.id)
        updateJobPositionAPI(values, values.id)
            .then(res => {
                notification['success']({
                    message: `Update job position successfully`,
                })
            }).catch(err => {
            notification['error']({
                message: `Update job position failed`,
                description: `Error detail: ${err}`
            })
        })
    }

    const init = () => {
        jobPosition['skillTagIds'] = jobPosition['skillTagDTOS']
        jobPosition['subCategoriesIds'] = jobPosition['subCategoryDTOs']?.map(item => item.id)
        form.setFieldsValue({...jobPosition})
    }


    useEffect(() => {
        init();
    }, [jobPosition])

    return (
        <>
            <JobPositionDetailComponent
                data={jobPosition}
                onFinish={onFinish}
                form={form}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default JobPositionDetailContainer;