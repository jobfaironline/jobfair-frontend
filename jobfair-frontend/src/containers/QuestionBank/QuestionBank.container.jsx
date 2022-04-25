import './QuestionBank.styles.scss';
import { Button, Card, Form, Input, List, Space, Upload, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { QuestionForm } from '../../components/forms/QuestionForm/QuestionForm.component';
import { UploadOutlined } from '@ant-design/icons';
import {
  createQuestion,
  deleteQuestion,
  getQuestionByCriteria,
  updateQuestion
} from '../../services/jobhub-api/QuestionControllerService';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getJobPositionByIDAPI } from '../../services/jobhub-api/JobControllerService';
import { loadCSVFile, uploadUtil } from '../../utils/uploadCSVUtil';
import { v4 as uuidv4 } from 'uuid';
import JobPositionDetailCollapseComponent from '../../components/customized-components/JobPositionDetailCollapse/JobPositionDetailCollapse.component';
import PaginationComponent from '../../components/commons/PaginationComponent/Pagination.component';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const QuestionBankContainer = ({ jobPositionId }) => {
  const [data, setData] = useState({
    jobPosition: undefined,
    questions: undefined,
    editingQuestionIds: [],
    newQuestionIds: [],
    errors: {},
    deletedQuestionIds: [],
    editedQuestionsIds: []
  });

  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //re-render
  const [reRender, setReRender] = useState(false);

  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const promises = [];
      promises.push(getJobPositionByIDAPI(jobPositionId));
      promises.push(getQuestionByCriteria({ pageSize, offset: currentPage }));
      const responses = await Promise.all(promises);
      const jobPositionData = responses[0].data;
      const questionData = responses[1].data.content;
      setTotalRecord(responses[1].data.totalElements);
      for (let i = 0; i < questionData.length; i++) {
        const question = questionData[i];
        question.order = i + 1;
        for (let j = 0; j < question.choicesList.length ?? 0; j++) {
          const choice = question.choicesList[j];
          choice.order = j + 1;
        }
      }
      setData((prevState) => ({ ...prevState, jobPosition: jobPositionData, questions: questionData }));
    } catch (e) {
      notification['error']({
        message: 'Error while fetching data'
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [reRender, currentPage, pageSize]);

  const onChangeUpload = async (info) => {
    await uploadUtil(info);
    //force render to fetch data after upload
    setReRender((prevState) => !prevState);
  };

  const onEditQuestion = (questionId, isAdd) => {
    data.editedQuestionsIds.push(questionId);
    let editingQuestionIds = data.editingQuestionIds;
    if (isAdd) editingQuestionIds.push(questionId);
    else editingQuestionIds = editingQuestionIds.filter((id) => id !== questionId);
    setData((prevState) => ({ ...prevState, editingQuestionIds }));
  };

  const onChangeIsCorrect = (questionId, answerId, value) => {
    const question = data.questions.find((question) => question.id === questionId);
    const answer = question.choicesList.find((answer) => answer.id === answerId);
    answer.isCorrect = value;
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onDeleteAnswer = (questionId, answerId) => {
    const question = data.questions.find((question) => question.id === questionId);
    question.choicesList = question.choicesList.filter((answer) => answer.id !== answerId);
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onAddAnswer = (questionId) => {
    const question = data.questions.find((question) => question.id === questionId);
    const answer = {
      id: uuidv4(),
      content: '',
      isCorrect: false,
      questionId: question.id,
      order: question.choicesList.length + 1
    };
    question.choicesList.push(answer);
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onDeleteQuestion = (questionId) => {
    data.questions = data.questions.filter((question) => question.id !== questionId);
    data.deletedQuestionIds.push(questionId);
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onQuestionContentChange = async (questionId, value) => {
    const question = data.questions.find((question) => question.id === questionId);
    question.content = value;
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onAnswerContentChange = async (questionId, answerId, value) => {
    const question = data.questions.find((question) => question.id === questionId);
    const answer = question.choicesList.find((answer) => answer.id === answerId);
    answer.content = value;
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onAddQuestion = () => {
    const question = {
      choicesList: [],
      content: '',
      createDate: 0,
      id: uuidv4(),
      jobPositionId: data.jobPosition.id,
      order: 1,
      status: 'ACTIVE',
      updateDate: 0
    };
    data.questions.unshift(question);
    //re-order question
    for (let i = 0; i < data.questions.length; i++) {
      const question = data.questions[i];
      question.order = i + 1;
    }
    data.newQuestionIds.push(question.id);
    data.editingQuestionIds.push(question.id);
    data.editedQuestionsIds.push(question.id);
    setData((prevState) => ({ ...prevState, ...data }));
  };

  const onSave = async () => {
    //form validation
    try {
      await form.validateFields();
    } catch (e) {
      const errorsArray = form.getFieldsError();
      for (const error of errorsArray) {
        if (error.errors.length > 0) {
          form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
          break;
        }
      }
      return;
    }
    //additional error
    data.questions.forEach((question) => {
      if (question.choicesList.length === 0) {
        data.errors[question.id] = 'Cannot have empty choice';
        return;
      }
      const correctAnswer = question.choicesList.find((answer) => answer.isCorrect);
      if (!correctAnswer) data.errors[question.id] = 'Must have at least 1 correct answer';
    });
    if (Object.keys(data.errors).length > 0) {
      const firstError = Object.keys(data.errors)[0];
      form.scrollToField(firstError, { behavior: 'smooth', block: 'start' });
      setData((prevState) => ({ ...prevState, ...data }));
      return;
    }

    const updatedQuestion = data.questions.filter(
      (question) =>
        data.editedQuestionsIds.includes(question.id) &&
        !data.newQuestionIds.includes(question.id) &&
        !data.deletedQuestionIds.includes(question.id)
    );
    const newQuestion = data.questions.filter((question) => data.newQuestionIds.includes(question.id));
    const promises = [];
    updatedQuestion.forEach((question) => {
      const body = {
        jobPositionId: data.jobPosition.id,
        id: question.id,
        content: question.content,
        choicesList: question.choicesList.map((answer) => ({ content: answer.content, correct: answer.isCorrect }))
      };
      const promise = updateQuestion(body);
      promises.push(promise);
    });
    newQuestion.forEach((question) => {
      const body = {
        jobPositionId: data.jobPosition.id,
        content: question.content,
        choicesList: question.choicesList.map((answer) => ({ content: answer.content, correct: answer.isCorrect }))
      };
      const promise = createQuestion(body);
      promises.push(promise);
    });
    data.deletedQuestionIds.forEach((questionId) => {
      const promise = deleteQuestion(questionId);
      promises.push(promise);
    });

    try {
      await Promise.all(promises);
      setData((prevState) => ({
        ...prevState,
        editingQuestionIds: [],
        newQuestionIds: [],
        errors: {},
        editedQuestionsIds: []
      }));
      setReRender((prevState) => !prevState);
      notification['success']({
        message: `Save successfully`
      });
    } catch (e) {
      notification['error']({
        message: `Update question fail`,
        description: `There is problem while updating, try again later`
      });
    }
  };

  const onCancel = () => {
    setData((prevState) => ({
      ...prevState,
      editingQuestionIds: [],
      newQuestionIds: [],
      errors: {},
      editedQuestionsIds: []
    }));
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  if (data.questions === undefined || data.jobPosition === undefined) return <LoadingComponent />;

  return (
    <div className={'question-bank'}>
      <div className={'header'}>
        <Search placeholder='Search question' className={'search-bar'} />
        <Space className={'upload-section'}>
          <Upload {...loadCSVFile(onChangeUpload)}>
            <Button icon={<UploadOutlined />}>Upload CSV</Button>{' '}
          </Upload>
        </Space>
      </div>
      <JobPositionDetailCollapseComponent jobPosition={data.jobPosition} />
      <Card
        hoverable={true}
        className={'add-more-question'}
        onClick={() => {
          onAddQuestion();
        }}>
        <FontAwesomeIcon icon={faPlus} size={'2x'} color={'black'} />
      </Card>
      <List
        dataSource={data.questions}
        renderItem={(item) => {
          const isEdit = data.editingQuestionIds.includes(item.id);
          const error = data.errors[item.id];
          return (
            <QuestionForm
              form={form}
              error={error}
              question={item}
              onEditQuestion={onEditQuestion}
              isEdit={isEdit}
              onChangeIsCorrect={onChangeIsCorrect}
              onDeleteAnswer={onDeleteAnswer}
              onAddAnswer={onAddAnswer}
              onDeleteQuestion={onDeleteQuestion}
              onQuestionContentChange={onQuestionContentChange}
              onAnswerContentChange={onAnswerContentChange}
            />
          );
        }}
      />
      <div className={'button-container'}>
        <Button className={'button'} style={{ marginLeft: 'auto'}} onClick={onSave}>
          Save
        </Button>
        <Button className={'button'} style={{ marginLeft: '20px', marginRight: '10rem' }} onClick={onCancel}>
          Cancel
        </Button>
      </div>
      <div className={'paging'}>
        <PaginationComponent handlePageChange={handlePageChange} totalRecord={totalRecord} />
      </div>
    </div>
  );
};

export default QuestionBankContainer;
