export interface SliderItem {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  isActive?: boolean;
}

export interface SliderConfig {
  autoPlay: boolean;
  interval: number;
  showIndicators: boolean;
  showArrows: boolean;
}
