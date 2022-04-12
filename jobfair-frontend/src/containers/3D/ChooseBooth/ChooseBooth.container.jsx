import { AssigmentType } from '../../../constants/AssignmentConst';
import { Card, Divider, List, Modal, Select, Skeleton, Table, Tag, Transfer, Typography, notification } from 'antd';
import { ChooseBoothCanvas } from '../../../components/3D/ChooseBooth/ChooseBoothCanvas.component';
import {
  assignEmployee,
  getAssigmentByJobFairBoothId,
  getAvailableCompanyEmployee,
  unAssignEmployee
} from '../../../services/jobhub-api/AssignmentControllerService';
import { getJobFairBoothByJobFairId } from '../../../services/jobhub-api/JobFairBoothControllerService';
import { getLayoutByJobFairId } from '../../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';
import SideBarComponent from '../../../components/commons/SideBar/SideBar.component';

const { Title } = Typography;
const { Option } = Select;

const difference = (array1, array2) => array1.filter((item) => array2.includes(item));

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled
    }) => {
      const columns = direction === 'left' ? leftColumns : rightColumns;

      const rowSelection = {
        getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows.filter((item) => !item.disabled).map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size='small'
          style={{ pointerEvents: listDisabled ? 'none' : null }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            }
          })}
        />
      );
    }}
  </Transfer>
);

export const AssignEmployeeModalContainer = (props) => {
  const { isVisible, boothId, handleCancel, jobFairId, setVisible } = props;

  const [state, setState] = useState({
    data: undefined,
    targetKeys: undefined,
    oldAssignedEmployees: undefined
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let availableEmployees = await getAvailableCompanyEmployee(jobFairId).then((response) => response.data);
      availableEmployees = availableEmployees === '' ? [] : availableEmployees;
      availableEmployees = availableEmployees.map((employee) => ({
        ...employee.account,
        fullName: `${employee.account.firstname} ${employee.account.middlename} ${employee.account.lastname}`,
        key: employee.account.id
      }));
      let boothAssigments = await getAssigmentByJobFairBoothId(boothId).then((response) => response.data);
      boothAssigments = boothAssigments === '' ? [] : boothAssigments;
      boothAssigments = boothAssigments.map((assignment) => ({
        ...assignment.companyEmployee.account,
        fullName: `${assignment.companyEmployee.account.firstname} ${assignment.companyEmployee.account.middlename} ${assignment.companyEmployee.account.lastname}`,
        assignmentType: assignment.type,
        key: assignment.companyEmployee.account.id
      }));

      const targetKeys = boothAssigments.map((employee) => employee.id);
      const data = [...availableEmployees, ...boothAssigments];

      setState((prevState) => ({
        ...prevState,
        data,
        targetKeys,
        oldAssignedEmployees: JSON.parse(JSON.stringify(boothAssigments))
      }));
    } catch (e) {
      notification['error']({
        message: `Error happens`,
        description: `There is problem while submitting, try again later`,
        duration: 2
      });
    }
  };

  const leftTableColumns = [
    {
      dataIndex: 'fullName',
      title: 'Name'
    }
  ];
  const rightTableColumns = [
    {
      dataIndex: 'fullName',
      title: 'Name'
    },
    {
      dataIndex: 'assignmentType',
      title: 'type',
      render: (type, record) => {
        const value = AssigmentType.filter((item) => item.name === type)[0];
        return (
          <Select
            defaultValue={value ? value.label : 'Select type'}
            onClick={(event) => event.stopPropagation()}
            onChange={(value) => {
              record.assignmentType = AssigmentType.filter((item) => item.value === value)[0].name;
            }}>
            {AssigmentType.map((item) => (
              <Option value={item.value}>{item.label}</Option>
            ))}
          </Select>
        );
      }
    }
  ];

  const onChange = (nextTargetKeys) => {
    state.data.forEach((employee) => {
      if (!nextTargetKeys.includes(employee.key)) employee.assignmentType = undefined;
    });
    setState((prevState) => ({ ...prevState, targetKeys: nextTargetKeys }));
  };

  const onOK = async () => {
    const assginedEmployee = state.data.filter((employee) => employee.assignmentType !== undefined);
    const unassignedEmployee = state.oldAssignedEmployees.filter(
      (employee) => !assginedEmployee.find((oldEmployee) => oldEmployee.id === employee.id)
    );

    const unassignedPromise = [];
    for (const employee of unassignedEmployee) {
      const promise = unAssignEmployee(employee.id, boothId);
      unassignedPromise.push(promise);
    }

    await Promise.all(unassignedPromise);

    const assignPromise = [];
    for (const employee of assginedEmployee) {
      const promise = assignEmployee(employee.id, boothId, employee.assignmentType);
      assignPromise.push(promise);
    }
    await Promise.all(assignPromise);
    notification['success']({
      message: `Assign success`,
      description: `Assign success`,
      duration: 2
    });
    setVisible(false);
  };

  if (state.data === undefined || state.targetKeys === undefined) return null;

  return (
    <Modal title='Confirm booth' visible={isVisible} onOk={onOK} onCancel={handleCancel} width={1000}>
      {`Are you sure? + ${boothId}`}
      <TableTransfer
        dataSource={state.data}
        targetKeys={state.targetKeys}
        disabled={false}
        showSearch={true}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
    </Modal>
  );
};

