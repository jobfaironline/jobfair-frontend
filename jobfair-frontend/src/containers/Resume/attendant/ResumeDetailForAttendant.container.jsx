import { convertToDateValue } from '../../../utils/common';
import { getAttendantDetailAPI } from '../../../services/jobhub-api/AttendantControllerService';
import { mapperResumeDetail } from '../../../utils/mapperResumeDetailForAttendant';
import React, { useEffect, useState } from 'react';
import ResumeDetailComponent from '../../../components/customized-components/Resume/ResumeDetail.component';

const ResumeDetailForAttendantContainer = (props) => {
  const { resume, attendantId } = props;
  const [data, setData] = useState(undefined);

  useEffect(() => {
    getAttendantDetailAPI(attendantId).then((res) => {
      const result = mapperResumeDetail(res, resume);
      setData(result);
    });
  }, []);

  const handleOnChangeDob = (dateString) => convertToDateValue(dateString);

  return (
    <>
      <ResumeDetailComponent data={data} handleOnChangeDob={handleOnChangeDob} />
    </>
  );
};

export default ResumeDetailForAttendantContainer;
