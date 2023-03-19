export interface product {
  id: string;
  name?: string;
  value?: number;
  image?: string;
  description?: string;
  stock?: number;
}

export interface CartProduct {
  product: { name: string; value: number };
  quantity: number;
  id: string;
}
