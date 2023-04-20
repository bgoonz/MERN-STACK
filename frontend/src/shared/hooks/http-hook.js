//handles data parsing, response code checking and state managment.
import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //this will store data across renders
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });
          const responseData = await response.json();
          // We want to clear the abort controllers from the request that just completed.
          activeHttpRequests.current = activeHttpRequests.current.filter(
              ( reqCtrl ) => reqCtrl !== httpAbortCtrl
            );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };
  useEffect(() => {
    //return from useEffect is a cleanup function
    //activeHttpRequests.current is an array of abort controllers
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, [activeHttpRequests]);
  return { isLoading, error, sendRequest, clearError };
};
