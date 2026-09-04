import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { startGoogleLogin } from '../../utils/googleAuth';

const steps = [
  {
    number: '1',
    title: 'Create a campaign',
    description: 'Write your email and define your recipients.',
  },
  {
    number: '2',
    title: 'Send with Gmail',
    description: 'Send campaigns directly through your connected Gmail account.',
  },
  {
    number: '3',
    title: 'Manage your campaigns',
    description:
      'Keep track of drafts, sent campaigns, and email activity from one dashboard.',
  },
];

const features = [
  {
    icon: CampaignOutlinedIcon,
    title: 'Email Campaigns',
    description: 'Create and manage campaigns from one place.',
  },
  {
    icon: MailOutlinedIcon,
    title: 'Gmail Integration',
    description: 'Send emails using your connected Gmail account.',
  },
  {
    icon: Inventory2OutlinedIcon,
    title: 'Campaign Management',
    description: 'Easily manage drafts and previously sent campaigns.',
  },
  {
    icon: DashboardOutlinedIcon,
    title: 'Simple Dashboard',
    description: 'See your campaign and email activity at a glance.',
  },
];

function LandingPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <AppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            maxWidth: 1120,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            justifyContent: 'space-between',
          }}
        >
          <Box
            component="img"
            src="/SentIt.svg"
            alt="SentIt"
            sx={{ height: 48, width: 'auto' }}
          />
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            sx={{ borderRadius: 1, px: 2.5 }}
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ pt: { xs: 8, md: 12 }, pb: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 32, sm: 40, md: 48 },
              fontWeight: 500,
              color: 'text.primary',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              mb: 2,
            }}
          >
            Send smarter. Reach more people.
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: 'text.secondary',
              lineHeight: 1.6,
              maxWidth: 560,
              mx: 'auto',
              mb: 4,
            }}
          >
            Create and send personalized email campaigns directly from your Gmail
            account with SentIt.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={startGoogleLogin}
            sx={{ py: 1.5, px: 3.5, borderRadius: 1, fontSize: 15 }}
          >
            Get Started with Google
          </Button>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 2,
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
        </Box>
      </Container>

      <Box sx={{ backgroundColor: '#F8FAFC', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md">
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 22, md: 26 },
              fontWeight: 500,
              color: 'text.primary',
              textAlign: 'center',
              mb: 4,
            }}
          >
            How SentIt works
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {steps.map((step) => (
              <Box key={step.title} sx={{ textAlign: 'center', px: 1 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: '#e8f0fe',
                    color: 'primary.main',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    fontSize: 14,
                    mb: 2,
                  }}
                >
                  {step.number}
                </Box>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  {step.title}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 22, md: 26 },
            fontWeight: 500,
            color: 'text.primary',
            textAlign: 'center',
            mb: 4,
          }}
        >
          Everything you need to send campaigns
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 2.5,
          }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      backgroundColor: '#e8f0fe',
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Icon fontSize="small" />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: 'text.primary',
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">{feature.description}</Typography>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Container>

      <Box
        sx={{
          backgroundColor: '#F8FAFC',
          borderTop: '1px solid #E2E8F0',
          py: { xs: 7, md: 9 },
        }}
      >
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 24, md: 28 },
              fontWeight: 500,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Ready to send your first campaign?
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={startGoogleLogin}
            sx={{ py: 1.5, px: 3.5, borderRadius: 1, fontSize: 15 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default LandingPage;
