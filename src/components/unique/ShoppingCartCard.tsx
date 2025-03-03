import { ReactElement, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Card from "../shared/Card.tsx";
import { useStores } from "../../stores/index.ts";
import { Product } from "../../types/product.ts";
import useApi from "../../hooks/useApi.tsx";

const ShoppingCartCard = (): ReactElement => {
  const { cart } = useStores();

  const discountsResult = useApi("/discounts");

  useEffect(() => {
    // Force use all of the available discount
    if (discountsResult !== undefined) {
      cart.setDiscounts(discountsResult.discounts);
    }
  }, [discountsResult]);

  const handleIncrement = (product: Product) => {
    cart.addProduct(product, 1);
  };

  const handleDecrement = (product: Product) => {
    cart.removeProduct(product, 1);
  };

  return (
    <Card title="Shopping Cart">
      {cart.cartItems.length === 0
        ? <p className="italic text-gray-400">Your cart is empty</p>
        : (
          <>
            <div className="divide-y divide-gray-700">
              {cart.cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between py-3"
                >
                  <div>
                    <h4
                      className="font-medium"
                      style={{ color: item.product.color }}
                    >
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      ${item.product.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4 font-bold text-gray-200">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <div className="flex items-center rounded border border-gray-700 bg-gray-700">
                      <button
                        type="button"
                        className="px-2 py-1 text-gray-300 hover:bg-gray-600"
                        onClick={() => handleDecrement(item.product)}
                      >
                        −
                      </button>
                      <span className="px-2 text-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="px-2 py-1 text-gray-300 hover:bg-gray-600"
                        onClick={() => handleIncrement(item.product)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-700 pt-4">
              <div className="mb-2 flex justify-between text-gray-200">
                <span>Subtotal:</span>
                <span className="font-bold">
                  ${cart.getTotalPrice().toFixed(2)}
                </span>
              </div>

              {cart.getDiscountDetails().map((discountDetail, index) => {
                if (discountDetail.value > 0) {
                  return (
                    <div
                      key={index}
                      className="mb-2 flex justify-between text-gray-500"
                    >
                      <span>{discountDetail.code}:</span>
                      <span>
                        -${discountDetail.value.toFixed(2)}
                      </span>
                    </div>
                  );
                }
              })}

              {cart.getDiscountPrice() > 0 && (
                <div className="mb-2 flex justify-between text-green-400">
                  <span>Discount:</span>
                  <span className="font-bold">
                    -${cart.getDiscountPrice().toFixed(2)}
                  </span>
                </div>
              )}

              <div className="mt-2 flex justify-between border-t border-gray-700 pt-2 text-xl font-bold text-gray-100">
                <span>Total:</span>
                <span>${cart.getDiscountedPrice().toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="mt-4 w-full rounded bg-green-600 py-2 text-white transition hover:bg-green-700"
              >
                Checkout
              </button>
            </div>
          </>
        )}
    </Card>
  );
};

export default observer(ShoppingCartCard);
