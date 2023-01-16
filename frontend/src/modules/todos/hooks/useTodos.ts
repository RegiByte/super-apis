import { useSwr } from "../../core/hooks/useSwr";
import { apiClient } from "../../../services/http";
import { SWRResponse } from "swr";
import { AxiosError } from "axios";
import { PaginatedTodos } from "../../entities/todo";

interface UseTodosHook {
  todos?: PaginatedTodos;
  isLoading: boolean;
  mutate: SWRResponse<PaginatedTodos, AxiosError>["mutate"];
  addTodo: (content: string) => Promise<void>;
  completeTodo: (todoId: string) => Promise<void>;
  uncompleteTodo: (todoId: string) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
}

export function useTodos(): UseTodosHook {
  const {
    data: todos,
    isLoading,
    mutate,
  } = useSwr<PaginatedTodos>("/api/todos", () =>
    apiClient.get("/api/todos").then((response) => {
      return response.data;
    }),
  );

  const addTodo = async (content: string) => {
    await apiClient
      .post("/api/todos", {
        content,
      })
      .then(() => mutate())
      .catch((error) => {
        if (error.response.status !== 422) {
          throw error;
        }
      });
  };

  const completeTodo = async (todoId: string) => {
    await apiClient
      .put(`/api/todos/${todoId}`, {
        completed_at: new Date().toISOString(),
      })
      .then(() => mutate())
      .catch((error) => {
        throw error;
      });
  };

  const uncompleteTodo = async (todoId: string) => {
    await apiClient
      .put(`/api/todos/${todoId}`, {
        completed_at: null,
      })
      .then(() => mutate())
      .catch((error) => {
        throw error;
      });
  };

  const deleteTodo = async (todoId: string) => {
    await apiClient
      .delete(`/api/todos/${todoId}`)
      .then(() => mutate())
      .catch((error) => {
        throw error;
      });
  };

  return {
    todos,
    isLoading,
    mutate,
    addTodo,
    completeTodo,
    uncompleteTodo,
    deleteTodo,
  };
}
