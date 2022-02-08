import {IconButton, styled} from "@mui/material";
import React from "react";

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

export const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

//convert long value to YYYY-MM-DD
export const convertToDateString = (longValue) => {
  if (typeof longValue !== undefined) {
    let date = new Date(longValue);
    let options = {
      year: 'numeric', month: 'numeric', day: 'numeric',
    };
    return date.toISOString().split('T')[0];
  }
}

export const convertToDateValue = (dateString) => {
  if (typeof dateString !== undefined) {
    return Date.parse(dateString);
  }
}