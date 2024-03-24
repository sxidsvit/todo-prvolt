import { useState, useCallback } from 'react'
import { useDispatch } from "react-redux";
import { z } from 'zod'
import { editRecord } from "../store/todosSlice";

import { N } from '../constants'


const EditTodoItem = ({ record }) => {

  const [editedRecord, setEditedRecord] = useState(record.text);
  const [error, setError] = useState(null);

  const schema = z.string().refine((value) => value.length <= N, {
    message: `The length of the line should not exceed ${N} symbols`,
  });

  const dispatch = useDispatch();

  const handleEditRecord = useCallback(() => {
    if (editedRecord.trim() !== "") {

      dispatch(editRecord({ editedRecord, id: record.id }));
    }
  }, [dispatch, editedRecord, record.id]);


  const handleChange = useCallback((e) => {
    const value = e.target.value;
    try {
      schema.parse(value);
      setEditedRecord(value);
      setError(null);
    } catch (error) {
      setError(error.errors[0].message);
    }
  }, [schema]);


  return (
    <>
      <div className="min-h-[74px]">
        <div className="listItem justify-between">
          <input className="text-gray-800 text-[10px] px-4 rounded-md w-[360px]"
            type="text"
            placeholder={record.text}
            value={editedRecord}
            onChange={handleChange}
          />
          <button
            className={`buttonTodo max-w-[92px]  ${error ? "text-gray-600 hover:text-gray-600" : ""}`}
            disabled={error}
            onClick={handleEditRecord}>
            Save
          </button>
        </div>
        {error && <p className="error text-red-500 text-[10px]">{error}</p>}
      </div>
    </>

  )

}

export default EditTodoItem