import React from 'react';
import {Tag} from "antd";
import {convertEnumToString} from "../../utils/common";

const JobFairForAdminColumn = (getColumnSearchProps) => {
    return [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            ...getColumnSearchProps('no')
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Company register',
            children: [
                {
                    title: 'Start time',
                    dataIndex: 'companyRegisterStartTime',
                    key: 'companyRegisterStartTime',
                    ...getColumnSearchProps('companyRegisterStartTime')
                },
                {
                    title: 'End time',
                    dataIndex: 'companyRegisterEndTime',
                    key: 'companyRegisterEndTime',
                    ...getColumnSearchProps('companyRegisterEndTime')
                }
            ],
        },
        {
            title: 'Attendant register time',
            dataIndex: 'attendantRegisterStartTime',
            key: 'attendantRegisterStartTime',
            ...getColumnSearchProps('attendantRegisterStartTime')
        },
        {
            title: 'Job fair',
            children: [
                {
                    title: 'Start time',
                    dataIndex: 'startTime',
                    key: 'startTime',
                    ...getColumnSearchProps('startTime')
                },
                {
                    title: 'End time',
                    dataIndex: 'endTime',
                    key: 'endTime',
                    ...getColumnSearchProps('endTime')
                }
            ],
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Closed',
                    value: 'CLOSED'
                },
                {
                    text: 'Happening',
                    value: 'HAPPENING'
                },
                {
                    text: 'Attendant register',
                    value: 'ATTENDANT_REGISTER'
                },
                {
                    text: 'Company buy booth',
                    value: 'COMPANY_BUY_BOOTH'
                },
                {
                    text: 'Company register',
                    value: 'COMPANY_REGISTER'
                },
                {
                    text: 'Not yet',
                    value: 'NOT_YET'
                },
                {
                    text: 'Processing',
                    value: 'PROCESSING'
                },
                {
                    text: 'Unavailable',
                    value: 'UNAVAILABLE'
                },
            ],
            onFilter: (value, record) => {
                return record.status === value
            },
            render: status => {
                let objStatus
                switch (status) {
                    default:
                        objStatus = {
                            color: 'green',
                            message: convertEnumToString(status)
                        }
                        break
                }
                return (
                    <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>
                )
            }
        }
    ]
};

export default JobFairForAdminColumn;