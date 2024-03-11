import { createSlice } from '@reduxjs/toolkit'
import { setLocalStorage, getLocalStorage } from "../utils"

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    records: getLocalStorage().records || [],
    filtering: getLocalStorage().filtering || "all",
  },
  reducers: {
    addRecord: (state, action) => {
      const newRecord = {
        id: new Date().getTime(),
        text: action.payload.newRecord,
        completed: false,
      }
      state.records?.push(newRecord)
      setLocalStorage(
        state.records,
        state.filtering,
      )
    },
    toggleStatus: (state, action) => {
      const toggledTodo = state.records.find(record => record.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
      setLocalStorage(
        state.records,
        state.filtering,
      )
    },
    removeRecord: (state, action) => {
      state.records = state.records.filter((record) => record.id !== action.payload.id)
      setLocalStorage(
        state.records,
        state.filtering,
      )
    },
    setFilter: (state, action) => {
      state.filtering = action.payload.selectedFilter
      setLocalStorage(
        state.records,
        state.filtering,
      )
    }
  }
})

export const { addRecord, removeRecord, toggleStatus, setFilter } = todosSlice.actions

export default todosSlice.reducer