import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../storage/actions";
import TodoItem from "./TodoItem";
import AddTodoItem from "./AddTodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.reducer.records);
  const filter = useSelector((state) => state.reducer.filter);

  const [filtered, setFiltered] = useState(records);
  const [activeFilter, setActiveFilter] = useState(filter);

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
    setActiveFilter(filter);
  }, [records, handleSetFilter]);

  useEffect(() => {
    filteredRecords(filter);
  }, [filter, filteredRecords]);

  return (
    <div className="container ">
      <div className="flex  items-center justify-center gap-10 mb-8">
        <p className="text-green-500">Completed Tasks: {records.filter((r) => r.completed).length}</p>
        <p className="text-red-500">Uncompleted Tasks: {records.filter((r) => !r.completed).length}</p>
      </div>
      <div className="flex gap-2  items-center justify-center gap-2 mb-8 ">
        <button className={`buttonTodo ${activeFilter == 'all' ? "bg-gray-800" : ''}`} onClick={() => filteredRecords("all")}>Show All</button>
        <button className={`buttonTodo ${activeFilter == 'completed' ? "bg-gray-800" : ''}`} onClick={() => filteredRecords("completed")}>
          Show Completed
        </button>
        <button className={`buttonTodo ${activeFilter == 'current' ? "bg-gray-800" : ''}`} onClick={() => filteredRecords("current")}>Show Current</button>
      </div>

      <AddTodoItem />

      <ul className="flex-col gap-2  items-center max-w-[500px] m-auto mt-8 mb-16">
        {filtered.length > 0 ?
          filtered?.map((record) => (
            <TodoItem
              key={record.id}
              record={record}
            />
          )) : "You don't have any records"


        }
      </ul>



    </div >
  );
};

export default React.memo(TodoList);
