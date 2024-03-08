import { ADD_RECORD, REMOVE_RECORD, TOGGLE_STATUS, SET_FILTER } from "./actionTypes";

const initialState = {
  records: [],
  filter: "all", // 'all', 'completed', 'current'
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        ...state,
        records: [
          ...state.records,
          {
            id: state.records.length + 1,
            text: action.payload.text,
            completed: false,
          },
        ],
      };

    case REMOVE_RECORD:
      const filteredRecords = state.records.filter((record) => record.id !== action.payload.id)
      return {
        ...state,
        records: filteredRecords
      };

    case TOGGLE_STATUS:
      return {
        ...state,
        records: state.records.map((record) =>
          record.id === action.payload.id
            ? { ...record, completed: !record.completed }
            : record
        ),
      };

    case SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      };

    default:
      return state;
  }
};

export default reducer;
