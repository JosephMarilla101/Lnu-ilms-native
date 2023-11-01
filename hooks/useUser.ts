import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { request } from '.././utils/axios-interceptor';
import { useAuth } from '../context/AuthContext';

const studentRegistration = (data: {
  id: string;
  email: string;
  fullname: string;
  course: string;
  college: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/user/register/student', method: 'post', data });

export const useStudentRegistration = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  return useMutation(studentRegistration, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
      setAuth({ user: data.user, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

const graduateRegistration = (data: {
  id: string;
  email: string;
  fullname: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/user/register/graduate', method: 'post', data });

export const useGraduateRegistration = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  return useMutation(graduateRegistration, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
      setAuth({ user: data.user, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

const teacherRegistration = (data: {
  id: string;
  email: string;
  fullname: string;
  department: string;
  mobile: string;
  password: string;
  password_confirmation: string;
}) => request({ url: '/user/register/teacher', method: 'post', data });

export const useTeacherRegistration = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  return useMutation(teacherRegistration, {
    onSuccess: async (data) => {
      await AsyncStorage.setItem('lnu-ilms_token', data.token);
      const user = data.user;
      queryClient.setQueriesData(['auth'], user);
      setAuth({ user: data.user, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

const updateProfile = (data: {
  email: string;
  fullname?: string;
  course?: string;
  college?: string;
  department?: string;
  mobile?: string;
}) => request({ url: '/user', method: 'put', data });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  return useMutation(updateProfile, {
    onSuccess: async (data) => {
      queryClient.setQueriesData(['auth'], data);
      setAuth({ user: data, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

const changePassword = (data: {
  current_password: string;
  new_password: string;
  password_confirmation: string;
}) => request({ url: '/user/change_password', method: 'put', data });

export const useChangePassword = () =>
  useMutation(changePassword, {
    onError: (error: ErrorResponse) => error,
  });

const updateProfilePhoto = (data: {
  profilePhoto: string;
  profilePhotoId: string;
}) => request({ url: '/user/profile_photo', method: 'put', data });

export const useUpdateProfilePhoto = () => {
  const queryClient = useQueryClient();
  const { setAuth } = useAuth();
  return useMutation(updateProfilePhoto, {
    onSuccess: async (data) => {
      queryClient.setQueriesData(['auth'], data);
      setAuth({ user: data, verifying: false });
    },
    onError: (error: ErrorResponse) => error,
  });
};

type ErrorResponse = {
  message?: string;
};
