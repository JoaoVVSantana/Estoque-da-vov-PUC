import { useState, useEffect } from "react";

const useAxios = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //different!
    const [controller, setController] = useState();

    const axiosFetch = async ({ axiosInstance, method, url, data = {}, config = {} }) => {
        try {
            setLoading(true);
            setError('');
            setResponse([]);
            const ctrl = new AbortController();
            setController(ctrl);
    
            const res = await axiosInstance[method.toLowerCase()](url, data, {
                ...config,
                signal: ctrl.signal,
            });
            console.log("AXIOS response:",res);
            setResponse(res.data);
        } catch (err) {
            console.log("AXIOS Erro na requisição:",err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("AXIOS Controller:",controller)

        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxios