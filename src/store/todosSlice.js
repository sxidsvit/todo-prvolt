import { createSlice } from '@reduxjs/toolkit'
import { setLocalStorage, getLocalStorage } from "../utils"

export const todosSlice = createSlice({
  name: 'todos',

  initialState: {
    records: getLocalStorage().records || [],
    filtering: getLocalStorage().filtering || "all",
  },

  selectors: {
    selectRecords: state => state.records,
    selectFiltering: state => state.filtering
  },

  reducers: (create) => ({
    addRecord: create.reducer((state, action) => {
      const newRecord = {
        id: new Date().getTime(),
        text: action.payload.newRecord,
        completed: false,
        editing: false
      }
      state.records?.unshift(newRecord)
      setLocalStorage(
        state.records,
        state.filtering,
      )
    }),

    toggleStatus: create.reducer((state, action) => {
      const toggledTodo = state.records.find(record => record.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
      setLocalStorage(
        state.records,
        state.filtering,
      )
    }),

    editRecord: create.reducer((state, action) => {
      const toggledTodo = state.records.find(record => record.id === action.payload.id);
      toggledTodo.text = action.payload.editedRecord;
      toggledTodo.editing = false;
      setLocalStorage(
        state.records,
        state.filtering,
      )
    }),

    setEditing: create.reducer((state, action) => {
      const editedTodo = state.records.find(record => record.id === action.payload.id);
      editedTodo.editing = true;
      setLocalStorage(
        state.records,
        state.filtering,
      )
    }),

    removeRecord: create.reducer((state, action) => {
      state.records = state.records.filter((record) => record.id !== action.payload.id)
      setLocalStorage(
        state.records,
        state.filtering,
      )
    }),

    setFilter: create.reducer((state, action) => {
      state.filtering = action.payload.selectedFilter
      setLocalStorage(
        state.records,
        state.filtering,
      )
    })
  })
})

export const { addRecord, editRecord, removeRecord, toggleStatus, setFilter, setEditing } = todosSlice.actions

export const { selectRecords, selectFiltering } = todosSlice.selectors

export default todosSlice.reducer