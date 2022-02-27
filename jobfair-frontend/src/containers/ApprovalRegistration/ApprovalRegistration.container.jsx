import React, {useEffect, useState} from 'react';
import ApprovalRegistrationComponent
    from "../../components/ApprovalRegistration/components/ApprovalRegistration.component";
import {useSelector} from "react-redux";
import {Popconfirm, Space} from "antd";
import RegistrationDetailDrawerContainer
    from "../../components/ApprovalRegistration/drawer/RegistrationDetail.drawer.container";

export const defaultRegistration = [
    {
        id: 'ID001',
        createDate: '0523352521',
        description: 'description 1',
        company: 'COMPANY_1',
        status: 'APPROVED',
    },
    {
        id: 'ID002',
        createDate: '0523352521',
        description: 'description 2',
        company: 'COMPANY_1',
        status: 'PENDING',
    },
    {
        id: 'ID003',
        createDate: '0523352521',
        description: 'description 3',
        company: 'COMPANY_1',
        status: 'PENDING',
    },
    {
        id: 'ID004',
        createDate: '0523352521',
        description: 'description 1',
        company: 'COMPANY_1',
        status: 'DENIED',
    }
]

const ApprovalRegistrationContainer = props => {
    const [data, setData] = useState([])
    const [drawerVisibility, setDrawerVisibility] = useState(false)
    const [neededEmployee, setNeededEmployee] = useState(null)
    const companyId = useSelector(state => state.authentication.user.companyId)

    const fetchData = async () => {
        setData([...defaultRegistration]);
        // getEmployeesAPI(companyId)
        //     .then(res => {
        //         const { data } = res
        //
        //         const newValues = data.map((employee, index) => {
        //             const { firstname, middlename, lastname } = employee.account
        //             const fullName = firstname + ' ' + (middlename ? middlename + ' ' : '') + lastname
        //
        //             return {
        //                 id: employee.account.id,
        //                 no: index + 1,
        //                 fullName: fullName,
        //                 email: employee.account.email,
        //                 phone: employee.account.phone,
        //                 status: employee.account.status
        //             }
        //         })
        //
        //         setEmployeeData(newValues)
        //     })
        //     .catch(e => {
        //         notification['error']({
        //             message: `Get employee data failed`,
        //             description: `There is problem while deleting, try again later`
        //         })
        //     })
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleApprove = id => {
        // deleteEmployeeAPI(employeeId)
        //     .then(res => {
        //         notification['success']({
        //             message: `Delete employee successfully`,
        //             description: `Deleted employee ${employeeId} successfully`
        //         })
        //         fetchData()
        //     })
        //     .catch(e => {
        //         notification['error']({
        //             message: `Delete employee failed`,
        //             description: `There is problem while deleting, try again later`
        //         })
        //     })
        const result = data.map(item => (item.id === id ? Object.assign({}, item, {status: 'APPROVED'}) : item));
        setData(result)
    }

    const handleDenied = (id) => {
        const result = data.map(item => (item.id === id ? Object.assign({}, item, {status: 'DENIED'}) : item));
        setData(result)
    }

    const handleGetDetail = employeeId => {
        setDrawerVisibility(true)
        setNeededEmployee(employeeId)
    }

    return (
        <div>
            <RegistrationDetailDrawerContainer
                drawerVisibility={drawerVisibility}
                setDrawerVisibility={setDrawerVisibility}
                id={neededEmployee}
            />
            <ApprovalRegistrationComponent
                data={data}
                editable
                extra={{
                    title: 'Actions',
                    key: 'action',
                    render: (text, record) => {
                        return (
                            <Space size="middle">
                                <a
                                    onClick={() => {
                                        handleGetDetail(record.id)
                                    }}
                                >
                                    Detail
                                </a>
                                {record.status === 'PENDING' ? (
                                    <Space size="middle">
                                        <Popconfirm
                                            title="Approve this registration ?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => {
                                                handleApprove(record.id)
                                                console.log('approved:', record.id)
                                            }}
                                        >
                                            <a href="#">Approve</a>
                                        </Popconfirm>
                                        <Popconfirm
                                            title="Denied this registration ?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => {
                                                handleDenied(record.id)
                                                console.log('denied:', record.id)
                                            }}
                                        >
                                            <a href="#">Deny</a>
                                        </Popconfirm>
                                    </Space>
                                ) : null}
                            </Space>
                        )
                    }
                }}
            />
        </div>
    )
};

export default ApprovalRegistrationContainer;