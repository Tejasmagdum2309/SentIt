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

function TermsPage() {
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
            Terms of Service
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Last Updated: July 18, 2026
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: 'text.primary' }}>
            Welcome to SentIt. By accessing or using SentIt, you agree to these
            Terms of Service. If you do not agree with these terms, please do not
            use the service.
          </Typography>

          <Section title="About SentIt">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              SentIt is an email outreach platform that helps users create
              campaigns, upload recipient lists, and send emails using their own
              connected Google account.
            </Typography>
          </Section>

          <Section title="Eligibility">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              You must be at least 18 years old or meet the minimum legal age in
              your country to use SentIt.
            </Typography>
          </Section>

          <Section title="User Responsibilities">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1.5 }}>
              You agree that you will:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.primary' }}>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Use SentIt only for lawful purposes.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Comply with all applicable laws and regulations.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Use only recipient lists that you have permission to contact.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Ensure that the information you upload is accurate.
                </Typography>
              </li>
            </Box>

            <Typography variant="body1" sx={{ color: 'text.primary', mt: 2, mb: 1.5 }}>
              You agree that you will not:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.primary' }}>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Send spam or unsolicited bulk emails.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Send phishing, fraudulent, or misleading emails.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Attempt to gain unauthorized access to SentIt&apos;s systems.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" sx={{ color: 'text.primary' }}>
                  Abuse, reverse engineer, or disrupt the service.
                </Typography>
              </li>
            </Box>

            <Typography variant="body1" sx={{ color: 'text.primary', mt: 2 }}>
              You are solely responsible for the content of the emails you send
              through SentIt.
            </Typography>
          </Section>

          <Section title="Google Account">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              SentIt uses Google OAuth to connect your Gmail account.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              Your Google password is never visible to or stored by SentIt.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              You may revoke access to your Google account at any time through
              your Google Account settings.
            </Typography>
          </Section>

          <Section title="Service Availability">
            <Typography variant="body1" sx={{ color: 'text.primary', mb: 1 }}>
              While we strive to provide reliable service, SentIt is provided on
              an &quot;as is&quot; and &quot;as available&quot; basis.
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              We do not guarantee uninterrupted operation or error-free
              performance.
            </Typography>
          </Section>

          <Section title="Limitation of Liability">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              To the maximum extent permitted by applicable law, SentIt and its
              owner shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of the
              service.
            </Typography>
          </Section>

          <Section title="Account Suspension">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              We reserve the right to suspend or terminate accounts that violate
              these Terms or abuse the platform.
            </Typography>
          </Section>

          <Section title="Changes">
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              We may update these Terms from time to time. Continued use of
              SentIt after changes become effective constitutes acceptance of the
              updated Terms.
            </Typography>
          </Section>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Also read our{' '}
            <Link component={RouterLink} to="/privacy" underline="hover">
              Privacy Policy
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default TermsPage;
