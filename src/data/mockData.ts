export interface CategoryReq {
  name: string;
  parent?: string;
  
}
export interface Category {
  _id?: string;
  name: string;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
  parent?: string;
  subCategories?: Category[];
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
    _id: '1',
    name: 'Visage',
    subCategories: [
      { _id: '1-1', name: 'Yeux', parent: '1' },
      { _id: '1-2', name: 'Lèvres', parent: '1' },
      { _id: '1-3', name: 'Crèmes hydratantes', parent: '1' },
    ]
  },
  {
    _id: '2',
    name: 'Corps',
    subCategories: [
      { _id: '2-1', name: 'Gels douche', parent: '2' },
      { _id: '2-2', name: 'Crèmes corps', parent: '2' },
      { _id: '2-3', name: 'Déodorants', parent: '2' },
    ]
  },
  {
    _id: '3',
    name: 'Cheveux',
    subCategories: [
      { _id: '3-1', name: 'Shampoings', parent: '3' },
      { _id: '3-2', name: 'Après-shampoings', parent: '3' },
      { _id: '3-3', name: 'Masques capillaires', parent: '3' },
    ]
  },
  {
    _id: '4',
    name: 'Santé',
    subCategories: [
      { _id: '4-1', name: 'Vitamines', parent: '4' },
      { _id: '4-2', name: 'Premiers secours', parent: '4' },
      { _id: '4-3', name: 'Thermomètres', parent: '4' },
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