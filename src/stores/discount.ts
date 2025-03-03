import { Instance, types } from "mobx-state-tree";
import { CartItem } from "../types/cart-item.ts";

export const DiscountModel = types
  .model("Discount", {
    id: types.number,
    code: types.string,
    type: types.union(types.literal("total"), types.literal("bundle")),
    targetProductId: types.union(types.undefined, types.number),
    value: types.number,
  }).views((self) => {
    const getDiscount = (items: CartItem[]): number => {
      if (self.type === "total") {
        let applyPrice = 0;

        let isRedExist = false;
        let isGreenExist = false;

        for (const item of items) {
          applyPrice += item.product.price * item.quantity;

          // Red set id 0
          if (item.product.id === 0) {
            isRedExist = true;
          }
          // Green set id 1
          if (item.product.id === 1) {
            isGreenExist = true;
          }
        }

        applyPrice = isRedExist && isGreenExist ? applyPrice : 0;

        return Math.round(applyPrice * self.value * 1e2) / 1e2;
      } else if (self.type === "bundle") {
        const targetItem = items.find(
          (item) => self.targetProductId === item.product.id,
        );

        if (!targetItem) {
          return 0;
        }

        const bundleCount = Math.floor(targetItem.quantity / 2);
        const applyPrice = bundleCount * 2 * targetItem.product.price;

        return Math.round(applyPrice * self.value * 1e2) / 1e2;
      }

      throw new Error(
        "Trying to calculate discount with non-existing type",
      );
    };

    return {
      getDiscount,
    };
  });

export type DiscountInstance = Instance<typeof DiscountModel>;
