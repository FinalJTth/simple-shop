import { Instance, types } from "mobx-state-tree";

export const ProductModel = types
  .model("Product", {
    id: types.number,
    name: types.string,
    color: types.union(
      types.literal("red"),
      types.literal("green"),
      types.literal("blue"),
      types.literal("yellow"),
      types.literal("pink"),
      types.literal("purple"),
      types.literal("orange"),
    ),
    price: types.number,
    description: types.string,
  });

export type ProductInstance = Instance<typeof ProductModel>;
