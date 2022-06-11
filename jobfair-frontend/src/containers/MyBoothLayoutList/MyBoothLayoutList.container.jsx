import { Card, Modal, Typography, notification, Space, Tooltip, Button } from 'antd';
import { CustomDateFormat } from '../../constants/ApplicationConst';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import {
  deleteBoothLayoutInMyBoothLayout,
  getAllMyBoothLayout
} from '../../services/jobhub-api/DecoratorBoothLayoutController';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { DeleteOutlined } from '@ant-design/icons';

const { Meta } = Card;

const MyBoothLayoutListContainer = ({ myLayoutVisibility, setMyLayoutVisibility, deletable }) => {
  const [myBoothLayouts, setMyBoothLayouts] = useState([]);
  const dispatch = useDispatch();

  const handleOk = () => {
    setMyLayoutVisibility(false);
  };

  const handleCancel = () => {
    setMyLayoutVisibility(false);
  };

  const fetchData = async () => {
    try {
      const response = await getAllMyBoothLayout();
      if (response.status === 204) {
        setMyBoothLayouts([]);
        return;
      }
      const { data } = response;
      const finalData = data
        .sort((a, b) => b.createTime - a.createTime)
        .map((item) => ({
          ...item,
          imgUrl: '/my-layout-tmp.png'
        }));
      setMyBoothLayouts(finalData);
    } catch (e) {
      notification['info']({
        message: `Error happens`,
        description: `There is problem while fetch booth layout, try again later`,
        duration: 2
      });
      //close modal
      setMyLayoutVisibility(false);
    }
  };

  const handleChoose = (id) => {
    const modal = Modal.confirm();
    modal.update({
      title: 'Confirm using layout',
      content: 'Are you sure you wanna you this layout? (The current design will be replace!)',
      onOk: () => {
        dispatch(decorateBoothAction.setModelId(id));
        Modal.destroyAll();
        setMyLayoutVisibility(false);
      },
      onCancel: () => {
        modal.destroy();
      }
    });
  };

  const handleDeleteLayout = (layoutId) => {
    const modal = Modal.confirm();
    modal.update({
      title: 'Confirm using layout',
      content: 'Are you sure you wanna delete this layout?',
      onOk: async () => {
        try {
          await deleteBoothLayoutInMyBoothLayout(layoutId);
          await fetchData();
        } catch (e) {
          notification['info']({
            message: `Error happens`,
            description: `There is problem while delete layout, try again later`,
            duration: 2
          });
        }
      },
      onCancel: () => {
        modal.destroy();
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, [myLayoutVisibility]);

  return (
    <Modal
      footer={false}
      visible={myLayoutVisibility}
      title='My booth layout'
      onOk={handleOk}
      onCancel={handleCancel}
      width='100rem'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', minHeight: '500px' }}>
        {myBoothLayouts.length > 0 ? (
          myBoothLayouts.map((layout) => (
            <Card
              onClick={deletable ? null : () => handleChoose(layout?.id)}
              hoverable
              style={{
                width: 240,
                marginBottom: '2rem',
                height: 'fit-content',
                marginRight: '2rem'
              }}
              cover={<img alt='example' src={layout?.imgUrl} />}>
              <Meta
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>{layout?.name}</Typography>
                    {deletable ? (
                      <Tooltip title='delete this layout'>
                        <Button
                          shape='circle'
                          icon={<DeleteOutlined />}
                          size='small'
                          onClick={() => handleDeleteLayout(layout?.id)}
                        />
                      </Tooltip>
                    ) : null}
                  </div>
                }
                description={moment(layout.createTime).format(CustomDateFormat)}
              />
            </Card>
          ))
        ) : (
          <Typography>There is no booth in here</Typography>
        )}
      </div>
    </Modal>
  );
};

export default MyBoothLayoutListContainer;
