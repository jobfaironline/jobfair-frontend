import React, { useEffect, useState } from 'react';

import './BoothJobPositionTab.styles.scss';
import { CompanyJobPositionTab } from '../../../components/customized-components/BoothInfoMenu/BoothJobPositionTab/BoothJobPositionTab.component';
import { DragAndDropResumeComponent } from '../../../components/customized-components/DragAndDropResume/DragAndDropResume.component';
import { Modal, notification } from 'antd';
import { PATH_ATTENDANT } from '../../../constants/Paths/Path';
import { RemoveResumeComponent } from '../../../components/customized-components/DragAndDropResume/RemoveResume.component';
import { TestStatus } from '../../../constants/ApplicationConst';
import { createQuiz } from '../../../services/jobhub-api/QuizControllerService';
import {
  draftApplication,
  getApplicationById,
  submitApplication
} from '../../../services/jobhub-api/ApplicationControllerService';
import { generatePath, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ConfirmSubmitResumeFormComponent from '../../../components/forms/SubmitResumeForm/ConfirmSubmitResumeForm.component';
import JobPositionDetailModalComponent from '../../../components/customized-components/JobPositionDetailModal/JobPositionDetailModal.component';

export const BoothJobPositionTabContainer = (props) => {
  const { jobPositions, openInventory, companyInfo } = props;
  const location = useLocation();
  const { boothJobPositionId, cvId, applicationId, quizId } = location.state ?? {};
  const history = useHistory();
  const inventory = useSelector((state) => state.inventory.data);
  const [selectedJobPosition, setSelectedJobPosition] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedResume, setSelectedResume] = useState();
  const [applicationData, setApplicationData] = useState();

  useEffect(() => {
    renderAfterDoQuiz();
  }, []);

  const renderAfterDoQuiz = async () => {
    if (boothJobPositionId) {
      const jobPosition = jobPositions.find((jobPosition) => jobPosition.id === boothJobPositionId);
      if (jobPosition) {
        let resume;
        for (const [key, value] of Object.entries(inventory)) {
          if (value.id === cvId) {
            resume = inventory[key];
            break;
          }
        }
        if (resume) {
          const data = (await getApplicationById(applicationId)).data;
          setApplicationData(data);
          setSelectedJobPosition(jobPosition);
          setIsModalVisible(true);
          setSelectedResume(resume);
        }
      }
    }
  };

  const onClick = (item) => {
    openInventory(true);
    setSelectedJobPosition(item);
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
    openInventory(false);
    setSelectedJobPosition(undefined);
  };

  const onDragResumeOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDropResume = (event) => {
    const dragId = event.dataTransfer.getData('text/plain');
    const resume = inventory[dragId];
    setSelectedResume(resume);
  };
  const onRemoveResume = () => {
    setSelectedResume(undefined);
  };

  const confirmMakeTest = async () =>
    new Promise((resolve) => {
      Modal.info({
        title: 'Test required',
        closable: true,
        maskClosable: true,
        centered: true,
        content: 'This job position required an entry test. Do you want to do it?',
        onCancel: () => resolve(false),
        onOk: () => resolve(true)
      });
    });

  const onFinishSubmitForm = async (values) => {
    if (selectedResume === undefined) return;

    const body = {
      ...values,
      cvId: selectedResume.id,
      boothJobPositionId: selectedJobPosition.id
    };
    try {
      if (applicationData) {
        if (applicationData.testStatus === TestStatus.PASS) await submitApplication(applicationData.id);
        return;
      }

      const response = await draftApplication(body);
      const data = response.data;
      if (selectedJobPosition.isHaveTest) {
        const result = await confirmMakeTest();
        if (result) {
          const quizData = (await createQuiz(data.id)).data;
          const url = generatePath(PATH_ATTENDANT.ATTEMPT_TEST_PAGE, {
            quizId: quizData.id
          });
          history.push(url, { from: window.location.pathname });
          return;
        }
      }

      await submitApplication(data.id);
      setApplicationData(undefined);
      notification['success']({
        message: 'Your application has been submitted'
      });
    } catch (err) {
      notification['error']({
        message: err.response.data.message
      });
    }
    setIsModalVisible(false);
    setSelectedResume(undefined);
  };

  const componentProps = { jobPositions, onClick, companyInfo };

  return (
    <>
      <CompanyJobPositionTab {...componentProps} />
      <Modal
        title={'Apply to job position'}
        width={'70rem'}
        closable={true}
        maskClosable={true}
        footer={null}
        onCancel={onModalClose}
        zIndex={2}
        visible={isModalVisible}
        wrapClassName={'company-job-position-tab-modal'}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <JobPositionDetailModalComponent data={selectedJobPosition} companyInfo={companyInfo} />
          {selectedResume === undefined ? (
            <>
              <DragAndDropResumeComponent onDragOver={onDragResumeOver} onDrop={onDropResume} />
            </>
          ) : (
            <>
              <RemoveResumeComponent selectedResume={selectedResume} onRemoveResume={onRemoveResume} />
              <ConfirmSubmitResumeFormComponent
                onFinish={onFinishSubmitForm}
                applicationData={applicationData}
                quizId={quizId}
              />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
