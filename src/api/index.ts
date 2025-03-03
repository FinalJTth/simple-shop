import { ConditionalResponseBody } from "../types/api.ts";
import { Route } from "../types/api.ts";
import { Color } from "../types/color.ts";

class ApiService {
  baseUrl: string;
  version: number;
  routeAlias: string | undefined;

  url: string;

  constructor(
    baseUrl: string,
    version: number,
    routeAlias: string | undefined = undefined,
  ) {
    this.baseUrl = baseUrl;
    this.version = version;
    this.routeAlias = routeAlias;

    this.url = `${baseUrl}/v${version}${routeAlias ? "/" + routeAlias : ""}`;
  }

  get = async <T extends Route>(route: T) => {
    const response = await fetch(`${this.url}/${MOCK_API_ROUTE[route]}`, {
      method: "GET",
    });

    if (!response.ok) {
      return this.fallback(route);
    }

    return (await response.json()).record as ConditionalResponseBody<T>;
  };

  fallback = <T extends Route>(route: T): ConditionalResponseBody<T> => {
    return FALLBACK_DATA[route] as ConditionalResponseBody<T>;
  };
}

// This is a mock api route to fetch json from jsonbin.io
export const MOCK_API_ROUTE = {
  "/products": "67c53d33acd3cb34a8f3f0aa",
  "/discounts": "67c5653be41b4d34e49fcfe8",
};

export const FALLBACK_DATA = {
  "/products": {
    products: [
      {
        id: 0,
        name: "Red Set",
        color: "red" as Color,
        price: 50,
        description: "Spicy tomato pasta with red bell peppers",
      },
      {
        id: 1,
        name: "Green Set",
        color: "green" as Color,
        price: 40,
        description: "Spinach salad with avocado and cucumber",
      },
      {
        id: 2,
        name: "Blue Set",
        color: "blue" as Color,
        price: 30,
        description: "Blueberry pancakes with blue spirulina smoothie",
      },
      {
        id: 3,
        name: "Yellow Set",
        color: "yellow" as Color,
        price: 50,
        description: "Lemon chicken with corn and yellow squash",
      },
      {
        id: 4,
        name: "Pink Set",
        color: "pink" as Color,
        price: 80,
        description: "Strawberry icecream with marshmello",
      },
      {
        id: 5,
        name: "Purple Set",
        color: "purple" as Color,
        price: 90,
        description: "Purple cabbage wrap with violet potatoes",
      },
      {
        id: 6,
        name: "Orange Set",
        color: "orange" as Color,
        price: 120,
        description: "Carrot and pumpkin soup with orange zest",
      },
    ],
  },
  "/discounts": {
    discounts: [
      {
        id: 0,
        code: "MEMBER10",
        type: "total",
        value: 0.1,
      },
      {
        id: 1,
        code: "ORANGE5",
        type: "bundle",
        targetProductId: 6,
        value: 0.05,
      },
      {
        id: 2,
        code: "PINK5",
        type: "bundle",
        targetProductId: 4,
        value: 0.05,
      },
      {
        id: 3,
        code: "GREEN5",
        type: "bundle",
        targetProductId: 1,
        value: 0.05,
      },
    ],
  },
};

export const api = new ApiService("https://api.jsonbin.io", 3, "b");
