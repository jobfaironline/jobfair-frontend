import {Space, Tag} from "antd";
import React from "react";

export const appliedColumns = [
    {
        title: 'ID',
        dataIndex: 'attendant_id',
        filters: [
            {
                text: 'ATTENDANT',
                value: 'ATTD'
            },
            {
                text: 'Company',
                value: 'Company',
                children: [
                    {
                        text: 'COMPANY_MANAGER',
                        value: 'MNG'
                    },
                    {
                        text: 'COMPANY_EMPLOYEE',
                        value: 'EMP'
                    }
                ]
            }
        ],
        onFilter: (value, record) => record.attendant_id.indexOf(value) === 0,
        sorter: (a, b) => a.attendant_id.length - b.attendant_id.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Company Name',
        dataIndex: 'company_name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.company_name.length - b.company_name.length,
    },
    {
        title: 'Position',
        dataIndex: 'position_name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.position_name.length - b.position_name.length,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.date.length - b.date.length,
    },
    {
        title: 'Time',
        dataIndex: 'time',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.time.length - b.time.length,
    },
    {
        title: 'Link',
        dataIndex: 'link',
    }
];

export const appliedData = [
    {
        key: '1',
        attendant_id: 'ATTD001',
        company_name: 'Coop. Goose',
        position_name: 'MANAGER',
        date: '01/01/2000',
        time: '12:12:12',
        link: 'link.com'
    },
    {
        key: '2',
        attendant_id: 'MNG001',
        company_name: 'Coop. Maja',
        position_name: 'LEADER',
        date: '04/01/2000',
        time: '12:12:12',
        link: 'link.com'
    },
    {
        key: '3',
        attendant_id: 'EMP001',
        company_name: 'Coop. Pojo',
        position_name: 'SECURITY',
        date: '03/01/2000',
        time: '12:12:12',
        link: 'link.com'
    },
    {
        key: '4',
        attendant_id: 'ATTD004',
        company_name: 'Coop. XML',
        position_name: 'TEACHER',
        date: '02/01/2000',
        time: '12:12:12',
        link: 'link.com'
    }
]

export const joinedColumns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: "Company's Name",
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Interview',
        key: 'interviews',
        dataIndex: 'interviews',
        render: interviews => (
            <>
                {interviews.map(interview => {
                    let color = interview === 'APPROVED' ? 'green' : 'blue' ;
                    if (interview === 'DECLINED') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={interview}>
                            {interview.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    }
];

export const joinData = [
    {
        code: '1',
        name: 'John Brown',
        position: 'SENIOR DEVELOPER',
        date: '01/01/2000',
        interviews: ['APPROVED', 'REQUESTING'],
    },
    {
        code: '2',
        name: 'Jim Green',
        position: 'JUNIOR DEVELOPER',
        date: '01/01/2000',
        interviews: ['DECLINED'],
    },
    {
        code: '3',
        name: 'Jakie Tan',
        position: 'DEV OPS',
        date: '01/01/2000',
        interviews: ['DECLINED', 'APPROVED'],
    },
];
