import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { request } from '.././utils/axios-interceptor';
import { useAuth } from '../context/AuthContext';

const studentRegistration = (data: {
  studentId: string;
  email: string;
  fullname: string;
  course: string;
  college: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/student/register', method: 'post', data });

export const useStudentRegistration = () => {
  const { setAuth } = useAuth();
  return useMutation(studentRegistration, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
      setAuth({ user: data.user, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

type ErrorResponse = {
  message?: string;
};
