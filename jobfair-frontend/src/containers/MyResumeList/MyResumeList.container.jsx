import { Input, Modal, Typography, notification } from 'antd';
import { PATH_ATTENDANT } from '../../constants/Paths/Path';
import { deleteCv, getAttendantCv } from '../../services/jobhub-api/CvControllerService';
import { generatePath, useHistory } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import ResumeGridComponent from '../../components/customized-components/ResumeGrid/ResumeGrid.component';

const { Search } = Input;
const MyResumeListContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  const [confirmDeleteVisibility, setConfirmDeleteVisibility] = useState(false);
  const seletedResumeIdRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAttendantCv();
      let content = [];
      if (res.status === 200) content = res.data;

      content.unshift({ isFirst: true });
      setData(content);
    } catch (e) {
      notification['error']({
        message: `Fetch resumes fail`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const handleAddCv = () => {
    history.push(PATH_ATTENDANT.ADD_RESUME_PAGE);
  };

  const handleViewCvDetail = (resumeId) => {
    const url = generatePath(PATH_ATTENDANT.RESUME_DETAIL_PAGE, { id: resumeId });
    history.push(url);
  };

  const handleDeleteCv = async (resumeId) => {
    seletedResumeIdRef.current = resumeId;
    setConfirmDeleteVisibility(true);
  };

  const closeModal = () => {
    setConfirmDeleteVisibility(false);
  };

  const deleteCV = async () => {
    if (seletedResumeIdRef.current === undefined) return;
    try {
      await deleteCv(seletedResumeIdRef.current);
      notification['success']({
        message: `Success`,
        description: `Delete successfully`,
        duration: 2
      });
      closeModal();
      fetchData();
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while delete cv, try again later`,
        duration: 2
      });
    }
  };

  // eslint-disable-next-line no-unused-vars,no-empty-function
  const handleOnSearch = (searchValue) => {};

  return (
    <>
      <Modal visible={confirmDeleteVisibility} title={'Delete confirmation'} onCancel={closeModal} onOk={deleteCV}>
        <Typography.Text>
          Deleting this document will permanently remove it and all of it's content. This cannot be undone.
        </Typography.Text>
      </Modal>
      <div className={'job-fair-grid-public-container'}>
        <div className={'header'}>
          <Search
            placeholder='Search by resume name'
            onSearch={(value) => handleOnSearch(value)}
            style={{ width: '30rem', marginRight: '5rem' }}
          />
        </div>
        <ResumeGridComponent
          data={data}
          onAddCv={handleAddCv}
          handleViewCvDetail={handleViewCvDetail}
          handleDeleteCv={handleDeleteCv}
        />
      </div>
    </>
  );
};

export default MyResumeListContainer;
