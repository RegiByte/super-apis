import { apiClient } from "../../services/http";
import { BasePin, PaginatedPins, BasePinCategory } from "../entities/pin";

interface GetPinsParams {
  category?: string;
  category_id?: string;
  page?: number;
  per_page?: number
}

export const getPins = (params: GetPinsParams) =>
  apiClient.get<PaginatedPins>("/api/pins", {
    params: {
      ...params,
    },
  });

export const createPin = (data: FormData) => apiClient.post<BasePin>("/api/pins", data);

export const updatePin = (id: string, data: FormData) =>
  apiClient.post<BasePin>(`/api/pins/${id}`, data, {
    params: {
      _method: "patch",
    },
  });

export const deletePin = (id: string) => apiClient.delete(`/api/pins/${id}`);

export const getPinCategories = () => apiClient.get<BasePinCategory[]>("/api/pin_categories");

export const savePin = (id: string) => apiClient.post(`/api/pins/${id}/save`)
export const unsavePin = (id: string) => apiClient.post(`/api/pins/${id}/unsave`)

export const getSavedPins = () => apiClient.get<BasePin[]>("/api/pins/saved");
