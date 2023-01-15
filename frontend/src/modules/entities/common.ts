export interface PageLinks {
  active: boolean;
  label: string;
  url?: string;
}

export interface PaginatedResponse<Entity> {
  /** number of the current page*/
  current_page: number;
  /** array of items on this page*/
  data: Entity[];
  /** url of the first page*/
  first_page_url: string;
  /** number of the first page*/
  from: number;
  /** number of the last visited page*/
  last_page: number;
  /** url of the last page*/
  last_page_url: string;
  /** links for all pages*/
  links: PageLinks;
  /** url of next page*/
  next_page_url?: string;
  /** path of current page*/
  path: string;
  /** number of records per page*/
  per_page: number;
  /** url of prev page*/
  prev_page_url?: string;
  /** number of the last page*/
  to: number;
  /** total number of pages*/
  total: number;
}