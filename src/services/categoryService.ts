import apiClient from "../api/apiClient";
import { Category } from "../data/mockData";

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>("/categories");
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await apiClient.post<Category>("/categories", category);
  return response.data;
};

export const updateCategory = async (
  id: string,
  category: Category
): Promise<Category> => {
  const response = await apiClient.put<Category>(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/categories/${id}`);
  return response.data;
};
