import React, { useEffect } from "react";
import { Menu, PageHeader, Dropdown, Avatar, Button, Space} from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import FormTable from "../../components/form-table/form-table.component";
import { deleteEmployeeAPI, getEmployeesAPI } from "../../services/companyEmployeeService";

const EmployeeManagementPage = () => {

    const history = useHistory();

    const [formData, setFormData] = useState([]);

    const fetchData = async () => {

        const companyId = "8e407290-9bdb-4e12-b7d3-d1ffdd1d8479";

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

                setFormData(newValues);
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
            <h1>Employee management</h1>
            <Space>
                <Button type="primary" onClick={() => history.push("/employee-register")}>Register employee</Button>
            </Space>
            <div>
                <FormTable 
                formData={formData} 
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
        </div>
    );
}

export default EmployeeManagementPage;