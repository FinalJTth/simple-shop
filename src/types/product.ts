import { Color } from "./color.ts";

export interface Product {
  id: number;
  name: string;
  color: Color;
  price: number;
  description: string;
}

export interface ProductResponse {
  products: Product[];
}
