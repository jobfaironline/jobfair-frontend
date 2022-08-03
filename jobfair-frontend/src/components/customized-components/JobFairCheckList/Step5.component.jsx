import { Button, Card, Col, Modal, Row, Tooltip, Typography } from 'antd';
import { StepComponent } from './Step.component';
import { convertToUTCString } from '../../../utils/common';
import { useSelector } from 'react-redux';
import PickSubscriptionFormContainer from '../../../containers/Subscription/PickSubscriptionForm.container';
import React, { useState } from 'react';

const { Text, Title } = Typography;

export const Step5Component = (props) => {
  const { isFinish, progressScore, handlePublishJobFair, hasAnotherPublishJobFair } = props;
  const [selectionVisible, setSelectionVisible] = useState(false);
  const chooseSubscription = useSelector((state) => state?.chooseSubscription?.subscriptionItem);

  console.log(hasAnotherPublishJobFair);
  return (
    <>
      {selectionVisible && (
        <Modal
          visible={selectionVisible}
          width={'50rem'}
          onCancel={() => setSelectionVisible(false)}
          footer={null}
          centered={true}
          title={'Select your subscription to continue'}>
          <PickSubscriptionFormContainer setSelectionVisible={setSelectionVisible} />
        </Modal>
      )}
      <StepComponent isFinish={isFinish}>
        <div className={'title'}>
          <div style={{ flex: 1 }}>
            <Row>
              <Text className={'content'} strong>
                Step 5: Publish your job fair
              </Text>
            </Row>
            <Row>
              <Text>Confirm and publish your job fair</Text>
            </Row>
            {progressScore === 80 && hasAnotherPublishJobFair === false ? (
              <Row>
                <Button type='link' onClick={() => setSelectionVisible(true)}>
                  Select subscription to publish job fair
                </Button>
              </Row>
            ) : null}
            {Object.keys(chooseSubscription).length !== 0 && (
              <Card style={{ backgroundColor: '#E99937', color: 'black', borderRadius: '15px' }}>
                <Title level={5}>Subscription detail</Title>
                <Row>
                  <Col>Package name: {chooseSubscription.name}</Col>
                </Row>
                <Row>
                  <Col>Expired date : {convertToUTCString(chooseSubscription.currentPeriodEnd)}</Col>
                </Row>
                <Row>
                  <Col>
                    Job fair published:{' '}
                    {chooseSubscription.subscriptionPlan?.jobfairQuota - chooseSubscription.jobfairQuota}
                  </Col>
                </Row>
                <Row>
                  <Col>Job fair left: {chooseSubscription.jobfairQuota}</Col>
                </Row>
              </Card>
            )}
          </div>

          <div className={'button-container'}>
            {progressScore === 80 && hasAnotherPublishJobFair ? (
              <Text style={{ color: 'red', marginRight: '5px' }}>There is another published job fair</Text>
            ) : null}
            {progressScore !== 80 || hasAnotherPublishJobFair ? (
              <div>
                <Tooltip title={'Please complete all steps to publish'}>
                  {/* need to wrap span outside disable button if using tool tip: https://github.com/react-component/tooltip/issues/18#issuecomment-411476678*/}
                  <span>
                    <Button style={{ pointerEvents: 'none' }} disabled={true} className={'button'} type={'primary'}>
                      Publish
                    </Button>
                  </span>
                </Tooltip>
              </div>
            ) : Object.keys(chooseSubscription).length !== 0 && (progressScore === 80 || hasAnotherPublishJobFair) ? (
              <span>
                <Button
                  disabled={progressScore !== 80}
                  className={'button'}
                  type={'primary'}
                  onClick={handlePublishJobFair}>
                  Publish
                </Button>
              </span>
            ) : (
              <Text type={'danger'}>You need to choose subscription to publish job fair</Text>
            )}
          </div>
        </div>
      </StepComponent>
    </>
  );
};
