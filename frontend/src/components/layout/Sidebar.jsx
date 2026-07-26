import { useNavigate, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
// import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
// import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import useAuth from '../../hooks/useAuth';

export const SIDEBAR_WIDTH = 250;

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlinedIcon fontSize="small" /> },
  // { label: 'New Campaign', path: '/campaigns/new', icon: <AddIcon fontSize="small" /> },
  { label: 'Campaigns', path: '/campaigns', icon: <FolderOutlinedIcon fontSize="small" /> },
  // { label: 'Drafts', path: '/campaigns?status=draft', icon: <DraftsOutlinedIcon fontSize="small" /> },
  // { label: 'Sent', path: '/campaigns?status=sent', icon: <SendOutlinedIcon fontSize="small" /> },
  { label: 'Next Phase', path: '/nextPhase', icon: <RocketLaunchOutlinedIcon fontSize="small" /> },
  { label: 'Settings', path: '/settings', icon: <SettingsOutlinedIcon fontSize="small" /> },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    const [pathname, search = ''] = path.split('?');

    if (pathname === '/campaigns' && search) {
      return location.pathname === '/campaigns' && location.search === `?${search}`;
    }

    if (pathname === '/campaigns') {
      return (
        (location.pathname === '/campaigns' ||
          location.pathname.startsWith('/campaign/')) &&
        !location.search.includes('status=')
      );
    }

    if (pathname === '/campaigns/new') {
      return location.pathname === '/campaigns/new';
    }

    return location.pathname === pathname;
  };

  const displayName = user?.name || user?.email || 'User';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid #E2E8F0',
          backgroundColor: '#ffffff',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          py: 2,
        }}
      >
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Box
            component="img"
            src="/SentIt.svg"
            alt="SentIt"
            sx={{height: 32, width: 'auto', objectFit: 'contain', display: 'block', mx: 'auto' }}
          />
        </Box>

        <Divider />

        <List sx={{ px: 1, py: 1.5, flex: 1 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={isActive(item.path)}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: '10px',
                mb: 0.5,
                py: 1,
                '&.Mui-selected': {
                  backgroundColor: '#E8F0FE',
                  borderLeft: 'none',
                  '&:hover': {
                    backgroundColor: '#D2E3FC',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#1976D2',
                  },
                  '& .MuiListItemText-primary': {
                    color: '#1976D2',
                    fontWeight: 500,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ px: 2, pt: 1 }}>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, fontSize: 13 }}>{initials}</Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{ fontSize: 13, fontWeight: 500, color: 'text.primary' }}
              >
                {displayName}
              </Typography>
              {user?.email && (
                <Typography noWrap variant="caption">
                  {user.email}
                </Typography>
              )}
            </Box>
          </Box>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={logout}
            sx={{ borderRadius: '8px' }}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
