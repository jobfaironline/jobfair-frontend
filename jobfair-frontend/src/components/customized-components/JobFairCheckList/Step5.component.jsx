import { Button, Row, Tooltip, Typography } from 'antd';
import { StepComponent } from './Step.component';

const { Text } = Typography;

export const Step5Component = (props) => {
  const { isFinish, progressScore, handlePublishJobFair, hasAnotherPublishJobFair } = props;
  return (
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
        </div>

        <div className={'button-container'}>
          {hasAnotherPublishJobFair ? (
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
          ) : (
            <Button
              disabled={progressScore !== 80}
              className={'button'}
              type={'primary'}
              onClick={handlePublishJobFair}>
              Publish
            </Button>
          )}
        </div>
      </div>
    </StepComponent>
  );
};
