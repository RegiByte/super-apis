import React from "react";
import { useForm } from "react-hook-form";
import { useTodos, UseTodosHook } from "../../hooks/useTodos";
interface AddTodoFormProps {
  addTodo: UseTodosHook['addTodo']
}
export const AddTodoForm:React.FC<AddTodoFormProps> = ({addTodo}) => {
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
          placeholder="O que precisa ser feito?"
          {...register("content")}
        />
        <button type="submit" className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-sky-500 hover:bg-teal">
          Adicionar
        </button>
      </div>
    </form>
  );
};
