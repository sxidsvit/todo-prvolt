import { useCallback, } from "react";
import { useDispatch } from "react-redux";
import { FaCheck, FaTrash } from 'react-icons/fa';

import { toggleStatus, removeRecord } from "../storage/actions";

const TodoItem = ({ record }) => {

  const dispatch = useDispatch();

  const handleToggleStatus = useCallback((id) => {
    console.log('handleToggleStatus id: ', id);
    dispatch(toggleStatus(id));
    location.reload();
  }, [dispatch]);

  const handleRemoveRecord = useCallback((id) => {
    dispatch(removeRecord(id));
    location.reload();
  }, [dispatch]);

  return (
    <div className=" flex items-center p-2 mb-4  border-2 rounded-xl border-white/20">
      <label
        className="flex gap-2  cursor-pointer"
        key={record.id}
      // onChange={() => handleToggleStatus(record.id)}
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
      <div
        className="w-8 h-8 min-w-8 flex items-center justify-center bg-white/10 border-solid border-2 rounded-md text-red-500 ml-auto  cursor-pointer"
        onClick={() => handleRemoveRecord(record.id)}>
        <FaTrash />
      </div>
    </div>
  )
}

export default TodoItem