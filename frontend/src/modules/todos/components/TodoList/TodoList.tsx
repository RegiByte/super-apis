import React from "react";
import { PaginatedTodos, Todo } from "../../../entities/todo";
import { TodoItem } from "../TodoItem/TodoItem";
import { UseTodosHook } from "../../hooks/useTodos";

interface TodoListProps {
  todos: Todo[];
  completeTodo: UseTodosHook['completeTodo']
  uncompleteTodo: UseTodosHook['uncompleteTodo']
  deleteTodo: UseTodosHook['deleteTodo']
}

export const TodoList: React.FC<TodoListProps> = ({ todos, completeTodo, uncompleteTodo, deleteTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          completeTodo={completeTodo}
          uncompleteTodo={uncompleteTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};
