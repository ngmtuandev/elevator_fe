import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";
import apiClient from "../config/axiosConfig";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  postData: (body: any, config?: AxiosRequestConfig) => Promise<void>;
}

function useFetchApi<T>(
  url: string,
  method: "GET" | "POST" = "GET",
  options?: AxiosRequestConfig
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<T>(url, options);
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  const postData = async (body: any, config?: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<T>(url, body, {
        ...options,
        ...config,
      });
      setData(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (method === "GET") {
      fetchData();
    }
  }, [fetchData, method]);

  return { data, loading, error, fetchData, postData };
}

export default useFetchApi;
