import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Crème Hydratante Visage',
      description: 'Crème hydratante pour tous types de peaux',
      price: 45.500,
      originalPrice: 52.000,
      imageUrl: 'dermacare-hydraliss-lait-corporel-hydratant-200ml.jpg',
      category: 'Visage',
      brand: 'La Roche-Posay',
      inStock: true,
      isPromotion: true,
      promotionPercentage: 12,
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      name: 'Shampooing Anti-Chute',
      description: 'Shampooing fortifiant contre la chute des cheveux',
      price: 38.900,
      imageUrl: 'k-reine--lotion-hydratante-cheveux-et-corps-200ml.jpg',
      category: 'Cheveux',
      brand: 'Vichy',
      inStock: true,
      isPromotion: false,
      rating: 4.2,
      reviewCount: 89
    },
    {
      id: 3,
      name: 'Crème Solaire SPF 50+',
      description: 'Protection solaire très haute pour visage et corps',
      price: 62.300,
      originalPrice: 68.000,
      imageUrl: 'dermacare-hydraliss-lait-corporel-hydratant-200ml.jpg',
      category: 'Solaire',
      brand: 'Avène',
      inStock: true,
      isPromotion: true,
      promotionPercentage: 8,
      rating: 4.7,
      reviewCount: 156
    },
    {
      id: 4,
      name: 'Lait Corps Hydratant',
      description: 'Lait corporel pour peaux sèches et sensibles',
      price: 28.500,
      imageUrl: 'k-reine--lotion-hydratante-cheveux-et-corps-200ml.jpg',
      category: 'Corps',
      brand: 'Eucerin',
      inStock: true,
      isPromotion: false,
      rating: 4.3,
      reviewCount: 94
    },
    {
      id: 5,
      name: 'Complément Vitamine D3',
      description: 'Complément alimentaire vitamine D3 1000 UI',
      price: 24.900,
      originalPrice: 29.900,
      imageUrl: 'dermacare-hydraliss-lait-corporel-hydratant-200ml.jpg',
      category: 'Compléments',
      brand: 'Arkopharma',
      inStock: true,
      isPromotion: true,
      promotionPercentage: 17,
      rating: 4.6,
      reviewCount: 203
    },
    {
      id: 6,
      name: 'Gel Douche Surgras',
      description: 'Gel douche doux pour peaux sensibles',
      price: 18.200,
      imageUrl: 'k-reine--lotion-hydratante-cheveux-et-corps-200ml.jpg',
      category: 'Hygiène',
      brand: 'Mustela',
      inStock: false,
      isPromotion: false,
      rating: 4.1,
      reviewCount: 67
    }
  ];

  onAddToCart(product: Product) {
    console.log('Add to cart:', product);
    // Implement add to cart functionality
  }

  onAddToWishlist(product: Product) {
    console.log('Add to wishlist:', product);
    // Implement add to wishlist functionality
  }

  trackByProduct(index: number, product: Product): number {
    return product.id;
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating);
    }
    return stars;
  }
}
