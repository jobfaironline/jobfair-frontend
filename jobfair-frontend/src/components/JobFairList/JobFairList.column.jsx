import React from 'react';
import {Tag} from "antd";

const JobFairListColumn = (getColumnSearchProps) => {
    return [
        {
            title: 'Job fair ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id')
        },
        {
            title: 'Start time',
            dataIndex: 'startTime',
            key: 'phone',
            ...getColumnSearchProps('startTime')
        },
        {
            title: 'End time',
            dataIndex: 'endTime',
            key: 'endTime',
            ...getColumnSearchProps('endTime')
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Draft',
                    value: 'DRAFT'
                },
                {
                    text: 'Pending',
                    value: 'PENDING'
                },
                {
                    text: 'Deleted',
                    value: 'DELETED'
                },
                {
                    text: 'Canceled',
                    value: 'CANCEL'
                },
                {
                    text: 'Approved',
                    value: 'APPROVE'
                },
                {
                    text: 'Rejected',
                    value: 'REJECT'
                }
            ],
            onFilter: (value, record) => {
                return record.status === value
            },
            render: status => {
                let objStatus
                switch (status) {
                    case 'APPROVE':
                        objStatus = {
                            color: 'green',
                            message: 'Approved'
                        }
                        break
                    case 'DRAFT':
                        objStatus = {
                            color: 'gold',
                            message: 'Draft'
                        }
                        break
                    case 'PENDING':
                        objStatus = {
                            color: 'blue',
                            message: 'Pending'
                        }
                        break
                    case 'DELETED':
                        objStatus = {
                            color: 'magenta',
                            message: 'Deleted'
                        }
                        break
                    case 'CANCEL':
                        objStatus = {
                            color: 'volcano',
                            message: 'Canceled'
                        }
                        break
                    default:
                        objStatus = {
                            color: 'red',
                            message: 'Rejected'
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

export default JobFairListColumn;