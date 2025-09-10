import apiClient from "../api/apiClient";
import { Product } from "../data/mockData";

// Récupérer tous les produits
export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>("/products");
  return response.data;
};

// Récupérer un produit par ID
export const getProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};

// Créer un produit (avec images)
export const createProduct = async (product: Omit<Product, "_id" | "createdAt">): Promise<Product> => {
  const formData = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (key === "images" && value instanceof Array) {
      (value as File[]).forEach(file => formData.append("images", file));
    } else {
      formData.append(key, value as any);
    }
  });

  const response = await apiClient.post<{ product: Product }>("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.product;
};

// Mettre à jour un produit
export const updateProduct = async (
  id: string,
  product: Omit<Product, "_id" | "createdAt">
): Promise<Product> => {
  const response = await apiClient.put<{ product: Product }>(`/products/${id}`, product);
  return response.data.product;
};

// Supprimer un produit
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/products/${id}`);
  return response.data;
};
