import { Tag } from "antd";


const EmployeeTableColumn = (getColumnSearchProps) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Phone number',
            dataIndex: 'phone',
            key: 'phone',
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
            {
                text: 'Verified',
                value: "VERIFIED",
            },
            {
                text: 'Inactive',
                value: "INACTIVE"
            }
            ],
            onFilter: (value, record) => {
                return record.status === value;
            },
            render: (status) => {
                let objStatus;
                switch(status) {
                    case "VERIFIED": objStatus = {
                        color: 'processing',
                        message: "Verified"
                    }; break;
                    default: objStatus = {
                        color: 'warning',
                        message: "Inactive"
                    };
                } 
                return (
                    <Tag color={objStatus.color}>
                        {objStatus.message.toUpperCase()}
                    </Tag>
                );
            }
        },
    ];
}


export default EmployeeTableColumn;