export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  brand?: string;
  inStock: boolean;
  isPromotion?: boolean;
  promotionPercentage?: number;
  rating?: number;
  reviewCount?: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  description?: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
