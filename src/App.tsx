import { ReactElement } from "react";
import AvailableProductCard from "./components/unique/AvailableProductCard.tsx";
import ShoppingCartCart from "./components/unique/ShoppingCartCard.tsx";

const App = (): ReactElement => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-100">
          Rainbow Food Store
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Food Items Section */}
          <div className="lg:col-span-2">
            <AvailableProductCard />
          </div>

          {/* Shopping Cart Section */}
          <div className="lg:col-span-1">
            <ShoppingCartCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
