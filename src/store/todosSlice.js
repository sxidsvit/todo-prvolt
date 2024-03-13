import { createSlice } from '@reduxjs/toolkit'
import { setLocalStorage, getLocalStorage } from "../utils"

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    records: getLocalStorage().records || [],
    filtering: getLocalStorage().filtering || "all",
    editing: getLocalStorage().editing || "false",
  },
  reducers: {
    addRecord: (state, action) => {
      const newRecord = {
        id: new Date().getTime(),
        text: action.payload.newRecord,
        completed: false,
        editing: false,
      }
      state.records?.push(newRecord)
      setLocalStorage(
        state.records,
        state.filtering,
        state.editing,
      )
    },
    toggleStatus: (state, action) => {
      const toggledTodo = state.records.find(record => record.id === action.payload.id);
      toggledTodo.completed = !toggledTodo.completed;
      setLocalStorage(
        state.records,
        state.filtering,
        state.editing,
      )
    },
    editRecord: (state, action) => {
      const toggledTodo = state.records.find(record => record.id === action.payload.id);
      toggledTodo.text = action.payload.editedRecord;
      toggledTodo.editing = false;

      setLocalStorage(
        state.records,
        state.filtering,
        state.editing,
      )
    },
    setEditing: (state, action) => {
      const editedTodo = state.records.find(record => record.id === action.payload.id);
      editedTodo.editing = 'true';
      setLocalStorage(
        state.records,
        state.filtering,
        state.editing,
      )
    },


    removeRecord: (state, action) => {
      state.records = state.records.filter((record) => record.id !== action.payload.id)
      setLocalStorage(
        state.records,
        state.filtering,
        state.editing,
      )
    },
    setFilter: (state, action) => {
      state.filtering = action.payload.selectedFilter
      setLocalStorage(
        state.records,
        state.filtering,
        state.editing,
      )
    }
  }
})

export const { addRecord, editRecord, removeRecord, toggleStatus, setFilter, setEditing } = todosSlice.actions

export default todosSlice.reducer