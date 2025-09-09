import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategory } from '../../shared/models/product.model';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: ProductCategory[] = [
    {
      id: 1,
      name: 'Visage',
      slug: 'visage',
      imageUrl: 'assets/images/categories/visage.jpg',
      description: 'Soins du visage et cosmétiques',
      productCount: 245
    },
    {
      id: 2,
      name: 'Corps',
      slug: 'corps',
      imageUrl: 'assets/images/categories/corps.jpg',
      description: 'Soins corporels et hydratation',
      productCount: 189
    },
    {
      id: 3,
      name: 'Cheveux',
      slug: 'cheveux',
      imageUrl: 'assets/images/categories/cheveux.jpg',
      description: 'Soins capillaires et coiffage',
      productCount: 156
    },
    {
      id: 4,
      name: 'Bébé & Maman',
      slug: 'bebe-maman',
      imageUrl: 'assets/images/categories/bebe-maman.jpg',
      description: 'Produits pour bébés et mamans',
      productCount: 198
    },
    {
      id: 5,
      name: 'Solaire',
      slug: 'solaire',
      imageUrl: 'assets/images/categories/solaire.jpg',
      description: 'Protection solaire et bronzage',
      productCount: 87
    },
    {
      id: 6,
      name: 'Hygiène',
      slug: 'hygiene',
      imageUrl: 'assets/images/categories/hygiene.jpg',
      description: 'Hygiène corporelle et bucco-dentaire',
      productCount: 134
    },
    {
      id: 7,
      name: 'Compléments',
      slug: 'complements',
      imageUrl: 'assets/images/categories/complements.jpg',
      description: 'Compléments alimentaires et vitamines',
      productCount: 167
    },
    {
      id: 8,
      name: 'Homme',
      slug: 'homme',
      imageUrl: 'assets/images/categories/homme.jpg',
      description: 'Soins spécifiques pour hommes',
      productCount: 92
    }
  ];

  onCategoryClick(category: ProductCategory) {
    console.log('Category clicked:', category);
    // Implement navigation to category page
  }

  trackByCategory(index: number, category: ProductCategory): number {
    return category.id;
  }

  getCategoryIcon(slug: string): string {
    const iconMap: { [key: string]: string } = {
      'visage': 'fas fa-smile',
      'corps': 'fas fa-user',
      'cheveux': 'fas fa-cut',
      'bebe-maman': 'fas fa-baby',
      'solaire': 'fas fa-sun',
      'hygiene': 'fas fa-soap',
      'complements': 'fas fa-pills',
      'homme': 'fas fa-male'
    };
    return iconMap[slug] || 'fas fa-box';
  }
}
