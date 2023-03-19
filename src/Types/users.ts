import { product } from "./products";

export interface user {
  email: string;
  name: string;
  cart: product[];
}
