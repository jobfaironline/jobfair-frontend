import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { handleFieldsError } from '../../../utils/handleFIeldsError';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

export const EditableList = ({ form, formItemName, buttonText, ReadComponent, UpdateComponent }) => {
  const [editItemIds, setEditItemIds] = useState([]);

  const onEditItem = (id) => {
    setEditItemIds((prevState) => [...prevState, id]);
  };

  const collapse = async (id) => {
    try {
      await form.validateFields();
      const fieldData = form.getFieldValue(formItemName);
      fieldData.forEach((item) => {
        if (item.id === id) item.isEmpty = false;
      });
      setEditItemIds((prevState) => prevState.filter((item) => item.id === id));
    } catch (e) {
      const errorFieldNames = e.errorFields.map((obj) => obj.name[0]);
      if (errorFieldNames.includes(formItemName)) handleFieldsError(form);
    }
  };

  return (
    <Form.List name={formItemName}>
      {(fields, { add, remove }) => {
        const addItem = () => {
          const newId = uuidv4();
          add({ id: newId, isNew: true, isEmpty: true });
          onEditItem(newId);
        };
        return (
          <>
            {fields.map(({ key, name, ...restField }) => {
              const item = form.getFieldValue(formItemName)?.[name];
              const id = item?.id;
              const isNew = item?.isNew;
              const isEmpty = item?.isEmpty;
              const removeHistory = () => {
                collapse(id);
                remove(name);
              };

              return (
                <div style={{ marginBottom: '1rem' }} key={id}>
                  {editItemIds.includes(id) || (isNew && isEmpty) ? (
                    <UpdateComponent
                      key={key}
                      restField={restField}
                      name={name}
                      remove={removeHistory}
                      collapse={() => collapse(id)}
                    />
                  ) : (
                    <ReadComponent data={item} onClick={onEditItem} />
                  )}
                </div>
              );
            })}
            <Form.Item>
              <Button type='dashed' onClick={addItem} block icon={<PlusOutlined />}>
                {buttonText}
              </Button>
            </Form.Item>
          </>
        );
      }}
    </Form.List>
  );
};
