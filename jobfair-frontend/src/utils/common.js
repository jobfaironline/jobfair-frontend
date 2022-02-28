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
  const date = new Date(dateValue)
  return date.toISOString()
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
