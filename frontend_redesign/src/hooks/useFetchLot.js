import { useState, useEffect } from "react";

export function useFetchLot(url, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
        const result = await response.json();
        if (!cancelled) setData(result);
      } catch (err) {
        console.error(err);
        if (!cancelled) setData([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, setData };
}
