import { CallAPI } from '../services/axiosBase';
import useSWR from 'swr';

export const useSWRFetch = (endpoint, params = {}, configHeaders = null, responseType = null) => {
  const { data, error } = useSWR(
    endpoint,
    (endpoint) => CallAPI(endpoint, 'GET', {}, params, configHeaders, responseType),
    {
      refreshInterval: process.env.REACT_APP_SWR_INTERVAL
    }
  );

  return {
    response: data,
    isLoading: !error && !data,
    isError: error
  };
};
