import { AssignmentConst } from '../../../constants/AssignmentConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip, Typography } from 'antd';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import moment from 'moment';

const { Text } = Typography;

export const AssignTaskCell = (props) => {
  const { record, title, handleOpenAssignTaskModal } = props;
  return (
    <div>
      <div className={'assignment-actions'}>
        <Tooltip title={record[title].length === 0 ? 'assign task' : 'edit task'}>
          <FontAwesomeIcon
            size={'3x'}
            icon={record[title].length === 0 ? faPlus : faPenToSquare}
            onClick={() => handleOpenAssignTaskModal(record, title)}
            color={'white'}
          />
        </Tooltip>
      </div>
      <div className={'assigment-cell-container'}>
        <div className={'mask'} />
        {Array.from({ length: record.shiftData.length }, (v, i) => i).map((shiftIndex) => {
          const assignment = record[title].find((assignment) => assignment.shift === shiftIndex);
          if (assignment === undefined) {
            return (
              <div className={'assigment-cell'}>
                <Text style={{ opacity: 0 }}>abc</Text>
              </div>
            );
          }

          const beginTime = moment(assignment.beginTime);
          const endTime = moment(assignment.endTime);
          return (
            <div
              className={'assigment-cell'}
              style={{
                backgroundColor: assignment.type === AssignmentConst.INTERVIEWER ? '#dfdf149e' : '#02fd02'
              }}>
              <Text>
                {beginTime.format('kk:mm')}-{endTime.format('kk:mm')}
              </Text>
              -<Text>{assignment.type}</Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
