import { BoothLayoutType } from '../../constants/LayoutConstant';
import { Button, Card, Modal, Space, Tooltip, Typography, notification } from 'antd';
import { CustomDateFormat } from '../../constants/ApplicationConst';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Provider, useDispatch } from 'react-redux';
import { ReviewBoothLayoutContainer } from '../3D/ReviewBoothLayout/ReviewBoothLayout.container';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import {
  deleteBoothLayoutInMyBoothLayout,
  getAllMyBoothLayout
} from '../../services/jobhub-api/DecoratorBoothLayoutController';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import store from '../../redux-flow';

const { Meta } = Card;

const MyBoothLayoutListContainer = ({ myLayoutVisibility, setMyLayoutVisibility, deletable, choosable = true }) => {
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

  const handleChoose = (layoutId, layoutName) => {
    if (!choosable) {
      handlePreviewLayout(layoutId, layoutName);
      return;
    }
    const modal = Modal.confirm();
    modal.update({
      title: 'Confirm using layout',
      content: `Are you sure you want to use layout ${layoutName}? (This layout will replace the current design)`,
      onOk: () => {
        dispatch(decorateBoothAction.setModelId(layoutId));
        modal.destroy();
        setMyLayoutVisibility(false);
      },
      onCancel: () => {
        modal.destroy();
      }
    });
  };

  const handleDeleteLayout = (layoutId, layoutName) => {
    const modal = Modal.confirm();
    modal.update({
      title: 'Confirm using layout',
      content: `Are you sure you wanna delete layout: ${layoutName}?`,
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

  const handlePreviewLayout = (layoutId, layoutName) => {
    Modal.info({
      centered: true,
      width: '800px',
      title: `Layout: ${layoutName}`,
      content: (
        <div style={{ height: '500px' }}>
          <Provider store={store}>
            <ReviewBoothLayoutContainer id={layoutId} type={BoothLayoutType.DECORATOR} />
          </Provider>
        </div>
      )
    });
  };

  useEffect(() => {
    fetchData();
  }, [myLayoutVisibility]);

  return (
    <Modal
      footer={false}
      visible={myLayoutVisibility}
      centered={true}
      title='My booth layout'
      onOk={handleOk}
      onCancel={handleCancel}
      width='100rem'>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', minHeight: '500px' }}>
        {myBoothLayouts.length > 0 ? (
          myBoothLayouts.map((layout) => (
            <Card
              onClick={deletable ? null : () => handleChoose(layout?.id, layout?.name)}
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
                    <Space>
                      {deletable ? (
                        <Tooltip title='delete this layout'>
                          <Button
                            shape='circle'
                            icon={<DeleteOutlined />}
                            size='small'
                            onClick={() => handleDeleteLayout(layout?.id, layout?.name)}
                          />
                        </Tooltip>
                      ) : null}
                      <Tooltip title='preview this layout'>
                        <Button
                          shape='circle'
                          icon={<EyeOutlined />}
                          size='small'
                          onClick={(event) => {
                            event.stopPropagation();
                            handlePreviewLayout(layout?.id, layout?.name);
                          }}
                        />
                      </Tooltip>
                    </Space>
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
