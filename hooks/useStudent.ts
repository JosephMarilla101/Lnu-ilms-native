import { useMutation } from '@tanstack/react-query';
import { request } from '.././utils/axios-interceptor';

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
  return useMutation(studentRegistration, {
    onError: (error: ErrorResponse) => error,
  });
};

type ErrorResponse = {
  message?: string;
};
