import { useCallback, useState } from "react";

const useFetch = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (reqConfig, processData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
            reqConfig.url, {
                method: reqConfig.method ? reqConfig.method : 'GET',
                headers: reqConfig.headers ? reqConfig.headers : {},
                body: reqConfig.body ? JSON.stringify(reqConfig.body) : null
            }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        processData(data);

      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, []);
    return {
        isLoading,
        error,
        sendRequest
    };
}

export default useFetch;