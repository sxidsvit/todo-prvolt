import { createSlice } from '@reduxjs/toolkit'

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    filtering: 'all',
    records: [],
  },
  reducers: {
    addRecord: (state, action) => {
      const newRecord = {
        id: new Date().getTime(),
        text: action.payload.newRecord,
        completed: false,
      }
      state.records.push(newRecord)
    },
    toggleStatus: (state, action) => {
      const toggledTodo = state.records.find(record => record.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
    },
    removeRecord: (state, action) => {
      state.records = state.records.filter((record) => record.id !== action.payload.id)
    },
    setFilter: (state, action) => {
      console.log('setFilter - action.payload: ', action.payload);
      state.filtering = action.payload.selectedFilter
    }
  }
})

export const { addRecord, removeRecord, toggleStatus, setFilter } = todosSlice.actions

export default todosSlice.reducer