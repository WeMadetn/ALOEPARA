import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  // Mobile navigation state
  cartItemCount = 0;
  wishlistItemCount = 0;

  contactInfo = {
    phone: '28 37 28 27',
    email: 'contact@aloepara.tn',
    address: 'Tunis, Tunisie'
  };

  socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#' }
  ];

  quickLinks = [
    { name: 'À propos', url: '#' },
    { name: 'Contact', url: '#' },
    { name: 'FAQ', url: '#' },
    { name: 'Livraison', url: '#' }
  ];

  legalLinks = [
    { name: 'Mentions légales', url: '#' },
    { name: 'Conditions générales', url: '#' },
    { name: 'Politique de confidentialité', url: '#' },
    { name: 'Cookies', url: '#' }
  ];

  // Mobile navigation methods
  onMobileNavClick(action: string) {
    console.log('Mobile nav clicked:', action);

    switch (action) {
      case 'home':
        // Navigate to home
        break;
      case 'cart':
        // Navigate to cart
        break;
      case 'wishlist':
        // Navigate to wishlist
        break;
      case 'contact':
        // Navigate to contact or show contact modal
        break;
      case 'menu':
        // Toggle mobile menu
        break;
      case 'account':
        // Navigate to account or show login modal
        break;
    }
  }
}
