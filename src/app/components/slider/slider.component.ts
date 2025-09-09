import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderItem, SliderConfig } from '../../shared/models/slider.model';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit, OnDestroy {
  currentSlide = signal(0);
  private intervalId: any;

  config: SliderConfig = {
    autoPlay: true,
    interval: 5000,
    showIndicators: true,
    showArrows: true
  };

  slides: SliderItem[] = [
    {
      id: 1,
      title: 'Bienvenue chez AloePara',
      subtitle: 'Votre parapharmacie de confiance',
      description: 'Découvrez notre large gamme de produits de santé et de beauté',
      imageUrl: '*',
      buttonText: 'Découvrir',
      buttonLink: '#categories',
      isActive: true
    },
    {
      id: 2,
      title: 'Soins Visage Premium',
      subtitle: 'Prenez soin de votre peau',
      description: 'Produits dermatologiques recommandés par les professionnels',
      imageUrl: 'assets/images/slider/slide2.jpg',
      buttonText: 'Voir les produits',
      buttonLink: '#visage',
      isActive: false
    },
    {
      id: 3,
      title: 'Livraison Gratuite',
      subtitle: 'À partir de 99 TND',
      description: 'Profitez de la livraison gratuite sur toute la Tunisie',
      imageUrl: 'assets/images/slider/slide3.jpg',
      buttonText: 'Commander',
      buttonLink: '#boutique',
      isActive: false
    }
  ];

  ngOnInit() {
    if (this.config.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.config.interval);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    const current = this.currentSlide();
    const next = (current + 1) % this.slides.length;
    this.goToSlide(next);
  }

  prevSlide() {
    const current = this.currentSlide();
    const prev = current === 0 ? this.slides.length - 1 : current - 1;
    this.goToSlide(prev);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
    this.updateActiveSlide(index);
  }

  private updateActiveSlide(activeIndex: number) {
    this.slides.forEach((slide, index) => {
      slide.isActive = index === activeIndex;
    });
  }

  onMouseEnter() {
    if (this.config.autoPlay) {
      this.stopAutoPlay();
    }
  }

  onMouseLeave() {
    if (this.config.autoPlay) {
      this.startAutoPlay();
    }
  }
}
