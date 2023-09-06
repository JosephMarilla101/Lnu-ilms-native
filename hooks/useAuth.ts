import { useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request } from '../utils/axios-interceptor';

const studentLogin = (data: { email: string; password: string }) =>
  request({ url: '/auth/login/student', method: 'post', data });

export const useStudentLogin = () => {
  //   const queryClient = useQueryClient();
  return useMutation(studentLogin, {
    onSuccess: async (data) => {
      //   localStorage.setItem('token', data.token);
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
      //   const user = data.user;
      //   queryClient.setQueriesData(['auth'], user);
    },
    onError: (error: ErrorResponse) => error,
  });
};

type ErrorResponse = {
  message?: string;
};
