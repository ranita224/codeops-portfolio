import { useState, useEffect } from "react";

export function useFetch(loader) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    setLoading(true);
    setError(null);

    loader(ctrl.signal)
      .then((result) => setData(result))
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message || "Failed to load data");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [loader]);

  return { data, loading, error };
}