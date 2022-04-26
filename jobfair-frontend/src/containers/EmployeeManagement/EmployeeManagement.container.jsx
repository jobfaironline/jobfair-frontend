import './EmployeeManagement.styles.scss';
import { Button, Form, Input, Modal, Popconfirm, Space, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  createEmployeesAPI,
  deleteEmployeeAPI,
  getEmployeesAPI
} from '../../services/jobhub-api/CompanyEmployeeControllerService';
import { loadCSVFileAntdProps, uploadUtil } from '../../utils/uploadCSVUtil';
import { uploadCSVFile } from '../../services/jobhub-api/QuestionControllerService';
import { useSelector } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import EmployeeDrawer from './EmployeeDrawer.container';
import EmployeeFormComponent from '../../components/forms/EmployeeForm/EmployeeForm.component';
import EmployeeTableColumn from '../CommonTableComponent/columns/EmployeeTable.column';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const EmployeeManagementContainer = () => {
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [form] = Form.useForm();

  //pagination
  /* eslint-disable no-unused-vars */
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [employeeData, setEmployeeData] = useState([]);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [neededEmployee, setNeededEmployee] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [isAddEmployeeModalVisible, setIsAddEmployeeModalVisible] = useState(false);

  const fetchData = async () => {
    try {
      const data = (await getEmployeesAPI(companyId)).data;
      const newValues = data.map((employee, index) => {
        const { firstname, middlename, lastname } = employee.account;
        const fullName = `${firstname} ${middlename ? `${middlename} ` : ''}${lastname}`;
        return {
          id: employee.account.id,
          no: index + 1,
          fullName,
          email: employee.account.email,
          phone: employee.account.phone,
          status: employee.account.status
        };
      });
      setEmployeeData(newValues);
    } catch (e) {
      notification['error']({
        message: `Get employee data failed`,
        description: `There is problem while deleting, try again later`
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (employeeId) => {
    deleteEmployeeAPI(employeeId)
      .then(() => {
        notification['success']({
          message: `Delete employee successfully`,
          description: `Deleted employee ${employeeId} successfully`
        });
        fetchData();
      })
      .catch(() => {
        notification['error']({
          message: `Delete employee failed`,
          description: `There is problem while deleting, try again later`
        });
      });
  };

  const handleGetDetail = (employeeId) => {
    setDrawerVisibility(true);
    setNeededEmployee(employeeId);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onAddClick = () => {
    setIsAddEmployeeModalVisible(true);
  };

  const onChangeUpload = async (info) => {
    await uploadUtil(info, uploadCSVFile);
    //force render to fetch data after upload
    setReRender((prevState) => !prevState);
  };

  const onFinish = (values) => {
    createEmployeesAPI({
      companyId,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      middleName: values.middleName,
      department: values.department,
      employeeId: values.employeeId
    })
      .then(() => {
        notification['success']({
          message: `Add employee successfully`,
          description: `Added employee ${values.email} successfully`
        });
        form.resetFields();
        setIsAddEmployeeModalVisible(false);
      })
      .catch(() => {
        notification['error']({
          message: `Add employee failed`,
          description: `There is problem while adding, try again later`
        });
      });
  };

  const employeeTableProps = {
    tableData: employeeData,
    tableColumns: EmployeeTableColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size='middle'>
            <a
              onClick={() => {
                handleGetDetail(record.id);
              }}>
              Detail
            </a>
            <Popconfirm
              title='Are you sure？'
              okText='Yes'
              cancelText='No'
              onConfirm={() => {
                handleDelete(record.id);
              }}>
              <Button type='link' disabled={record.status === 'INACTIVE'}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  return (
    <div className={'employee-management'}>
      <Modal
        className={'add-employee-modal'}
        visible={isAddEmployeeModalVisible}
        okText={'Register'}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setIsAddEmployeeModalVisible(false);
        }}
        width={700}>
        <EmployeeFormComponent form={form} onFinish={onFinish} />
      </Modal>
      <div>
        <Upload {...loadCSVFileAntdProps(onChangeUpload)}>
          <Button icon={<UploadOutlined />}>Upload CSV</Button>
        </Upload>
        <Button onClick={onAddClick}>Create employee account</Button>
      </div>
      <div>
        <Search placeholder='Search employee' className={'search-bar'} />
      </div>

      {neededEmployee != null ? (
        <EmployeeDrawer
          drawerVisibility={drawerVisibility}
          setDrawerVisibility={setDrawerVisibility}
          employeeId={neededEmployee}
        />
      ) : null}
      <CommonTableContainer {...employeeTableProps} />
    </div>
  );
};

export default EmployeeManagementContainer;
