import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Link, Typography } from '@mui/material';

function Section({ title, children }) {
  return (
    <Box sx={{ mb: 3.5 }}>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 500,
          color: 'text.primary',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function PrivacyPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F8FAFC', py: 4 }}>
      <Container maxWidth="md">
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            component="img"
            src="/SentIt.svg"
            alt="SentIt"
            sx={{ height: 56, width: 'auto' }}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: '#ffffff',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            p: { xs: 3, md: 4 },
          }}
        >
          <Typography
            sx={{ fontSize: 24, fontWeight: 500, color: 'text.primary', mb: 0.5 }}
          >
            Privacy Policy
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Last Updated: July 18, 2026
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
            SentIt values your privacy and is committed to protecting your
            information.
          </Typography>

          <Section title="Information We Collect">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1.5 }}>
              When you sign in with Google, we may collect:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 2 }}>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Your name
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Email address
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Google profile picture
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Google OAuth tokens required to operate the service
                </Typography>
              </li>
            </Box>

            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1.5 }}>
              When using SentIt, we may also store:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Campaign information
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Uploaded recipient lists
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Email templates
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Email sending history
                </Typography>
              </li>
            </Box>
          </Section>

          <Section title="How We Use Your Information">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1.5 }}>
              Your information is used only to:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Create and manage your account
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Authenticate you securely
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Send emails that you explicitly initiate
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Maintain campaign history
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Improve the functionality of SentIt
                </Typography>
              </li>
            </Box>
          </Section>

          <Section title="Google Data">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              SentIt uses Google OAuth to access your Google account only after
              your permission.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              We do not collect, store, or have access to your Google password.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              OAuth tokens are stored securely and are used only for features you
              authorize.
            </Typography>
          </Section>

          <Section title="Data Sharing">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              SentIt does not sell your personal information.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              We may share information only when required by law or to protect
              the security of the platform.
            </Typography>
          </Section>

          <Section title="Data Security">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              We implement reasonable security measures to protect your
              information.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              However, no online service can guarantee absolute security.
            </Typography>
          </Section>

          <Section title="Data Retention">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              We retain your information only as long as necessary to provide the
              service or comply with legal obligations.
            </Typography>
          </Section>

          <Section title="Your Rights">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1.5 }}>
              You may:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Delete your account
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Request deletion of your stored information
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Disconnect your Google account
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Revoke Google access at any time through your Google Account
                  settings
                </Typography>
              </li>
            </Box>
          </Section>

          <Section title="Contact">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              If you have any questions regarding this Privacy Policy, please
              contact:{' '}
              <Link href="mailto:magdumtej1008@gmail.com" underline="hover">
                magdumtej1008@gmail.com
              </Link>
            </Typography>
          </Section>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Also read our{' '}
            <Link component={RouterLink} to="/terms" underline="hover">
              Terms of Service
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default PrivacyPage;
