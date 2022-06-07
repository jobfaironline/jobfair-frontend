import { Card, Descriptions, Image, Tag, Typography, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { SizeConst, SubCategories } from '../../constants/CompanyProfileConstant';
import { getCompanyProfileAPI } from '../../services/jobhub-api/CompanyControllerService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const { Title } = Typography;

export const CompanyProfileContainer = () => {
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const data = (await getCompanyProfileAPI(companyId)).data;
      setData({
        data,
        benefits: data.companyBenefitDTOS.map((item) => ({
          ...item,
          id: item.benefitDTO.id,
          description: item.benefitDTO.description
        })),
        mediaUrls: data.mediaDTOS,
        subCategoriesIds: data.subCategoryDTOs.map((item) => item.id),
        url: data.websiteUrl
      });
    } catch (e) {
      notification['error']({
        message: `Fetch company profile failed`,
        description: `Failed for company with ${companyId}`
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data) {
    return (
      <div>
        <Card
          title=''
          style={{
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            marginBottom: '2rem'
          }}
          headStyle={{ backgroundColor: 'white', border: 0 }}
          bodyStyle={{ backgroundColor: 'white', border: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Image height={'10rem'} src={data.data.companyLogoURL} />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Descriptions
              title={
                <Title style={{ marginBottom: 0, fontWeight: '700' }} level={3}>
                  {data.data.name}
                </Title>
              }
              column={1}>
              <Descriptions.Item label={'Address'}>{data.data.address}</Descriptions.Item>
              <Descriptions.Item label={'Website'}>{data.url}</Descriptions.Item>
              <Descriptions.Item label={'Size'}>
                {SizeConst.find((item) => item.value === data.data.sizeId)?.label}
              </Descriptions.Item>
              <Descriptions.Item label={'Company industry'}>
                {data.subCategoriesIds.map((categoryId) => (
                  <Tag>{SubCategories.find((item) => item.value === categoryId)?.label}</Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label={'Company description'}>{data.data.companyDescription}</Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </div>
    );
  }

  return <LoadingComponent isWholePage={true} />;
};
