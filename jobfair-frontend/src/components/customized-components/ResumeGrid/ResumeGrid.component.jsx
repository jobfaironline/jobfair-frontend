import './ResumeGrid.styles.scss';
import { Avatar, Card, List, Tooltip, Typography } from 'antd';
import { DateFormat } from '../../../constants/ApplicationConst';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import moment from 'moment';

const { Text, Title } = Typography;

const ResumeGridComponent = (props) => {
  const { data, onAddCv, handleViewCvDetail, handleDeleteCv } = props;

  return (
    <div className={'resume-grid'}>
      <List
        grid={{ gutter: 20, xs: 1, sm: 3, md: 3, lg: 5, xl: 5, xxl: 5 }}
        dataSource={data}
        renderItem={(item) => {
          if (item.isFirst) {
            return (
              <Card className={'card add-card'} hoverable={true} onClick={onAddCv}>
                <FontAwesomeIcon icon={faPlus} size={'xl'} />
              </Card>
            );
          }
          return (
            <Card
              bordered={false}
              className={'card'}
              actions={[
                <Tooltip title={'Edit'}>
                  <EyeOutlined key='edit' onClick={() => handleViewCvDetail(item.id)} />
                </Tooltip>,
                <Tooltip title={'Delete'}>
                  <DeleteOutlined key='ellipsis' onClick={() => handleDeleteCv(item.id)} />
                </Tooltip>
              ]}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar src={item.profileImageUrl} alt={item.name} size={128} />
                <Title level={4} style={{ margin: '0' }}>
                  {item.name}
                </Title>
                <Text>Created: {moment(item.createTime).format(DateFormat)}</Text>
                <Text>Last update: {moment(item.updateTime).format(DateFormat)}</Text>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
};

export default ResumeGridComponent;
