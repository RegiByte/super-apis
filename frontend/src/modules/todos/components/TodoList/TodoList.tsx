import React from "react";
import { PaginatedTodos } from "../../../entities/todo";
import { TodoItem } from "../TodoItem/TodoItem";

interface TodoListProps {
  todos: PaginatedTodos;
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div>
      {todos.data?.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  );
};
