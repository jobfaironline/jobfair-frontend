import './AssignEmployeBoothList.style.scss';
import { Button, Card, Divider, List, Skeleton, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCircleCheck, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import SideBarComponent from '../../commons/SideBar/SideBar.component';
const { Title, Text } = Typography;

export const AssignEmployeeBoothList = (props) => {
  const { data, onHoverIn, onHoverOut, onClick, onHandlePrev, onHandleNext } = props;
  return (
    <div className={'assign-employee-booth-list'}>
      <SideBarComponent>
        <a className={'prev-button'} type='primary' onClick={onHandlePrev}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
          <span>Back to set booth timeline</span>
        </a>
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
                style={{ width: '400px', border: '1px solid black', borderRadius: '20px', marginBottom: '10px' }}
                bodyStyle={{ padding: '15px' }}
                onMouseEnter={() => onHoverIn(item.booth.name)}
                onMouseLeave={() => onHoverOut()}
                onClick={() => {
                  onClick(item.id, item.booth.name);
                }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Text style={{ marginRight: '10px' }}>{`Booth name:`}</Text>
                    <Card.Meta title={item.booth.name} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Text style={{ marginRight: '10px' }}>{`Has assigned employee: `}</Text>
                    {item.assignments.length > 0 ? (
                      <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} />
                    ) : (
                      <FontAwesomeIcon icon={faXmarkCircle} style={{ color: 'red' }} />
                    )}
                  </div>
                </div>
              </Card>
            )}
          />
        </InfiniteScroll>
        <div className={'button-container'}>
          <Button className={'confirm-button'} type='primary' onClick={onHandleNext}>
            Start design landing page
          </Button>
        </div>
      </SideBarComponent>
    </div>
  );
};
