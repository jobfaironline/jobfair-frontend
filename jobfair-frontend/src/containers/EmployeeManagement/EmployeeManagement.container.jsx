import './EmployeeManagement.styles.scss';
import { Button, Form, Input, Modal, Popconfirm, Space, Typography, notification } from 'antd';
import { UploadCSVModal } from '../UploadModal/UploadCSVModal.container';
import { UploadOutlined } from '@ant-design/icons';
import {
  createEmployeesAPI,
  deleteEmployeeAPI,
  getEmployeesAPI,
  uploadCSVFile
} from '../../services/jobhub-api/CompanyEmployeeControllerService';
import { uploadUtil } from '../../utils/uploadCSVUtil';
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
  const [searchValue, setSearchValue] = useState('');
  const [uploadCsvModalVisible, setUploadCSVModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [reRender, currentPage, pageSize, searchValue]);

  const fetchData = async () => {
    try {
      const data = (await getEmployeesAPI({ companyId, searchContent: searchValue, pageSize, offset: currentPage }))
        .data;
      const newValues = data.content.map((employee, index) => {
        const { firstname, middlename, lastname } = employee.account;
        const fullName = `${firstname} ${middlename ? `${middlename} ` : ''}${lastname}`;
        return {
          id: employee.account.id,
          no: index + 1,
          fullName,
          email: employee.account.email,
          status: employee.account.status,
          department: employee.department,
          employeeId: employee.employeeId
        };
      });
      setTotalRecord(data.totalElements);
      setEmployeeData(newValues);
    } catch (e) {
      notification['error']({
        message: `Get employee data failed`,
        description: `There is problem while deleting, try again later`
      });
    }
  };

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
  };

  const onCloseUploadCSVModal = () => {
    setUploadCSVModalVisible(false);
    setReRender((reRender) => !reRender);
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
        setReRender((prevState) => !prevState);
      })
      .catch(() => {
        notification['error']({
          message: `Add employee failed`,
          description: `There is problem while adding, try again later`
        });
      });
  };

  const onSearch = async (value) => {
    setSearchValue(value);
  };

  const employeeTableProps = {
    tableData: employeeData,
    tableColumns: EmployeeTableColumn,
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
                Deactivate
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
    <>
      <UploadCSVModal visible={uploadCsvModalVisible} handleUpload={onChangeUpload} onCancel={onCloseUploadCSVModal} />
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
      <div className={'employee-management'}>
        <div className={'header'}>
          <Typography.Title level={2} style={{ marginRight: '2rem' }}>
            Employee management
          </Typography.Title>
          <Button style={{ marginRight: '2rem', borderRadius: 8 }} onClick={onAddClick}>
            Create employee account
          </Button>
          <div style={{ marginRight: '2rem' }}>
            <Button
              style={{ borderRadius: 8 }}
              icon={<UploadOutlined />}
              onClick={() => {
                setUploadCSVModalVisible(true);
              }}>
              Upload CSV or Excel file
            </Button>
          </div>
        </div>
        <div className={'search-filter-container'}>
          <Search placeholder='Search employee' className={'search-bar'} onSearch={onSearch} />
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
    </>
  );
};

export default EmployeeManagementContainer;
