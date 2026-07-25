import {
  Avatar,
  Box,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import useAuth from '../../hooks/useAuth';

function SettingsPage() {
  const { user } = useAuth();
  const displayName = user?.name || 'User';
  const email = user?.email || 'Not available';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Paper
      sx={{
        maxWidth: 640,
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        p: 3,
      }}
    >
      <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'text.primary', mb: 2 }}>
        Account
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Avatar sx={{ width: 48, height: 48 }}>{initials}</Avatar>
        <Box>
          <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
            {displayName}
          </Typography>
          <Typography variant="body2">{email}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" sx={{ mb: 1 }}>
        Signed in with Google
      </Typography>
      <Typography variant="caption">
        Profile settings and preferences will be available here in a later update.
      </Typography>
    </Paper>
  );
}

export default SettingsPage;
