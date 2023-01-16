import React from "react";
import { useTodos } from "../../hooks/useTodos";
import { AddTodoForm } from "../../components/AddTodoForm/AddTodoForm";
import { TodoList } from "../../components/TodoList/TodoList";

export const Todos = () => {
  const { todos, isLoading } = useTodos();

  return (
    <div className="flex justify-center">

      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Lista de Tarefas</h1>
          <AddTodoForm />

        </div>
        {!isLoading && todos && <TodoList todos={todos} />}
      </div>
    </div>
  );
};
