import { CallAPI } from '../services/axiosBase';
import useSWR from 'swr';

export const useSWRFetch = (endpoint, params = {}, configHeaders = null, responseType = null) => {
  const { data, error } = useSWR(
    endpoint,
    (endpoint) => CallAPI(endpoint, 'GET', {}, params, configHeaders, responseType),
    {
      refreshInterval: 10000
    }
  );

  return {
    response: data,
    isLoading: !error && !data,
    isError: error
  };
};
