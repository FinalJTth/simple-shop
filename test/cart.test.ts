/// <reference lib="deno.ns" />
import { assertEquals } from "jsr:@std/assert";
import { CartModel } from "../src/stores/cart.ts";
import { ProductModel } from "../src/stores/product.ts";
import { DiscountModel } from "../src/stores/discount.ts";
import { api } from "../src/api/index.ts";

const productsData = await api.get("/products");
const discountsData = await api.get("/discounts");

Deno.test("Cart - getTotalPrice calculation", () => {
  const cart = CartModel.create({
    cartItems: [],
    discounts: [],
  });

  // Create products
  const redSet = ProductModel.create(productsData.products[0]); // Red Set - 50
  const greenSet = ProductModel.create(productsData.products[1]); // Green Set - 40

  // Add 2 red sets and 1 green set
  cart.addProduct(redSet, 2);
  cart.addProduct(greenSet, 1);

  // Total should be: (2 * 50) + (1 * 40) = 140
  assertEquals(cart.getTotalPrice(), 140);

  // Add another green set
  cart.addProduct(greenSet, 1);

  // Total should be: (2 * 50) + (2 * 40) = 180
  assertEquals(cart.getTotalPrice(), 180);

  // Remove one red set
  cart.removeProduct(redSet, 1);

  // Total should be: (1 * 50) + (2 * 40) = 130
  assertEquals(cart.getTotalPrice(), 130);
});

Deno.test("Cart - getDiscountPrice with total discount", () => {
  const cart = CartModel.create({
    cartItems: [],
    discounts: [],
  });

  // Create products
  const redSet = ProductModel.create(productsData.products[0]); // Red Set - 50
  const greenSet = ProductModel.create(productsData.products[1]); // Green Set - 40

  // Add 1 red set and 1 green set
  cart.addProduct(redSet, 1);
  cart.addProduct(greenSet, 1);

  // Add MEMBER10 discount (10% off total)
  const memberDiscount = DiscountModel.create(discountsData.discounts[0]);
  cart.addDiscount(memberDiscount);

  /*
   * Total: 50 + 40 = 90
   * Discount: 90 * 0.1 = 9
   */
  assertEquals(cart.getDiscountPrice(), 9);

  // Add another red set
  cart.addProduct(redSet, 1);

  /*
   * Total: (2 * 50) + 40 = 140
   * Discount: 140 * 0.1 = 14
   */
  assertEquals(cart.getDiscountPrice(), 14);
});

Deno.test("Cart - getDiscountPrice with bundle discount", () => {
  const cart = CartModel.create({
    cartItems: [],
    discounts: [],
  });

  // Create products - Orange Set (id: 6, price: 120)
  const orangeSet = ProductModel.create(productsData.products[6]);

  // Add 1 orange set
  cart.addProduct(orangeSet, 1);

  // Add ORANGE5 bundle discount (5% off when buying 2 or more orange sets)
  const orangeDiscount = DiscountModel.create(discountsData.discounts[1]);
  cart.addDiscount(orangeDiscount);

  // Only 1 orange set, so no bundle discount applies
  assertEquals(cart.getDiscountPrice(), 0);

  // Add another orange set to trigger the bundle discount
  cart.addProduct(orangeSet, 1);
  /*
   * Total: 2 * 120 = 240
   * Bundle discount: 240 * 0.05 = 12
   */
  assertEquals(cart.getDiscountPrice(), 12);

  // Add one more orange set
  cart.addProduct(orangeSet, 1);
  /*
   * Total: 3 * 120 = 360
   * Only 2 sets qualify for the bundle (floor(3/2) = 1 bundle)
   * Bundle discount: (2 * 120) * 0.05 = 12
   */
  assertEquals(cart.getDiscountPrice(), 12);

  // Add one more orange set (total 4)
  cart.addProduct(orangeSet, 1);

  /*
   * Total: 4 * 120 = 480
   * 2 bundles qualify (floor(4/2) = 2 bundles)
   * Bundle discount: (4 * 120) * 0.05 = 24
   */
  assertEquals(cart.getDiscountPrice(), 24);
});

Deno.test("Cart - getDiscountedPrice calculation", () => {
  const cart = CartModel.create({
    cartItems: [],
    discounts: [],
  });

  // Create products
  const redSet = ProductModel.create(productsData.products[0]); // Red Set - 50
  const greenSet = ProductModel.create(productsData.products[1]); // Green Set - 40
  const pinkSet = ProductModel.create(productsData.products[4]); // Pink Set - 80

  // Add 2 red sets, 1 green set, and 2 pink sets
  cart.addProduct(redSet, 2);
  cart.addProduct(greenSet, 1);
  cart.addProduct(pinkSet, 2);

  // Total: (2 * 50) + (1 * 40) + (2 * 80) = 300
  assertEquals(cart.getTotalPrice(), 300);

  // Add MEMBER10 discount (10% off total)
  const memberDiscount = DiscountModel.create(discountsData.discounts[0]);
  cart.addDiscount(memberDiscount);

  // Add PINK5 bundle discount (5% off when buying 2 or more pink sets)
  const pinkDiscount = DiscountModel.create(discountsData.discounts[2]);
  cart.addDiscount(pinkDiscount);

  /*
   * Discount:
   * - Member discount: 300 * 0.1 = 30
   * - Pink bundle discount: (2 * 80) * 0.05 = 8
   * Total discount: 30 + 8 = 38
   */
  assertEquals(cart.getDiscountPrice(), 38);
  /*
   * Total: 300
   * Discounted price: 300 - 38 = 262
   */
  assertEquals(cart.getDiscountedPrice(), 262);
});

Deno.test("Cart - multiple discounts calculation", () => {
  const cart = CartModel.create({
    cartItems: [],
    discounts: [],
  });

  // Add all available discounts
  discountsData.discounts.forEach((discount) => {
    cart.addDiscount(DiscountModel.create(discount));
  });

  // Add various products
  const redSet = ProductModel.create(productsData.products[0]); // Red Set - 50
  const greenSet = ProductModel.create(productsData.products[1]); // Green Set - 40
  const orangeSet = ProductModel.create(productsData.products[6]); // Orange Set - 120
  const pinkSet = ProductModel.create(productsData.products[4]); // Pink Set - 80

  cart.addProduct(redSet, 1);
  cart.addProduct(greenSet, 2);
  cart.addProduct(orangeSet, 2);
  cart.addProduct(pinkSet, 2);

  // Total: 50 + (2 * 40) + (2 * 120) + (2 * 80) = 530
  assertEquals(cart.getTotalPrice(), 530);

  /*
   * Discounts:
   * - MEMBER10: 530 * 0.1 = 53
   * - ORANGE5 bundle: (2 * 120) * 0.05 = 12
   * - PINK5 bundle: (2 * 80) * 0.05 = 8
   * - GREEN5 bundle: (2 * 40) * 0.05 = 4
   * Total discount: 53 + 12 + 8 + 4 = 77
   */
  assertEquals(cart.getDiscountPrice(), 77);

  // Discounted price: 530 - 77 = 453
  assertEquals(cart.getDiscountedPrice(), 453);
});
