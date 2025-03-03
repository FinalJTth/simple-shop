export interface Discount {
  id: number;
  code: string;
  type: "total" | "bundle";
  targetProductId?: number;
  value: number;
}

export interface DiscountDetail {
  code: string;
  value: number;
}

export interface DiscountResponse {
  discounts: Discount[];
}
