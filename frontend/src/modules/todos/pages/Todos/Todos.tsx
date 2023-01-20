import React, { useEffect, useRef, useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { AddTodoForm } from "../../components/AddTodoForm/AddTodoForm";
import { TodoList } from "../../components/TodoList/TodoList";
import { useInfiniteTodos } from "../../hooks/useInfiniteTodos";
import { InfiniteScroller } from "../../components/InfiniteScroller/InfiniteScroller";

export const Todos = () => {
  const [page, setPage] = useState(1);
  const { todos, isLoading, addTodo, completeTodo, uncompleteTodo, deleteTodo, setSize, size } = useInfiniteTodos();

  return (
    <div className="flex justify-center">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Lista de Tarefas</h1>
          <AddTodoForm addTodo={addTodo} />
        </div>
        {!isLoading && todos && (
          <TodoList todos={todos} completeTodo={completeTodo} uncompleteTodo={uncompleteTodo} deleteTodo={deleteTodo} />
        )}
        {!isLoading && todos && todos.length > 0 && <InfiniteScroller setSize={setSize} />}
      </div>
    </div>
  );
};
