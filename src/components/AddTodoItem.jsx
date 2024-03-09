import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from "react-redux";
import { z } from 'zod'
import { addRecord } from "../storage/actions";
import { useDebounce } from '../hooks';
import { N } from '../constants'


const AddTodoItem = () => {

  const [newRecord, setNewRecord] = useState("");
  const [error, setError] = useState(null);

  const schema = z.string().refine((value) => value.length <= N, {
    message: `The length of the line should not exceed ${N} symbols`,
  });

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

  // const handleChange = useCallback((e) => {
  //   setNewRecord(e.target.value);
  // }, []);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    try {
      schema.parse(value);
      setNewRecord(value);
      setError(null);
    } catch (error) {
      setError(error.errors[0].message);
    }
  }, [schema]);


  return (
    <>
      <div className="min-h-[74px]">
        <div className="flex gap-3 justify-center p-2">
          <input className="text-gray-800 px-4 rounded-md w-[360px]"
            type="text"
            value={newRecord}
            onChange={handleChange}
          />
          <button
            className={`buttonTodo ${error ? "text-gray-600 hover:text-gray-600" : ""}`}
            disabled={error}
            onClick={handleAddRecord}>
            Add Record
          </button>
        </div>
        {error && <p className="error text-red-500 text-[10px]">{error}</p>}
      </div>
    </>

  )

}

export default AddTodoItem