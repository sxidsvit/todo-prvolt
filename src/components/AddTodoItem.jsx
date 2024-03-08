import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from "react-redux";

import { addRecord } from "../storage/actions";
import { useDebounce } from '../hooks';

const AddTodoItem = () => {

  const [newRecord, setNewRecord] = useState("");
  const dispatch = useDispatch();
  const debouncedValue = useDebounce(newRecord);

  useEffect(() => {
  }, [debouncedValue])

  const handleAddRecord = useCallback(() => {
    if (newRecord.trim() !== "") {
      dispatch(addRecord(newRecord));
      location.reload();
      setNewRecord("");
    }
  }, [dispatch, newRecord]);

  const handleChange = useCallback((e) => {
    setNewRecord(e.target.value);
  }, []);

  return (
    <div className="flex gap-3 justify-center p-2">
      <input className="text-gray-800 px-4 rounded-md"
        type="text"
        value={newRecord}
        onChange={handleChange}
      />
      <button className="buttonTodo" onClick={handleAddRecord}>
        Add Record
      </button>
    </div>

  )

}

export default AddTodoItem