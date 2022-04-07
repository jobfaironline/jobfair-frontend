/* eslint-disable no-unused-vars */
import { Modal, Typography } from 'antd';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import PickJobPositionForm from '../../../components/forms/PickJobPositionForm/PickJobPositionForm.component';
import PickJobPositionTableContainer from '../../JobPositionTable/JobPositionTable.container';
import React, { useState } from 'react';

const PickJobPositionFormContainer = ({ form }) => {
  const [modalVisibile, setModalVisible] = useState(false);
  const [anchorList, setAnchorList] = useState(
    form.getFieldsValue().jobPositions
      ? form.getFieldsValue().jobPositions.map((item) => ({
          href: `#${item.id}`,
          title: item.title
        }))
      : []
  );

  const handlePickJobPosition = (name, add) => {
    setModalVisible(true);
  };

  const handleRemove = (name, remove) => {
    remove(name);
    setAnchorList(
      form.getFieldsValue().jobPositions
        ? form.getFieldsValue().jobPositions.map((item) => ({
            href: `#${item.id}`,
            title: item.title
          }))
        : []
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setAnchorList(
      form.getFieldsValue().jobPositions
        ? form.getFieldsValue().jobPositions.map((item) => ({
            href: `#${item.id}`,
            title: item.title
          }))
        : []
    );
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: '0.8rem',
          top: '200px',
          zIndex: '1000'
        }}>
        <Typography style={{ fontSize: '1rem', paddingBottom: '0.3rem' }}>Content list</Typography>
        <AnchorComponent
          listData={
            form.getFieldsValue().jobPositions
              ? form.getFieldsValue().jobPositions.map((item) => ({
                  href: `#${item.id}`,
                  title: item.title
                }))
              : []
          }
          href={'#description'}
          title={'Registration description'}
        />
      </div>
      <Modal
        width={800}
        title='Choose job position'
        visible={modalVisibile}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose>
        {modalVisibile ? <PickJobPositionTableContainer form={form} selectable /> : null}
      </Modal>
      <PickJobPositionForm handlePickJobPosition={handlePickJobPosition} form={form} handleRemove={handleRemove} />
    </>
  );
};

export default PickJobPositionFormContainer;
