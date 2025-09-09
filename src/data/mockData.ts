export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  sku: string;
  image?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
  shippingAddress: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Visage',
    description: 'Produits pour le soin du visage',
    children: [
      { id: '1-1', name: 'Yeux', parentId: '1' },
      { id: '1-2', name: 'Lèvres', parentId: '1' },
      { id: '1-3', name: 'Crèmes hydratantes', parentId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Corps',
    description: 'Produits pour le soin du corps',
    children: [
      { id: '2-1', name: 'Gels douche', parentId: '2' },
      { id: '2-2', name: 'Crèmes corps', parentId: '2' },
      { id: '2-3', name: 'Déodorants', parentId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Cheveux',
    description: 'Produits capillaires',
    children: [
      { id: '3-1', name: 'Shampoings', parentId: '3' },
      { id: '3-2', name: 'Après-shampoings', parentId: '3' },
      { id: '3-3', name: 'Masques capillaires', parentId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Santé',
    description: 'Produits de santé et bien-être',
    children: [
      { id: '4-1', name: 'Vitamines', parentId: '4' },
      { id: '4-2', name: 'Premiers secours', parentId: '4' },
      { id: '4-3', name: 'Thermomètres', parentId: '4' },
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Crème Anti-âge Yeux',
    description: 'Crème contour des yeux anti-rides et anti-cernes',
    price: 29.99,
    stock: 150,
    categoryId: '1-1',
    sku: 'CREAM-EYE-001',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Rouge à Lèvres Hydratant',
    description: 'Rouge à lèvres longue tenue avec actifs hydratants',
    price: 19.99,
    stock: 85,
    categoryId: '1-2',
    sku: 'LIPS-RED-002',
    status: 'active',
    createdAt: '2024-01-16T14:30:00Z'
  },
  {
    id: '3',
    name: 'Crème Hydratante Jour',
    description: 'Crème hydratante quotidienne SPF 15',
    price: 24.99,
    stock: 200,
    categoryId: '1-3',
    sku: 'CREAM-DAY-003',
    status: 'active',
    createdAt: '2024-01-17T09:15:00Z'
  },
  {
    id: '4',
    name: 'Gel Douche Surgras',
    description: 'Gel douche pour peaux sensibles',
    price: 8.99,
    stock: 300,
    categoryId: '2-1',
    sku: 'SHOWER-SENS-004',
    status: 'active',
    createdAt: '2024-01-18T11:45:00Z'
  },
  {
    id: '5',
    name: 'Shampoing Réparateur',
    description: 'Shampoing pour cheveux abîmés et secs',
    price: 12.99,
    stock: 120,
    categoryId: '3-1',
    sku: 'SHAM-REP-005',
    status: 'active',
    createdAt: '2024-01-19T16:20:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Marie Dubois',
    customerEmail: 'marie.dubois@email.com',
    customerPhone: '06 12 34 56 78',
    total: 74.97,
    status: 'processing',
    createdAt: '2024-01-20T10:30:00Z',
    shippingAddress: '123 Rue de la Paix, 75001 Paris',
    items: [
      { id: '1', productId: '1', productName: 'Crème Anti-âge Yeux', quantity: 2, price: 29.99 },
      { id: '2', productId: '3', productName: 'Crème Hydratante Jour', quantity: 1, price: 24.99 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Jean Martin',
    customerEmail: 'jean.martin@email.com',
    customerPhone: '06 98 76 54 32',
    total: 41.97,
    status: 'shipped',
    createdAt: '2024-01-19T15:45:00Z',
    shippingAddress: '456 Avenue des Champs, 69000 Lyon',
    items: [
      { id: '3', productId: '2', productName: 'Rouge à Lèvres Hydratant', quantity: 1, price: 19.99 },
      { id: '4', productId: '5', productName: 'Shampoing Réparateur', quantity: 1, price: 12.99 },
      { id: '5', productId: '4', productName: 'Gel Douche Surgras', quantity: 1, price: 8.99 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Sophie Leroy',
    customerEmail: 'sophie.leroy@email.com',
    customerPhone: '06 11 22 33 44',
    total: 54.98,
    status: 'delivered',
    createdAt: '2024-01-18T08:20:00Z',
    shippingAddress: '789 Boulevard Saint-Germain, 33000 Bordeaux',
    items: [
      { id: '6', productId: '1', productName: 'Crème Anti-âge Yeux', quantity: 1, price: 29.99 },
      { id: '7', productId: '3', productName: 'Crème Hydratante Jour', quantity: 1, price: 24.99 }
    ]
  }
];