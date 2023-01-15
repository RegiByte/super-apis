import React from "react";
import { useForm } from "react-hook-form";
import { useTodos } from "../../hooks/useTodos";

export const AddTodoForm = () => {
  const { addTodo } = useTodos();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (data: any) => {
    addTodo(data.content)
      .then(() => reset());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex mt-4 w-full">
      <div className="flex mt-4 w-full">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Todo"
          {...register("content")}
        />
        <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
          Add
        </button>
      </div>
    </form>
  );
};
