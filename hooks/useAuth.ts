import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { request } from '../utils/axios-interceptor';
import { useAuth } from '../context/AuthContext';

export type AuthenticateUserRes = {
  id: number;
  role: 'STUDENT' | 'TEACHER' | 'GRADUATE';
  email: string;
  username?: string;
  profile?: Profile;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type Profile = {
  id: number;
  fullname?: string;
  profilePhoto?: string;
  profilePhotoId?: string;
  department?: string;
  course?: string;
  college?: string;
  mobile?: string;
  userId: number;
};

const studentLogin = (data: { email: string; password: string }) =>
  request({ url: '/auth/login/user', method: 'post', data });

export const useStudentLogin = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  return useMutation(studentLogin, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
      setAuth({ user: data, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

const verifyToken = () => request({ url: '/auth' });

export const useVerifyToken = (): UseQueryResult<AuthenticateUserRes> =>
  useQuery(['auth'], verifyToken, {
    refetchOnWindowFocus: false,
    retry: false,
  });

type ErrorResponse = {
  message?: string;
};
