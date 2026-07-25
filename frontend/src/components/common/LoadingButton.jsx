import { Button, CircularProgress } from '@mui/material';

function LoadingButton({ loading = false, children, disabled, startIcon, ...props }) {
  return (
    <Button
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      {...props}
    >
      {children}
    </Button>
  );
}

export default LoadingButton;
