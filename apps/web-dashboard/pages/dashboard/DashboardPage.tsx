import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
  Chip,
  Button,
  MenuItem,
  Select,
  FormControl,
  Paper,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Chat as ChatIcon,
  Phone as PhoneIcon,
  ShowChart as ChartIcon,
  Add as AddIcon,
  Message as MessageIcon,
  Assessment as ReportIcon,
  ArrowForward as ArrowForwardIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

export default function DashboardPage() {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total Leads',
      value: 234,
      change: '+12%',
      trend: 'up' as const,
      icon: <PeopleIcon sx={{ fontSize: 20 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Active Chats',
      value: 18,
      change: '+5',
      trend: 'up' as const,
      icon: <ChatIcon sx={{ fontSize: 20 }} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Calls Today',
      value: 42,
      change: '+8%',
      trend: 'up' as const,
      icon: <PhoneIcon sx={{ fontSize: 20 }} />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Conversion',
      value: '24%',
      change: '-2%',
      trend: 'down' as const,
      icon: <ChartIcon sx={{ fontSize: 20 }} />,
      color: '#8b5cf6',
    },
  ];

  const channelStats = [
    { channel: 'LINE', count: 145, color: '#06C755', percentage: 34.2 },
    { channel: 'Facebook', count: 89, color: '#0084FF', percentage: 21.0 },
    { channel: 'WhatsApp', count: 67, color: '#25D366', percentage: 15.8 },
    { channel: 'Form', count: 123, color: theme.palette.primary.main, percentage: 29.0 },
  ];

  const leadsByStatus = [
    { status: 'New', count: 45, color: theme.palette.primary.main },
    { status: 'Contacted', count: 78, color: theme.palette.warning.main },
    { status: 'Qualified', count: 56, color: theme.palette.success.main },
    { status: 'Converted', count: 34, color: '#8b5cf6' },
    { status: 'Lost', count: 21, color: theme.palette.error.main },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'lead' as const,
      title: 'New lead from form',
      description: 'สมชาย ใจดี submitted contact form',
      time: '5 mins ago',
      avatar: 'S',
      status: 'new',
    },
    {
      id: '2',
      type: 'chat' as const,
      title: 'New message on LINE',
      description: 'สมหญิง รักสุข: "สนใจสินค้าครับ"',
      time: '12 mins ago',
      avatar: 'S',
      status: 'active',
    },
    {
      id: '3',
      type: 'call' as const,
      title: 'Call completed',
      description: 'วิชัย มั่นคง - Duration: 15 mins',
      time: '30 mins ago',
      avatar: 'V',
      status: 'completed',
    },
    {
      id: '4',
      type: 'chat' as const,
      title: 'New message on Facebook',
      description: 'ประยุทธ์ ดีงาม: "ขอรายละเอียดเพิ่ม"',
      time: '1 hour ago',
      avatar: 'P',
      status: 'active',
    },
    {
      id: '5',
      type: 'lead' as const,
      title: 'Lead converted',
      description: 'มานี ศรีสุข - Deal closed: ฿50,000',
      time: '2 hours ago',
      avatar: 'M',
      status: 'completed',
    },
  ];

  const getTypeColor = (type: 'lead' | 'chat' | 'call') => {
    switch (type) {
      case 'lead':
        return theme.palette.primary.main;
      case 'chat':
        return theme.palette.success.main;
      case 'call':
        return theme.palette.warning.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  return (
    <Box>
      {/* Compact Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Welcome back, Admin! Here's what's happening today.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select defaultValue="today" sx={{ fontSize: '0.875rem' }}>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              textTransform: 'none',
              fontSize: '0.875rem',
              px: 2,
            }}
          >
            New Lead
          </Button>
        </Box>
      </Box>

      {/* Compact Stats Cards */}
      <Grid container spacing={1.5} sx={{ mb: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Card sx={{ boxShadow: 1 }}>
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ my: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Chip
                      icon={stat.trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 12 }} /> : <TrendingDownIcon sx={{ fontSize: 12 }} />}
                      label={stat.change}
                      size="small"
                      sx={{
                        height: 18,
                        fontSize: '0.65rem',
                        bgcolor: stat.trend === 'up' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                        color: stat.trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
                        '& .MuiChip-icon': { fontSize: 12, ml: 0.5 },
                      }}
                    />
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: alpha(stat.color, 0.1),
                      color: stat.color,
                      width: 36,
                      height: 36,
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions - Compact */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {[
          { icon: <AddIcon sx={{ fontSize: 16 }} />, label: 'Add Lead', color: theme.palette.primary.main },
          { icon: <PhoneIcon sx={{ fontSize: 16 }} />, label: 'Call', color: theme.palette.success.main },
          { icon: <MessageIcon sx={{ fontSize: 16 }} />, label: 'Message', color: theme.palette.warning.main },
          { icon: <ReportIcon sx={{ fontSize: 16 }} />, label: 'Reports', color: '#8b5cf6' },
        ].map((action, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={action.icon}
              sx={{
                py: 0.75,
                fontSize: '0.75rem',
                borderColor: alpha(action.color, 0.3),
                color: action.color,
                '&:hover': {
                  borderColor: action.color,
                  bgcolor: alpha(action.color, 0.05),
                },
              }}
            >
              {action.label}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Two Column Layout - Compact */}
      <Grid container spacing={1.5}>
        {/* Leads by Channel */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  Leads by Channel
                </Typography>
                <FormControl size="small">
                  <Select defaultValue="week" sx={{ fontSize: '0.75rem', '.MuiSelect-select': { py: 0.5 } }}>
                    <MenuItem value="week">Last 7 days</MenuItem>
                    <MenuItem value="month">Last 30 days</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Stack spacing={1.5}>
                {channelStats.map((channel) => (
                  <Box key={channel.channel}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.75 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          sx={{
                            bgcolor: alpha(channel.color, 0.1),
                            color: channel.color,
                            width: 28,
                            height: 28,
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          {channel.channel.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.875rem' }}>
                          {channel.channel}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ fontSize: '0.875rem' }}>
                        {channel.count}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={channel.percentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        bgcolor: alpha(channel.color, 0.1),
                        '& .MuiLinearProgress-bar': {
                          bgcolor: channel.color,
                          borderRadius: 3,
                        },
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Leads by Status - Compact */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>
                Lead Status
              </Typography>
              <Stack spacing={1}>
                {leadsByStatus.map((item) => (
                  <Paper
                    key={item.status}
                    elevation={0}
                    sx={{
                      p: 1.25,
                      bgcolor: alpha(item.color, 0.08),
                      border: `1px solid ${alpha(item.color, 0.2)}`,
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: alpha(item.color, 0.12),
                        transform: 'translateX(2px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            bgcolor: item.color,
                          }}
                        />
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>
                          {item.status}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle2" fontWeight={700} sx={{ color: item.color, fontSize: '0.9rem' }}>
                        {item.count}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities - Full Width Compact */}
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={700}>
                  Recent Activities
                </Typography>
                <Button size="small" endIcon={<ArrowForwardIcon sx={{ fontSize: 14 }} />} sx={{ textTransform: 'none', fontSize: '0.75rem' }}>
                  View All
                </Button>
              </Box>
              <Stack spacing={1}>
                {recentActivities.map((activity) => (
                  <Paper
                    key={activity.id}
                    elevation={0}
                    sx={{
                      p: 1.25,
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: 'background.paper',
                        borderColor: getTypeColor(activity.type),
                        transform: 'translateX(2px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(getTypeColor(activity.type), 0.1),
                          color: getTypeColor(activity.type),
                          width: 32,
                          height: 32,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {activity.avatar}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.25 }}>
                          <Typography variant="body2" fontWeight={600} sx={{ fontSize: '0.8rem' }}>
                            {activity.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', whiteSpace: 'nowrap', ml: 1 }}>
                            {activity.time}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: '0.75rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            mb: 0.5,
                          }}
                        >
                          {activity.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 0.75 }}>
                          <Chip
                            label={activity.type.toUpperCase()}
                            size="small"
                            sx={{
                              bgcolor: alpha(getTypeColor(activity.type), 0.1),
                              color: getTypeColor(activity.type),
                              fontWeight: 600,
                              fontSize: '0.65rem',
                              height: 18,
                            }}
                          />
                          <Chip
                            icon={activity.status === 'completed' ? <CheckCircleIcon sx={{ fontSize: 12 }} /> : <ScheduleIcon sx={{ fontSize: 12 }} />}
                            label={activity.status}
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              textTransform: 'capitalize',
                              '& .MuiChip-icon': { fontSize: 12 },
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
