import { DiscountResponse } from "./discount.ts";
import { ProductResponse } from "./product.ts";

export type AvailableRoute = "products" | "discounts";
export type Route = `/${AvailableRoute}`;

export type ConditionalResponseBody<T extends Route> = T extends "/products"
  ? ProductResponse
  : T extends "/discounts" ? DiscountResponse
  : never;
