/** a Todo object as returned from the backend*/
import { PaginatedResponse } from "./common";

export interface Todo {
  content: string;
  id: string;
  user_id: string;
  completed_at: string;
  updated_at: string;
  created_at: string;
}

export interface PaginatedTodos extends PaginatedResponse<Todo> {}
