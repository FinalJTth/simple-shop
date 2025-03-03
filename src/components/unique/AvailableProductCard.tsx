import { ReactElement } from "react";
import Card from "../shared/Card.tsx";
import { Product } from "../../types/product.ts";
import useApi from "../../hooks/useApi.tsx";
import { useStores } from "../../stores/index.ts";

const AvailableProductCard = (): ReactElement => {
  const { cart } = useStores();

  const productsResult = useApi("/products");

  const handleAddCart = (product: Product, quantity: number) => {
    cart.addProduct(product, quantity);
  };

  return (
    <Card title="Available Food Sets">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {productsResult?.products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col rounded-lg border border-gray-600 bg-gray-700 p-4"
            style={{ borderColor: product.color }}
          >
            <div className="mb-2 flex items-start justify-between">
              <h3
                className="text-xl font-medium"
                style={{ color: product.color }}
              >
                {product.name}
              </h3>
              <span className="font-bold text-gray-200">${product.price}</span>
            </div>
            <p className="mb-4 flex-grow text-gray-300">
              {product.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <select
                className="mr-2 rounded border border-gray-600 bg-gray-800 p-2 text-gray-200"
                id={`quantity-${product.id}`}
                defaultValue="1"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button
                type="button"
                className="rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                onClick={() => {
                  const select = document.getElementById(
                    `quantity-${product.id}`,
                  ) as HTMLSelectElement;
                  const quantity = parseInt(select.value);
                  handleAddCart(product, quantity);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AvailableProductCard;
