import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  searchQuery = signal('');
  isMobileMenuOpen = signal(false);

  categories = [
    { name: 'Boutique', slug: 'boutique', hasSubmenu: true },
    { name: 'Visage', slug: 'visage', hasSubmenu: true },
    { name: 'Corps', slug: 'corps', hasSubmenu: true },
    { name: 'Cheveux', slug: 'cheveux', hasSubmenu: true },
    { name: 'Bébé & Maman', slug: 'bebe-maman', hasSubmenu: true },
    { name: 'Solaire', slug: 'solaire', hasSubmenu: true },
    { name: 'Hygiène', slug: 'hygiene', hasSubmenu: true },
    { name: 'Compléments', slug: 'complements', hasSubmenu: true }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen.set(!this.isMobileMenuOpen());
  }

  onSearch() {
    const query = this.searchQuery();
    if (query.trim()) {
      console.log('Searching for:', query);
      // Implement search functionality
      
    }
  }

  onCategoryClick(category: any) {
    console.log('Category clicked:', category);
    // Implement navigation to category
  }
}
