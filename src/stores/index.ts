import { createContext, use } from "react";
import { cart } from "./cart.ts";

export const models = {
  cart,
};

export const modelsContext = createContext(models);

export const useStores = () => use(modelsContext);
