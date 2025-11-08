import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
  History as HistoryIcon,
  Explore as ExploreIcon,
  Home as HomeIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  KeyboardArrowDown as ArrowDownIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';

const drawerWidth = 280;

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notifMenuAnchor, setNotifMenuAnchor] = useState<null | HTMLElement>(null);

  const menuItems = [
    { id: 'home', label: 'Home', path: '/', icon: <HomeIcon /> },
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { id: 'leads', label: 'Leads', path: '/leads', icon: <PeopleIcon /> },
    { id: 'followup', label: 'Follow-up', path: '/followup', icon: <ChatIcon />, badge: 3 },
    { id: 'history', label: 'History', path: '/history', icon: <HistoryIcon /> },
    { id: 'discover', label: 'Discover', path: '/discover', icon: <ExploreIcon /> },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotifMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotifMenuAnchor(event.currentTarget);
  };

  const handleNotifMenuClose = () => {
    setNotifMenuAnchor(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'text.primary',
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              mr: 4,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: '1.1rem',
              }}
            >
              OL
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              OMNI LEAD
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              maxWidth: 500,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#f8fafc',
                borderRadius: 2,
                px: 2,
                py: 1,
                width: '100%',
                border: '1px solid #e5e7eb',
                '&:hover': {
                  borderColor: 'primary.main',
                },
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search..."
                sx={{ flex: 1, fontSize: '0.9rem' }}
              />
              <Chip label="⌘K" size="small" sx={{ fontSize: '0.75rem' }} />
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Notifications */}
          <IconButton
            onClick={handleNotifMenuOpen}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifMenuAnchor}
            open={Boolean(notifMenuAnchor)}
            onClose={handleNotifMenuClose}
            PaperProps={{
              sx: { width: 320, mt: 1 },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle2" fontWeight={600}>
                Notifications
              </Typography>
            </Box>
            <MenuItem onClick={handleNotifMenuClose}>
              <Typography variant="body2">New lead from LINE</Typography>
            </MenuItem>
            <MenuItem onClick={handleNotifMenuClose}>
              <Typography variant="body2">Follow-up scheduled</Typography>
            </MenuItem>
            <MenuItem onClick={handleNotifMenuClose}>
              <Typography variant="body2">Lead converted</Typography>
            </MenuItem>
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* User Menu */}
          <Box
            onClick={handleUserMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              px: 1.5,
              py: 0.75,
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#f8fafc',
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              A
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>
            <ArrowDownIcon sx={{ fontSize: 20, color: 'text.secondary' }} />
          </Box>

          <Menu
            anchorEl={userMenuAnchor}
            open={Boolean(userMenuAnchor)}
            onClose={handleUserMenuClose}
            PaperProps={{
              sx: { width: 220, mt: 1 },
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>
              <ListItemIcon>
                <HelpIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Help & Support</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="error">Logout</Typography>
              </ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%', p: 1.5 }}>
          <List sx={{ flex: 1 }}>
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    sx={{
                      borderRadius: 2,
                      bgcolor: active ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                      '&:hover': {
                        bgcolor: active ? 'rgba(102, 126, 234, 0.12)' : 'rgba(0, 0, 0, 0.04)',
                      },
                      position: 'relative',
                      '&::before': active ? {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 3,
                        height: 24,
                        bgcolor: 'primary.main',
                        borderRadius: '0 3px 3px 0',
                      } : {},
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: active ? 'primary.main' : 'text.secondary',
                        minWidth: 40,
                      }}
                    >
                      {item.badge ? (
                        <Badge badgeContent={item.badge} color="error">
                          {item.icon}
                        </Badge>
                      ) : (
                        item.icon
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        '& .MuiTypography-root': {
                          fontWeight: active ? 600 : 500,
                          color: active ? 'primary.main' : 'text.secondary',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Workshop Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
              border: '1px solid rgba(102, 126, 234, 0.2)',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1.5,
                }}
              >
                <TrophyIcon sx={{ color: 'white', fontSize: 28 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                Lead Workshop
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>
                Learn advanced lead management strategies
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5568d3 0%, #5e3a7f 100%)',
                  },
                }}
              >
                Join Workshop
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 2, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
