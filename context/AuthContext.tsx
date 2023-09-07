import { router, useRootNavigation, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
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

type AuthType = {
  user: User | null;
  verifying: boolean;
};
interface AuthProps {
  auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
  logout: () => void;
}

const AuthContext = createContext<AuthProps | null>(null);

// This hook will protect the route access based on user authentication.
export function useProtectedRoute({ auth }: { auth: AuthType }) {
  const [isNavigationReady, setNavigationReady] = useState(false);
  const rootNavigation = useRootNavigation();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener('state', () => {
      setNavigationReady(true);
    });

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!isNavigationReady || auth.verifying) return;

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !auth.user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/login');
    } else if (auth.user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [auth, auth, isNavigationReady, segments]);
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({
    user: null,
    verifying: true,
  });

  const logout = async () => {
    await AsyncStorage.removeItem('lnu-ilms_token');
    router.replace('/login');
    setAuth({
      user: null,
      verifying: false,
    });
  };

  const value = { auth, setAuth, logout };

  useProtectedRoute({ auth });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('Context must be used within a Provider');

  return { ...context };
};
