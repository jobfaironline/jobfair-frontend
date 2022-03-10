import React from 'react';
import {Button, notification, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {uploadCSVFile} from "../../services/job-controller/JobControllerService";

const UploadCsvFileComponent = ({...loadFile}) => {

    return (
        <Upload {...loadFile}>
            <Button icon={<UploadOutlined/>}>Upload CSV</Button>{' '}
        </Upload>
    );
};

export default UploadCsvFileComponent;