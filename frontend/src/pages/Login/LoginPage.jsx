import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Link, Typography } from '@mui/material';
import { startGoogleLogin } from '../../utils/googleAuth';

function LoginPage() {
  const handleGoogleLogin = () => {
    startGoogleLogin();
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 400,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        boxShadow: '0 1px 3px 0 rgba(60,64,67,0.15)',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          px: 4,
          py: 5,
        }}
      >
        <Box
          component="img"
          src="/SentIt.svg"
          alt="SentIt"
          sx={{ height: 88, width: 'auto', mb: 0.5 }}
        />

        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Email Campaign Platform
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, mb: 1, maxWidth: 280 }}>
          Sign in with your Google account to manage and send email campaigns.
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={handleGoogleLogin}
          sx={{
            mt: 1,
            py: 1.25,
            borderRadius: 1,
          }}
        >
          Continue with Google
        </Button>

        <Typography
          variant="caption"
          sx={{
            mt: 1,
            maxWidth: 300,
            color: 'text.secondary',
            lineHeight: 1.5,
          }}
        >
          By continuing, you agree to SentIt&apos;s{' '}
          <Link
            component={RouterLink}
            to="/terms"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            component={RouterLink}
            to="/privacy"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            Privacy Policy
          </Link>
          .
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
