import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRecord, setFilter } from "../storage/actions";
import TodoItem from "./TodoItem";
import AddTodoItem from "./AddTodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.reducer.records);
  const filter = useSelector((state) => state.reducer.filter);


  useEffect(() => {
    filteredRecords(filter);
  }, [filter]);


  const [filtered, setFiltered] = useState(records);

  const handleChange = useCallback((e) => {
    setNewRecord(e.target.value);
  }, []);



  const handleSetFilter = useCallback((selectedFilter) => {
    dispatch(setFilter(selectedFilter));
  }, [dispatch]);

  const filteredRecords = useCallback((filter) => {
    const result = records.filter((record) => {
      if (filter === "all") return true;
      if (filter === "completed") return record.completed;
      if (filter === "current") return !record.completed;
    });
    setFiltered(result);
    handleSetFilter(filter);
  }, [records, handleSetFilter]);



  return (
    <div className="container ">
      <div className="flex  items-center justify-center gap-10 mb-8">
        <p className="text-green-500">Completed Tasks: {records.filter((r) => r.completed).length}</p>
        <p className="text-red-500">Uncompleted Tasks: {records.filter((r) => !r.completed).length}</p>
      </div>
      <div className="flex gap-2  items-center justify-center gap-2 mb-8 ">
        <button className="buttonTodo" onClick={() => filteredRecords("all")}>Show All</button>
        <button className="buttonTodo" onClick={() => filteredRecords("completed")}>
          Show Completed
        </button>
        <button className="buttonTodo" onClick={() => filteredRecords("current")}>Show Current</button>
      </div>

      <AddTodoItem />

      <ul className="flex-col gap-2  items-center max-w-[500px] m-auto mt-8 mb-16">
        {filtered?.map((record) => (
          <TodoItem
            key={record.id}
            record={record}
          />
        ))}
      </ul>



    </div>
  );
};

export default React.memo(TodoList);
