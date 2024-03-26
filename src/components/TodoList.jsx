import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { setFilter, selectFiltering, selectRecords } from "../store/todosSlice";
import TodoItem from "./TodoItem";
import AddTodoItem from "./AddTodoItem";
import EditTodoItem from "./EditTodoItem"
import AnimationsTodoList from "./AnimationsTodoList";

// eslint-disable-next-line react-refresh/only-export-components
const TodoList = () => {
  const dispatch = useDispatch();
  const records = useSelector(selectRecords);
  const filtering = useSelector(selectFiltering)

  const [filtered, setFiltered] = useState(records);
  const [activeFilter, setActiveFilter] = useState(filtering);

  const handleSetFilter = useCallback((selectedFilter) => {
    dispatch(setFilter({ selectedFilter }));
  }, [dispatch]);

  const filteredRecords = useCallback((filtering) => {
    setActiveFilter(filtering);
    const result = records?.filter((record) => {
      if (filtering === "all") return true;
      if (filtering === "completed") return record.completed;
      if (filtering === "current") return !record.completed;
    });
    setFiltered(result);
    handleSetFilter(filtering);
  }, [records, handleSetFilter]);

  useEffect(() => {
    filteredRecords(filtering);
  }, [filtering, filteredRecords]);

  useGSAP(() => {
    gsap.from(["#completed-task", "#uncompleted-task"], {
      x: 0,
      duration: 1,
      opacity: 0,
      ease: "power1.inOut",
      delay: 1.5,
    });
  });

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set("#todo-list > .listItem", { opacity: 0 });
    filtered.forEach((todo, index) => {
      tl.fromTo(`#todo-list >.listItem:nth-child(${index + 1})`, {
        y: -25,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power1.inOut",
        delay: index * 0.1,
      });
    });
    tl.play();
    window.addEventListener("beforeunload", () => {
      tl.restart();
    });
  }, [filtered]);

  return (
    <div className="container ">
      <div className="flex  items-center justify-center gap-10 mb-8">
        <p id="completed-task" className="text-green-500">Completed Tasks: {records?.filter((r) => r.completed).length}</p>
        <p id="uncompleted-task" className="text-red-500">Uncompleted Tasks: {records?.filter((r) => !r.completed).length}</p>
      </div>
      <div className="flex gap-2  items-center justify-center gap-2 mb-8 ">
        <button className={`buttonTodo ${activeFilter == 'all' ? "bg-gray-800" : ''}`} onClick={() => filteredRecords("all")}>Show All</button>
        <button className={`buttonTodo ${activeFilter == 'completed' ? "bg-gray-800" : ''}`} onClick={() => filteredRecords("completed")}>
          Show Completed
        </button>
        <button className={`buttonTodo ${activeFilter == 'current' ? "bg-gray-800" : ''}`} onClick={() => filteredRecords("current")}>Show Current</button>
      </div>

      <AddTodoItem />

      <ul id="todo-list" className="flex-col gap-2  items-center max-w-[500px] m-auto mt-8 mb-16">
        {filtered && filtered.length === 0 &&
          "You don't have any todos"}
        {filtered && filtered.length !== 0 &&
          filtered.map((record) => (
            record.editing ? (
              <EditTodoItem
                key={record.id}
                record={record}
              />) : (
              <TodoItem
                key={record.id}
                record={record}
              />
            )
          ))
        }
      </ul>



    </div >
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(TodoList);
