import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        px: 2,
      }}
    >
      <Outlet />
    </Box>
  );
}

export default AuthLayout;
