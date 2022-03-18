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
  return new Date(dateValue).toISOString().replace(/T.*/, '').split('-').reverse().join('-')
}

export const convertToDateValue = dateString => {
  return Date.parse(dateString)
}

export const convertToMoment = data => {
  const result = data.map(item => {
    return {
      ...item,
      range: [moment(convertToDateString(item.fromDate)), moment(convertToDateString(item.toDate))]
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
export const convertEnumToString = data => {
  const arr = data.split('_') //['INTERN', 'SHIP', 'STUDENT']
  const result = arr
    .map(item => item.toString().toLowerCase())
    .map(item => item[0].toUpperCase() + item.slice(1))
    .join(' ')
  return result
}

//
export const handleCreateListEmailFromListAccount = arr => {
  let listEmail = []
  arr.map(account => {
    listEmail.push(account?.account.email)
  })
  return listEmail
}
export const handleCreateListNameFromListAccount = arr => {
  let listName = []
  arr.map(account => {
    let name = `${account?.account.middlename} ${account?.account.lastname}`
    listName.push(name)
  })
  return listName
}
//get status
export const handleGetStatus = data => {
  return data.find(item => item.key !== undefined)
}

//handle suggestion email
export const getSuggestionEmail = (listEmailSuggestion, value) => {
  let res = []
  if (!value || value.indexOf('@') >= 0) {
    res = []
  } else {
    listEmailSuggestion.map(email => {
      if (email.toLowerCase().includes(value.toLowerCase())) {
        res.push(email)
      }
    })
  }
  return res
}

//handle suggestion contact name
export const getSuggestionContactName = (listContactPersonSuggestion, value) => {
  let res = []
  if (!value) {
    res = []
  } else {
    listContactPersonSuggestion.map(name => {
      if (name.toLowerCase().includes(value.toLowerCase())) {
        res.push(name)
      }
    })
  }
  return res
}