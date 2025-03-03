import { cast, Instance, types } from "mobx-state-tree";
import { CartItemModel } from "./cart-item.ts";
import { Product } from "../types/product.ts";
import { DiscountModel } from "./discount.ts";
import { Discount } from "../types/discount.ts";
import { DiscountDetail } from "../types/discount.ts";

export const CartModel = types
  .model("Cart", {
    cartItems: types.array(CartItemModel),
    discounts: types.array(DiscountModel),
  }).views((self) => {
    const getDiscountDetails = (): DiscountDetail[] => {
      return self.discounts.map((discount) => ({
        code: discount.code,
        value: discount.getDiscount(self.cartItems),
      }));
    };

    return {
      getDiscountDetails,
    };
  }).views((self) => {
    const getTotalPrice = (): number => {
      return self.cartItems.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0,
      );
    };

    const getDiscountPrice = (): number => {
      const discount = self.getDiscountDetails().reduce(
        (total, discountDetail) => total + discountDetail.value,
        0,
      );

      return discount;
    };

    const getDiscountedPrice = (): number => {
      return getTotalPrice() - getDiscountPrice();
    };

    return {
      getTotalPrice,
      getDiscountPrice,
      getDiscountedPrice,
    };
  }).actions((self) => {
    const addProduct = (product: Product, quantity: number): void => {
      const foundItem = self.cartItems.find((item) =>
        item.product.id === product.id
      );

      if (!foundItem) {
        self.cartItems.push({ product, quantity });
        return;
      }

      foundItem.setQuantity(foundItem.quantity + quantity);
    };

    const removeProduct = (product: Product, quantity: number): void => {
      const foundItem = self.cartItems.find((item) =>
        item.product.id === product.id
      );

      if (!foundItem) {
        return;
      }

      // If the item in cart is less than the input quantity, remove it from the cart.
      if (foundItem.quantity <= quantity) {
        self.cartItems.splice(self.cartItems.indexOf(foundItem), 1);
        return;
      }

      foundItem.setQuantity(foundItem.quantity - quantity);
    };

    const addDiscount = (discount: Discount): void => {
      self.discounts.push(discount);
    };

    const setDiscounts = (discounts: Discount[]): void => {
      self.discounts = cast(discounts);
    };

    return {
      addProduct,
      removeProduct,
      addDiscount,
      setDiscounts,
    };
  });

export type CartInstance = Instance<typeof CartModel>;

export const cart = CartModel.create({
  cartItems: [],
  discounts: [],
});