const BoothListComponent = (props) => {
  const { data, onHoverIn, onHoverOut, onClick } = props;
  return (
    <>
      <Divider size='small' plain>
        <Title>Assign employee</Title>
      </Divider>
      <InfiniteScroll
        dataLength={data?.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        style={{ height: '65vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <List
          itemLayout='vertical'
          size='large'
          dataSource={data}
          renderItem={(item) => (
            <Card
              hoverable={true}
              style={{ width: 300, margin: '10px' }}
              onMouseEnter={() => onHoverIn(item.booth.name)}
              onMouseLeave={() => onHoverOut()}
              onClick={() => {
                onClick(item.id, item.booth.name);
              }}>
              <div style={{ display: 'flex' }}>
                <div>
                  <Card.Meta title={item.booth.name} />
                </div>
              </div>
            </Card>
          )}
        />
      </InfiniteScroll>
    </>
  );
};

export const ChooseBoothPageContainer = (props) => {
  const { jobFairId } = props;
  const [state, setState] = useState({
    glbMesh: undefined,
    boothDataForMesh: {},
    boothData: []
  });

  const [modalState, setModalState] = useState({
    isVisible: false,
    boothId: ''
  });

  const setVisible = (value) => {
    setModalState((prevState) => ({ ...prevState, isVisible: value }));
  };

  const [selectionRef, setSelectionRef] = useState();
  const [hoverRef, setHoverRef] = useState();
  const boothMeshesRef = useRef([]);

  const onClick = (boothId, meshName) => {
    const ref = boothMeshesRef?.current?.filter((meshRef) => meshRef?.current?.name === meshName)[0];
    setSelectionRef(ref);
    setModalState((prevState) => ({ ...prevState, boothId, isVisible: true }));
  };

  const handleCancel = () => {
    setSelectionRef(undefined);
    setModalState((prevState) => ({ ...prevState, boothId: '', isVisible: false }));
  };

  const onCompanyGroundPointerOver = (meshName) => {
    const ref = boothMeshesRef?.current?.filter((meshRef) => meshRef?.current?.name === meshName)[0];
    if (ref?.current?.uuid !== hoverRef?.current?.uuid) setHoverRef(ref);
  };
  const onCompanyGroundPointerOut = () => {
    setHoverRef(undefined);
  };

  useEffect(async () => {
    const data = await getJobFairBoothByJobFairId(jobFairId).then((response) => response.data);
    const layoutData = await getLayoutByJobFairId(jobFairId).then((response) => response.data);

    const url = layoutData.url;

    const glb = await loadGLBModel(url);
    const boothData = {};
    for (const boothInfo of data) {
      const id = boothInfo.id;
      const name = boothInfo.booth.name;
      boothData[name] = {
        id
      };
    }

    setState((prevState) => ({ ...prevState, glbMesh: glb.scene, boothDataForMesh: boothData, boothData: data }));
  }, []);

  if (state.glbMesh === undefined || state.boothDataForMesh.length === 0) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <ReactLoading type={'spin'} color={'#1890ff'} height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      {modalState.isVisible ? (
        <AssignEmployeeModalContainer
          isVisible={modalState.isVisible}
          boothId={modalState.boothId}
          handleCancel={handleCancel}
          jobFairId={jobFairId}
          setVisible={setVisible}
        />
      ) : null}
      <SideBarComponent>
        {state.boothDataForMesh.length === 0 ? null : (
          <BoothListComponent
            data={state.boothData}
            onHoverIn={onCompanyGroundPointerOver}
            onHoverOut={onCompanyGroundPointerOut}
            onClick={onClick}
          />
        )}
      </SideBarComponent>
      <div style={{ width: '75%' }}>
        <ChooseBoothCanvas
          mesh={state.glbMesh}
          boothData={state.boothDataForMesh}
          jobFairId={jobFairId}
          onClick={onClick}
          selectionRef={selectionRef}
          onCompanyGroundPointerOver={onCompanyGroundPointerOver}
          onCompanyGroundPointerOut={onCompanyGroundPointerOut}
          hoverRef={hoverRef}
          boothMeshesRef={boothMeshesRef}
        />
      </div>
    </>
  );
};
