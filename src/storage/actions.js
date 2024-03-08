// actionTypes.js

import { ADD_RECORD, REMOVE_RECORD, TOGGLE_STATUS, SET_FILTER } from "./actionTypes";

export const addRecord = (text) => {
  return {
    type: ADD_RECORD,
    payload: {
      text,
    },
  };
};

export const removeRecord = (id) => {
  return {
    type: REMOVE_RECORD,
    payload: {
      id,
    },
  };
};

export const toggleStatus = (id) => {
  return {
    type: TOGGLE_STATUS,
    payload: {
      id,
    },
  };
};

export const setFilter = (filter) => {
  return {
    type: SET_FILTER,
    payload: {
      filter,
    },
  };
};
