import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const baseURL = 'http://192.168.234.71:8000/api';
const baseURL = 'https://lnu-ilms-api-m5za.onrender.com/api';

const client = axios.create({
  baseURL,
});

export const request = async ({ ...options }: AxiosRequestConfig) => {
  const tokenString = await AsyncStorage.getItem('lnu-ilms_token');

  const token = tokenString ? JSON.stringify(tokenString) : null;

  if (token)
    client.defaults.headers.common.Authorization = `Bearer ${JSON.parse(
      token
    )}`;

  const onSuccess = (response: AxiosResponse) => {
    return response.data;
  };
  const onError = (error: AxiosError) => {
    throw error.response?.data;
  };

  return client(options).then(onSuccess).catch(onError);
};
