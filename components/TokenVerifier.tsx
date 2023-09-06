import { useEffect } from 'react';
import { useVerifyToken } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';

// This component handles the verifying status of the AuthProvider
// to prevent redirect when token is in verifying status.

const TokenVerifier = ({ children }: { children: React.ReactNode }) => {
  const tokenVerification = useVerifyToken();
  const { setAuth } = useAuth();

  useEffect(() => {
    setAuth({ user: null, verifying: true });

    if (tokenVerification.isSuccess) {
      setAuth({ user: tokenVerification.data, verifying: false });
    }

    if (tokenVerification.isError) {
      setAuth({ user: null, verifying: false });
    }
  }, [
    tokenVerification.isLoading,
    tokenVerification.isSuccess,
    tokenVerification.isError,
  ]);

  return children;
};

export default TokenVerifier;
