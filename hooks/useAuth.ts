import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request } from '../utils/axios-interceptor';

const studentLogin = (data: { email: string; password: string }) =>
  request({ url: '/auth/login/student', method: 'post', data });

export const useStudentLogin = () =>
  useMutation(studentLogin, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
    },
    onError: (error: ErrorResponse) => error,
  });

type VerifyTokenResponse = {
  id: number;
  studentId: number;
  email: string;
  fullname: string;
  profilePhoto?: string;
  course: string;
  college: string;
  mobile: string;
  createdAt: Date;
  updatedAt: Date;
};

const verifyToken = () => request({ url: '/auth' });

export const useVerifyToken = (): UseQueryResult<VerifyTokenResponse> =>
  useQuery(['auth'], verifyToken, {
    refetchOnWindowFocus: false,
    retry: false,
  });

type ErrorResponse = {
  message?: string;
};
