import { useState, useEffect, useRef } from 'react'

export default function useAxios({ axiosInstance, method, url, requestConfig = {} } = configApi) {


  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const effectRun = useRef(false); //para saber em qual vez esta execução do useEffect,evitar varias execução do useEffect.

  useEffect(() => {
    const controller = new AbortController(); //Para abortar requisições em andamento e evitar múltiplas chamadas

    const fetch = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        })
        console.log(res)
        setData(res.data)
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      } finally {
        setLoading(false);
      }
    }

    if (effectRun.current) {
      fetch();
    }

    return () => { 
      controller.abort(); //chamada para abortar
      effectRun.current = true
    }
  }, [])

  return [data, loading, error]
}