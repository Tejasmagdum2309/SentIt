import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import useAuth from '../../hooks/useAuth';

function AuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [status, setStatus] = useState('Signing you in...');

  useEffect(() => {
    let cancelled = false;
    const token = searchParams.get('token');

    async function completeLogin() {
      if (!token) {
        toast.error('Login failed. Missing token.');
        navigate('/login', { replace: true });
        return;
      }

      try {
        localStorage.setItem('token', token);

        const response = await api.get('/users/me');
        const user = response.data?.data;

        if (!user) {
          throw new Error('User not found');
        }

        if (cancelled) return;

        login(token, user);
        toast.success('Logged in successfully');
        navigate('/dashboard', { replace: true });
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        if (cancelled) return;

        setStatus('Login failed');
        toast.error('Login failed. Please try again.');
        navigate('/login', { replace: true });
      }
    }

    completeLogin();

    return () => {
      cancelled = true;
    };
  }, [searchParams, login, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <CircularProgress size={32} />
      <Typography variant="body2" color="text.secondary">
        {status}
      </Typography>
    </Box>
  );
}

export default AuthCallbackPage;
