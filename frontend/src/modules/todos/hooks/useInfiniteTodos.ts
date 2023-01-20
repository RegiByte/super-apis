import { useSwrInfinite } from "../../core/hooks/useSwr";
import { apiClient } from "../../../services/http";
import { SWRResponse } from "swr";
import { AxiosError } from "axios";
import { PaginatedTodos, Todo } from "../../entities/todo";
import { useMemo } from "react";

export interface UseInfiniteTodosHook {
  todos?: Todo[];
  isLoading: boolean;
  mutate: SWRResponse<PaginatedTodos[], AxiosError>["mutate"];
  addTodo: (content: string) => Promise<void>;
  completeTodo: (todoId: string) => Promise<void>;
  uncompleteTodo: (todoId: string) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  size: number;
  setSize: (size: number | ((_size: number) => number)) => Promise<any>;
}

interface UseInfiniteTodosParams {
  page?: number;
}

function getTodosKey(pageIndex: number, previousPageData: PaginatedTodos) {
  if (previousPageData && !previousPageData.next_page_url) return null;
  return `/api/todos/?page=${pageIndex + 1}`;
}

export function useInfiniteTodos(): UseInfiniteTodosHook {
  const { data, isLoading, mutate, setSize, size } = useSwrInfinite<PaginatedTodos>(getTodosKey, (pageUrl: string) => {
    return apiClient.get(pageUrl).then((response) => {
      return response.data;
    });
  });

  const todos = useMemo(() => {
    return data?.map((response) => response.data)?.flat();
  }, [data]);

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
    size,
    setSize,
  };
}
