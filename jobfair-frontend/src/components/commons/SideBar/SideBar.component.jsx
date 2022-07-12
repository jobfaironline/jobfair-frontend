import './SideBar.style.scss';
import { Button, Col, Row, Steps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Step } = Steps;

export const SideBarComponent = ({
  leftSide,
  rightSide,
  ratio,
  nextButtonContent = 'Next',
  prevButtonContent = 'Return',
  onNext,
  onPrev,
  isNextButtonDisable,
  isPrevButtonDisable,
  isDisplayNextButton = true,
  isDisplayPrevButton = true,
  currentStep,
  isOrganizeJobFair = true,
  leftSideMinWidth = 0,
  rightSideMinWidth = 0
}) => (
  <Row wrap={false} className={'organize-job-fair-side-bar'}>
    <Col flex={ratio.toString()} style={{ minWidth: leftSideMinWidth }}>
      <div className={'side-bar-left-side-container'}>
        {isOrganizeJobFair ? (
          <>
            <Button
              className={'prev-button'}
              type='primary'
              onClick={onPrev}
              style={{ display: isDisplayPrevButton ? 'block' : 'none' }}
              disabled={isPrevButtonDisable}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
              <span>{prevButtonContent}</span>
            </Button>
            <Steps
              current={currentStep}
              style={{
                background: '#FFF',
                zIndex: '1000',
                padding: '1rem 3rem',
                borderBottom: '0.5px solid gray',
                marginBottom: '1rem'
              }}>
              <Step />
              <Step />
              <Step />
              <Step />
            </Steps>{' '}
          </>
        ) : null}

        {leftSide}

        {isOrganizeJobFair ? (
          <div className={'button-container'} style={{ display: isDisplayNextButton ? 'flex' : 'none' }}>
            <Button className={'confirm-button'} type='primary' onClick={onNext} disabled={isNextButtonDisable}>
              {nextButtonContent}
            </Button>
          </div>
        ) : null}
      </div>
    </Col>
    <Col flex={(1 - ratio).toString()} style={{ minWidth: rightSideMinWidth }}>
      {rightSide}
    </Col>
  </Row>
);
