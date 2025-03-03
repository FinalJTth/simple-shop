import { Instance, types } from "mobx-state-tree";
import { ProductModel } from "./product.ts";

export const CartItemModel = types
  .model("CartItem", {
    product: ProductModel,
    quantity: types.integer,
  })
  .actions((self) => {
    const setQuantity = (quantity: number): void => {
      self.quantity = quantity;
    };

    return {
      setQuantity,
    };
  });

export type CartItemInstance = Instance<typeof CartItemModel>;
