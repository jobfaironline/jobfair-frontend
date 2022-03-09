import React from 'react';
import {Tag} from "antd";

const ApprovalRegistrationColumn = getColumnSearchProps => {
    return [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            ...getColumnSearchProps('no'),
            render(text, record) {
                return {
                    props: {
                        style: { textAlign: 'end', width: '5px' }
                    },
                    children: text
                }
            }
        },
        {
            title: 'Registration ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            onFilter: (value, record) => record.id.indexOf(value) === 0,
            sorter: (a, b) => a.id.localeCompare(b.id),
            sortDirections: ['descend']
        },
        {
            title: 'Create date',
            dataIndex: 'createDate',
            key: 'createDate',
            ...getColumnSearchProps('createDate')
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description')
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Pending',
                    value: 'PENDING'
                },
                {
                    text: 'Approved',
                    value: 'APPROVED'
                },
                {
                    text: 'Denied',
                    value: 'DENIED'
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
                            message: 'Cancel'
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


export default ApprovalRegistrationColumn;