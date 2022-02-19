import React, { useEffect, useState } from "react";
import EmployeeTableComponent from '../../components/EmployeeTable/EmployeeTable.component';
import { deleteEmployeeAPI, getEmployeesAPI } from "../../services/companyEmployeeService";
import { Space } from "antd";
import { useSelector } from "react-redux";

const EmployeeTable = ({extra}) => {

    const [employeeData, setemployeeData] = useState([]);
    const companyId = useSelector((state) => state.authentication.user.companyId);

    const fetchData = async () => {
        getEmployeesAPI(companyId)
            .then((res) => {
                console.log(res);
                const {data} = res;

                const newValues = data.map((employee) => {
                    return {
                        id: employee.account.id,
                        email: employee.account.email,
                        phone: employee.account.phone,
                        status: employee.account.status,
                    };
                })

                setemployeeData(newValues);
            })
            .catch((e) => {
                console.log(e);
            })
    }
    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (employeeId) => {

        console.log(employeeId);

        deleteEmployeeAPI(employeeId)
            .then((res) => {
                console.log(res);
                fetchData();
            })
            .catch(e => {
                console.log(e);
            })
    };

    return (
        <div>
            <EmployeeTableComponent
            employeeData={employeeData} 
            editable
            extra={
                (
                    {
                    title: 'Hành động',
                    key: 'action',
                    render: (text, record) => {
                        return <Space size="middle">
                                <a onClick={() => {
                                    handleDelete(record.id);
                                }}>Delete</a>
                                </Space>
                    },
                    }
                )
                }
            />
        </div>
    );
}

export default EmployeeTable;