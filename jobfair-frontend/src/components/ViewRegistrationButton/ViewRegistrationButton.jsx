import React from 'react';
import {JOB_FAIR_FOR_ADMIN_STATUS} from "../../constants/JobFairConst";
import {Space, Tooltip} from "antd";
import {Link} from "react-router-dom";
import {EyeInvisibleOutlined, EyeOutlined, MoreOutlined} from "@ant-design/icons";
import "./ViewRegistrationButton.style.scss"


const ViewRegistrationButton = (props) => {
    const {status, id} = props
    if (status === undefined || id === undefined) {
        return;
    }
    switch (status) {
        case JOB_FAIR_FOR_ADMIN_STATUS.ATTENDANT_REGISTER:
        case JOB_FAIR_FOR_ADMIN_STATUS.HAPPENING:
        case JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_BUY_BOOTH:
        case JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_REGISTER:
            return (
                <Tooltip placement="top" title='View registration'>
                    <Link to={`/approval-registration/${id}`}>
                        <EyeOutlined/>
                    </Link>
                </Tooltip>
            )
        default:
            return (
                <>
                    <Tooltip placement="top" title='Cannot view registration at this moment'>
                        <a className="disabled">
                            <EyeInvisibleOutlined/>
                        </a>
                    </Tooltip>
                </>
            )
    }
};

export default ViewRegistrationButton;