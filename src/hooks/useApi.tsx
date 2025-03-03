import { useEffect, useState } from "react";
import { ConditionalResponseBody, Route } from "../types/api.ts";
import { api } from "../api/index.ts";

const useApi = <T extends Route>(
  route: T,
  dependencies: Array<unknown> = [],
): ConditionalResponseBody<T> | undefined => {
  const [result, setResult] = useState<
    ConditionalResponseBody<T> | undefined
  >();

  useEffect(() => {
    api.get(route).then((res) => setResult(res));
  }, dependencies);

  return result;
};

export default useApi;
