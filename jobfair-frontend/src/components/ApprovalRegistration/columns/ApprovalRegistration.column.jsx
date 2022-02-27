import React from 'react';
import {Tag} from "antd";

const ApprovalRegistrationColumn = getColumnSearchProps => {
    return [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
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
            title: 'Registration Id',
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
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            ...getColumnSearchProps('company')
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
                    case 'APPROVED':
                        objStatus = {
                            color: 'success',
                            message: 'Approved'
                        }
                        break
                    case 'PENDING':
                        objStatus = {
                            color: 'processing',
                            message: 'Pending'
                        }
                        break
                    case 'SUSPENDED':
                        objStatus = {
                            color: 'warning',
                            message: 'Suspended'
                        }
                        break
                    default:
                        objStatus = {
                            color: 'error',
                            message: 'Denied'
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