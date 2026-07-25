import { Card, CardContent, Typography } from '@mui/material';

function StatCard({ label, value }) {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        height: '100%',
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 500,
            color: 'text.primary',
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
