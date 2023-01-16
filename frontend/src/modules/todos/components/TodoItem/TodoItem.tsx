import React from "react";
import { Todo } from "../../../entities/todo";
import { useTodos } from "../../hooks/useTodos";
import { classNames } from "../../../../helpers/layout";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { completeTodo, uncompleteTodo, deleteTodo } = useTodos();

  return (
    <div className="flex mb-4 items-center">
      <p className={classNames("w-full text-grey-darkest", todo.completed_at ? "text-green-500 line-through" : null)}>
        {todo.content}
      </p>
      {todo.completed_at ? (
        <button
          onClick={() => uncompleteTodo(todo.id)}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-500 border-green hover:bg-teal-400"
        >
          Restaurar
        </button>
      ) : (
        <button
          onClick={() => completeTodo(todo.id)}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green hover:bg-green-400"
        >
          Concluir
        </button>
      )}
      <button
        onClick={() => deleteTodo(todo.id)}
        className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red hover:text-white hover:bg-red-400"
      >
        Remover
      </button>
    </div>
  );
};
