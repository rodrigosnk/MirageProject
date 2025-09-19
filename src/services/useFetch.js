import { useEffect, useState } from "react";
import axios from "axios";

// React hook to fetch data with axios and cancellation support.
// Returns { data, loading, error }.
export default function useFetch(url, params) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const paramsString = params ? JSON.stringify(params) : null;

    useEffect(() => {
        if (!url) {
            setData(null);
            setError(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        const parsedParams = paramsString ? JSON.parse(paramsString) : undefined;

        const source = axios.CancelToken.source();

        axios
            .get(url, { params: parsedParams, cancelToken: source.token })
            .then((res) => {
                setData(res.data ?? res);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [url, paramsString]);
    console.log(data);
    return { data, loading, error };
}