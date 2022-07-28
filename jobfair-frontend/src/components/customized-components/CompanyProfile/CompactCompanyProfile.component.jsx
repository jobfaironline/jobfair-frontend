import './CompactCompanyProfile.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image, Tag, Typography } from 'antd';
import { SizeConst } from '../../../constants/CompanyProfileConstant';
import { faClipboardList, faGlobe, faLocationDot, faUsers } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Title, Text } = Typography;

export const CompactCompanyProfile = (props) => {
  const { data } = props;
  return (
    <div className={'compact-company-profile'}>
      <div>
        <Image height={'9rem'} src={data.companyLogoURL} />
      </div>
      <div className={'info'}>
        <Title style={{ fontWeight: '700' }} level={2}>
          {data.name}
        </Title>
        <div className={'general'}>
          <div className={'row'}>
            <Text>
              <FontAwesomeIcon icon={faLocationDot} />
              {data.address}
            </Text>
            <FontAwesomeIcon icon={faGlobe} />
            <Text>
              <a href={data.url}>{data.url}</a>
            </Text>
            <Text>
              <FontAwesomeIcon icon={faUsers} />
              {SizeConst.find((item) => item.value === data.sizeId)?.label}
            </Text>
          </div>
          <Text strong>
            <FontAwesomeIcon icon={faClipboardList} />
          </Text>
          {data.subCategoryDTOs.map((item) => (
            <Tag color='blue'>{item.name}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
