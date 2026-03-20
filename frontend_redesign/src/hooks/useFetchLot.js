// src\hooks\useFetchLot.js


import { useState, useEffect } from "react";

export function useFetchLot(url, options = {}) {


    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            setError(null);
            return;
        }


        let cancelled = false;

        async function fetchData() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url, options);
                if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);
                const result = await response.json();
                if (!cancelled) setData(result);
            } catch (err) {
                setError(err);
                console.error(err);
                if (!cancelled) setData([]);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, [url]);

    return { data, loading, error };
}
