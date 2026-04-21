export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageEmoji: string;
  category: string;
  featured: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageEmoji: string;
  quantity: number;
}
