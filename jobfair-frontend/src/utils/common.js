export const contains = (list, listCurrent) => {
  var result = false;
  list.forEach((e) => {
    if (listCurrent?.includes(e) === true) {
      result = true;
      return;
    }
  });
  return result;
};

export const transformToSelections = (data) => {
  if (!data) return null;
  if (Array.isArray(data) && !data.length) return null;

  if (Array.isArray(data)) {
    return data.map((item) => toSelection(item));
  }

  return [toSelection(data)];
};

const toSelection = (data) => {
  if (data?.user) {
    return { value: data.user?.id, label: data.user?.email };
  }

  return { value: data?.id, label: data?.name };
};

export const convertToDateString = (dateValue) => {
  const date = new Date(dateValue);
  const dateString = date.toISOString().split('T')[0]; //yyyy-mm-dd
  const result = dateString.replaceAll('-', '/');
  return result;

}

export const convertToDateValue = (dateString) => {
  return Date.parse(dateString);
}