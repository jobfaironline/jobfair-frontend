import moment from 'moment'

export const contains = (list, listCurrent) => {
  var result = false
  list.forEach(e => {
    if (listCurrent?.includes(e) === true) {
      result = true
      return
    }
  })
  return result
}

export const transformToSelections = data => {
  if (!data) return null
  if (Array.isArray(data) && !data.length) return null

  if (Array.isArray(data)) {
    return data.map(item => toSelection(item))
  }

  return [toSelection(data)]
}

const toSelection = data => {
  if (data?.user) {
    return { value: data.user?.id, label: data.user?.email }
  }

  return { value: data?.id, label: data?.name }
}

export const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

export const convertToDateString = dateValue => {
  return new Date(dateValue).toISOString().replace(/T.*/,'').split('-').reverse().join('-')
}

export const convertToDateValue = dateString => {
  return Date.parse(dateString)
}

export const convertToMoment = data => {
  const result = data.map(item => {
    return {
      ...item,
      range: [
        moment(convertToDateString(item.fromDate)),
        moment(convertToDateString(item.toDate))
      ]
    }
  })
  return result
}

//attendantProfileForm.container.jsx
export const handleConvertRangePicker = data => {
  const result = data.map(item => {
    return {
      ...item,
      fromDate: convertToDateValue(item.range[0].format()),
      toDate: convertToDateValue(item.range[1].format())
    }
  })
  return result
}

//convert enum status to string
export const convertEnumToString = (data) => {
  const arr = data.split('_') //['INTERN', 'SHIP', 'STUDENT']
  const result = arr
      .map(item => item.toString().toLowerCase())
      .map(item => item[0].toUpperCase() + item.slice(1))
      .join(' ');
  return result;
}

//
export const mapperJobFairDetail = (data, creatorInfo) => {
  return {
    attendantRegisterStartTime: data?.attendantRegisterStartTime,
    companyBuyBoothEndTime: data?.companyBuyBoothEndTime,
    companyBuyBoothStartTime: data?.companyBuyBoothStartTime,
    companyRegisterEndTime: data?.companyRegisterEndTime,
    companyRegisterStartTime: data?.companyRegisterStartTime,
    creatorInfo: creatorInfo,
    description: data?.description,
    endTime: data?.endTime,
    id: data?.id,
    layoutId: data?.layoutId,
    startTime: data?.startTime,
    status: data?.status,
    name: data?.name,
    estimateParticipant: data?.estimateParticipant,
    targetCompany: data?.targetCompany,
    targetAttendant: data?.targetAttendant,
  }
}

export const mapperResponseJobFairForAdmin = (res) => {
  return res.data.content.map((item, index) => {
    return {
      no: index + 1,
      id: item.jobFair.id,
      companyRegisterStartTime: convertToDateString(item.jobFair.companyRegisterStartTime),
      companyRegisterEndTime: convertToDateString(item.jobFair.companyRegisterEndTime),
      companyBuyBoothStartTime: convertToDateString(item.jobFair.companyBuyBoothStartTime),
      companyBuyBoothEndTime: convertToDateString(item.jobFair.companyBuyBoothEndTime),
      attendantRegisterStartTime: convertToDateString(item.jobFair.attendantRegisterStartTime),
      startTime: convertToDateString(item.jobFair.startTime),
      endTime: convertToDateString(item.jobFair.endTime),
      description: item.jobFair.description,
      layoutId: item.jobFair.layoutId,
      creatorId: item.jobFair.creatorId,
      name: item.jobFair.name,
      estimateParticipant: item.jobFair.estimateParticipant,
      targetCompany: item.jobFair.targetCompany,
      targetAttendant: item.jobFair.targetAttendant,
      status: item.status
    }
  })
}