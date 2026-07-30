import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useAuth from '../../hooks/useAuth';
import { NAV_HEIGHT, SIDEBAR_WIDTH } from './Sidebar';

function getPageTitle(pathname) {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/campaigns/new') return 'New Campaign';
  if (pathname.startsWith('/campaign/')) return 'Campaign Emails';
  if (pathname.startsWith('/campaigns/')) return 'Campaign';
  if (pathname === '/campaigns') return 'Campaigns';
  if (pathname === '/nextPhase') return 'Next Phase';
  if (pathname === '/settings') return 'Settings';
  return 'SentIt';
}

function TopBar() {
  const location = useLocation();
  const { user } = useAuth();
  const title = getPageTitle(location.pathname);

  const displayName = user?.name || user?.email || 'U';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
        ml: `${SIDEBAR_WIDTH}px`,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #E2E8F0',
        color: 'text.primary',
        borderRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          gap: 2,
          minHeight: `${NAV_HEIGHT}px !important`,
          height: NAV_HEIGHT,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 500,
            color: 'text.primary',
            flexShrink: 0,
          }}
        >
          {title}
        </Typography>

        {/* <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            size="small"
            placeholder="Search campaigns"
            sx={{
              width: '100%',
              maxWidth: 420,
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                '& fieldset': {
                  borderColor: '#E2E8F0',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box> */}

        <Avatar sx={{ width: 36, height: 36, fontSize: 13 }}>{initials}</Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
