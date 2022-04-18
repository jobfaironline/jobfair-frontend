import './SideBar.style.scss';
import { Button, Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

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
  isDisplayPrevButton = true
}) => (
  <Row wrap={false} className={'organize-job-fair-side-bar'}>
    <Col flex={ratio.toString()}>{leftSide}</Col>
    <Col flex={(1 - ratio).toString()}>
      <div className={'side-bar-right-side-container'}>
        <Button
          className={'prev-button'}
          type='primary'
          onClick={onPrev}
          style={{ display: isDisplayPrevButton ? 'block' : 'none' }}
          disabled={isPrevButtonDisable}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
          <span>{prevButtonContent}</span>
        </Button>
        {rightSide}
        <div className={'button-container'} style={{ display: isDisplayNextButton ? 'flex' : 'none' }}>
          <Button className={'confirm-button'} type='primary' onClick={onNext} disabled={isNextButtonDisable}>
            {nextButtonContent}
          </Button>
        </div>
      </div>
    </Col>
  </Row>
);
