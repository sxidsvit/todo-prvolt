import { useCallback, } from "react";
import { useDispatch } from "react-redux";
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

import { toggleStatus, removeRecord, setEditing } from "../store/todosSlice";

const TodoItem = ({ record, setIsEditRecord }) => {

  const dispatch = useDispatch();

  const handleToggleStatus = useCallback((id) => {
    dispatch(toggleStatus({ id }));
  }, [dispatch]);


  const handleRemoveRecord = useCallback((id) => {
    dispatch(removeRecord({ id }));
  }, [dispatch]);

  const handleEditStatus = useCallback((id) => {
    dispatch(setEditing({ id }));
  }, [dispatch]);

  return (
    <div className="listItem">
      <label
        className="flex gap-2  cursor-pointer"
        key={record.id}
      >

        <input
          type="checkbox"
          className="hidden"
          checked={record.completed}
          onChange={() => handleToggleStatus(record.id)}
        />
        <div className="flex items-center gap-2">

          <div className="w-8 h-8 min-w-8 flex items-center justify-center bg-white/10 border-solid border-2 rounded-md text-green-500">

            {record.completed ? <FaCheck /> : ""}
          </div>

          <span
            className={`whitespace-normal ${record.completed ? "line-through" : ""}`}

          >
            {record.text}
          </span>
        </div>
      </label>
      <div className="flex gap-2 ml-auto">
        <div
          className="w-8 h-8 min-w-8 flex items-center justify-center bg-white/10 border-solid border-2 rounded-md text-white
          -500 ml-auto  cursor-pointer"
          onClick={() => handleEditStatus(record.id)}>
          <FaEdit />
        </div>
        <div
          className="w-8 h-8 min-w-8 flex items-center justify-center bg-white/10 border-solid border-2 rounded-md text-red-500 ml-auto  cursor-pointer"
          onClick={() => handleRemoveRecord(record.id)}>
          <FaTrash />
        </div>
      </div>
    </div >
  )
}

export default TodoItem