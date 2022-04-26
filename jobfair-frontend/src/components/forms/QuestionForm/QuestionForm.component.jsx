import './QuestionForm.styles.scss';
import { Card, Checkbox, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { QuestionValidation } from '../../../validate/QuestionValidation';
import { faMinus, faPen, faPlus, faTrash, faX } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const QuestionForm = (props) => {
  const {
    form,
    error,
    question,
    onEditQuestion,
    isEdit,
    onChangeIsCorrect,
    onDeleteAnswer,
    onAddAnswer,
    onDeleteQuestion,
    onQuestionContentChange,
    onAnswerContentChange
  } = props;

  const initialFormValue = {};
  initialFormValue[question.id] = question.content;
  question.choicesList?.forEach((answer) => {
    initialFormValue[answer.id] = answer.content;
  });
  form.setFieldsValue(initialFormValue);
  return (
    <Card key={question.id} className={'question-form'}>
      <div className={'button-container'}>
        {isEdit ? (
          <a onClick={() => onEditQuestion(question.id, false)}>
            <FontAwesomeIcon icon={faX} size={'1x'} color={'black'} />
          </a>
        ) : (
          <a onClick={() => onEditQuestion(question.id, true)}>
            <FontAwesomeIcon icon={faPen} size={'1x'} color={'black'} />
          </a>
        )}
        <a onClick={() => onDeleteQuestion(question.id)}>
          <FontAwesomeIcon icon={faTrash} size={'1x'} color={'black'} />
        </a>
      </div>
      <div className={'disable-form container'}>
        <div className={'order'}>{`${question.order}. Question: `}</div>
        <Form form={form} requiredMark={isEdit} className={'form'}>
          <Form.Item
            name={`${question.id}`}
            required
            rules={QuestionValidation.questionContent}
            className={'question-content'}>
            <Input.TextArea
              style={{
                width: '50rem'
              }}
              placeholder='Question Content'
              disabled={!isEdit}
              autoSize={{ minRows: isEdit ? 5 : 1 }}
              onChange={(e) => {
                onQuestionContentChange(question.id, e.target.value);
              }}
            />
          </Form.Item>
          {question.choicesList?.map((answer) => (
            <div className={'answer-container'}>
              <Checkbox
                checked={answer.isCorrect}
                disabled={!isEdit}
                onChange={(e) => {
                  onChangeIsCorrect(question.id, answer.id, e.target.checked);
                }}
                className={'check-box'}
              />
              <Form.Item
                className={'answer-input'}
                label={`${answer.order}.`}
                name={`${answer.id}`}
                required
                colon={false}
                rules={QuestionValidation.answerContent}>
                <Input.TextArea
                  style={{ width: '46rem' }}
                  placeholder={`Answer content`}
                  disabled={!isEdit}
                  autoSize={{ minRows: isEdit ? 5 : 1 }}
                  onChange={(e) => onAnswerContentChange(question.id, answer.id, e.target.value)}
                />
              </Form.Item>
              <div
                className={'remove-answer'}
                style={{ display: isEdit ? 'flex' : 'none' }}
                onClick={() => {
                  onDeleteAnswer(question.id, answer.id);
                }}>
                <FontAwesomeIcon icon={faMinus} color={'black'} />
              </div>
            </div>
          ))}
          <div
            className={'add-answer'}
            style={{ display: isEdit ? 'flex' : 'none' }}
            onClick={() => {
              onAddAnswer(question.id);
            }}>
            <FontAwesomeIcon icon={faPlus} color={'black'} />
          </div>
          {error ? <div className={'error'}>{error}</div> : null}
        </Form>
      </div>
    </Card>
  );
};
