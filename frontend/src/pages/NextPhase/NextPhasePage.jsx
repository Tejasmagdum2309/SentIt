import { Box, Chip, Paper, Typography } from '@mui/material';

const backendFeatures = [
  {
    title: 'Stronger validations',
    description:
      'Stricter checks on campaign data, recipient sheets, and email content before create, update, upload, or send.',
  },
  {
    title: 'Filters',
    description:
      'Filter campaigns and recipient emails by status, date range, and other useful fields.',
  },
  {
    title: 'Pagination',
    description:
      'Paginated campaign and email lists so large accounts stay fast and easy to browse.',
  },
  {
    title: 'Schedule campaigns',
    description:
      'Schedule a campaign for a specific date and time with timezone support. Right now emails can only be sent immediately — no scheduling yet.',
  },
];

const frontendFeatures = [
  {
    title: 'UI polish',
    description:
      'Visual refinements across dashboard, campaigns, and details so the product feels cleaner and more consistent.',
  },
  {
    title: 'Logo & branding updates',
    description:
      'Updated logo usage, favicon, and brand moments across login and the app shell.',
  },
  {
    title: 'Flow improvements',
    description:
      'Smoother create → draft → upload → send flow, including clearer next steps after saving a draft.',
  },
  {
    title: 'Minor UI bug fixes',
    description:
      'Small layout, spacing, and interaction fixes based on real usage.',
  },
];

function FeatureCard({ title, description }) {
  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          mb: 1,
        }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'text.primary' }}>
          {title}
        </Typography>
        <Chip
          label="Planned"
          size="small"
          sx={{
            height: 22,
            fontSize: 11,
            fontWeight: 500,
            backgroundColor: '#E8F0FE',
            color: '#1976D2',
            borderRadius: '8px',
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
        {description}
      </Typography>
    </Paper>
  );
}

function FeatureSection({ title, subtitle, items }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        sx={{ fontSize: 18, fontWeight: 500, color: 'text.primary', mb: 0.5 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: 2,
        }}
      >
        {items.map((item) => (
          <FeatureCard
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>
    </Box>
  );
}

function NextPhasePage() {
  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        }}
      >
        <Typography
          sx={{ fontSize: 22, fontWeight: 500, color: 'text.primary', mb: 0.75 }}
        >
          Next Phase
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 680 }}>
          A short roadmap of upcoming SentIt improvements. These are planned
          features — not available in the current version yet.
        </Typography>
      </Paper>

      <FeatureSection
        title="Backend"
        subtitle="API and product capabilities coming next."
        items={backendFeatures}
      />

      <FeatureSection
        title="Frontend"
        subtitle="Interface and experience improvements."
        items={frontendFeatures}
      />

      <Paper
        sx={{
          p: 2.5,
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          backgroundColor: '#F8FAFC',
          boxShadow: 'none',
        }}
      >
        <Typography variant="body2">
          Current sending behavior: campaigns can only be sent immediately.
          Scheduled sending with timezone support will arrive in a later release.
        </Typography>
      </Paper>
    </Box>
  );
}

export default NextPhasePage;
