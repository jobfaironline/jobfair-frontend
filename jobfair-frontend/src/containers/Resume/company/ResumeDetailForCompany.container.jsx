import { Card, Tag, Typography, notification } from 'antd';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { ResumeDetailComponent } from '../../../components/customized-components/Resume/ResumeDetail.component';
import {
  evaluateApplication,
  getApplicationForCompany
} from '../../../services/jobhub-api/ApplicationControllerService';
import { useHistory } from 'react-router-dom';
import EvaluationFormComponent from '../../../components/forms/EvaluationForm/EvaluationForm.component';
import React, { useEffect, useState } from 'react';

const ResumeDetailForCompanyContainer = ({ resumeId }) => {
  const history = useHistory();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getApplicationForCompany(resumeId);
      setData(data);
    } catch (e) {
      notification['error']({
        message: `Fetch resume fail`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const onFinish = async (values) => {
    try {
      const body = {
        applicationId: values['applicationId'],
        evaluateMessage: values['message'],
        status: values['status']
      };

      await evaluateApplication(body);
      notification['success']({
        message: `Submit evaluation successfully`,
        description: `Your evaluation has been submitted`,
        duration: 2
      });
      history.goBack();
    } catch (e) {
      notification['error']({
        message: `Submit evaluation failed`,
        description: `There is problem while submitting, try again later`,
        duration: 2
      });
    }
  };

  if (data === undefined) return <LoadingComponent isWholePage={true} />;

  let tagColor = 'red';
  data.matchingPoint = data.matchingPoint !== undefined ? data.matchingPoint : 0;
  if (data.matchingPoint > 0.5) tagColor = 'gold';
  if (data.matchingPoint > 0.7) tagColor = 'green';

  return (
    <div style={{ marginTop: '1rem' }}>
      <Typography.Title level={1}>Candidate resume</Typography.Title>
      <ResumeDetailComponent data={data} />
      {data.status === 'PENDING' ? (
        <div style={{ paddingBottom: '5rem' }}>
          <Card
            title='Evaluate this registration'
            style={{ width: 500, margin: '2rem auto' }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}>
            <Typography.Text>
              This resume matching point is: <Tag color={tagColor}>{Math.round(data?.matchingPoint * 100)} %</Tag>
            </Typography.Text>
            <div style={{ marginLeft: '5rem' }}>
              <EvaluationFormComponent onFinish={onFinish} name='applicationId' id={data.id} />
            </div>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default ResumeDetailForCompanyContainer;
