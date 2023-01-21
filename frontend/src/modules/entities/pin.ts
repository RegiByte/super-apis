import { User } from "./user";
import { PaginatedResponse } from "./common";

export interface BasePinCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface BasePin {
  id: string;
  posted_by: string;
  creator?: User;
  title: string;
  destination: string;
  image: string;
  category_id: string;
  category?: BasePinCategory;
  created_at: string;
  updated_at: string;
}

export interface PaginatedPins extends PaginatedResponse<BasePin> {}
