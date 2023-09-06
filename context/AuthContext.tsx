import { router, useSegments } from 'expo-router';
import { createContext, useState } from 'react';
import { useStudentLogin } from '../hooks/useAuth';

type User = {
  id: number;
  email: string;
  fullname: string;
  profilePhoto?: string;
  course: string;
  mobiel: string;
};

type RegisterParams = {
  studentId: string;
  email: string;
  fullname: string;
  course: string;
  college: string;
  mobile: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

interface AuthProps {
  auth: User | null;
  isAuthenticating: boolean;
  register: (params: RegisterParams) => void;
  login: (params: LoginParams) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthProps | null>(null);

const AuthProvider = ({ children }: any) => {
  const useLogin = useStudentLogin();
  const [auth, setAuth] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const register = (params: RegisterParams) => {};
  const login = (params: LoginParams) => {
    useLogin.mutate({
      email: params.email,
      password: params.password,
    });
  };
  const logout = () => {};

  const value = { auth, isAuthenticating, register, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = AuthContext;

  if (!context) throw new Error('Context must be used within a Provider');

  return { ...context };
};
