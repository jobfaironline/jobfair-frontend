import React from 'react';
import {uploadCSVFile} from "../../services/job-controller/JobControllerService";
import {Button, notification, Upload} from "antd";
import UploadCsvFileComponent from "./UploadCSVFile.component";
import {UploadOutlined} from "@ant-design/icons";

const UploadCsvFileContainer = () => {

    const uploadCSV = async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        await uploadCSVFile(formData)
    }

    const loadFile = {
        name: 'file',
        accept: '.csv',
        beforeUpload: file => {
            return false;
        },
        onChange: async (info) =>  {
            if (info.file.type !== 'text/csv') {
                notification['error']({
                    message: `${info.file.name} is not csv`
                })
                return;
            }
            await uploadCSV(info.file)
            notification['success']({
                message: `${info.file.name} upload successfully`
            })
            window.location.reload(false)
        },
        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
    }
    return (
        <>
            <UploadCsvFileComponent {...loadFile}/>
        </>
    );
};

export default UploadCsvFileContainer;