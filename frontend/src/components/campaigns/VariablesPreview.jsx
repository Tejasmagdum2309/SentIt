import { Box, Chip, Typography } from '@mui/material';
import { parseVariables } from '../../utils/formatVariables';

function VariablesPreview({ variables }) {
  const entries = Object.entries(parseVariables(variables));

  if (entries.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        —
      </Typography>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
      {entries.map(([key, value]) => (
        <Chip
          key={key}
          size="small"
          label={
            <Box component="span" sx={{ display: 'inline-flex', gap: 0.5 }}>
              <Box component="span" sx={{ color: '#1976D2', fontWeight: 600 }}>
                {`{{${key}}}`}
              </Box>
              <Box component="span" sx={{ color: 'text.secondary' }}>
                →
              </Box>
              <Box component="span" sx={{ color: 'text.primary' }}>
                {String(value)}
              </Box>
            </Box>
          }
          sx={{
            height: 'auto',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            '& .MuiChip-label': {
              px: 1,
              py: 0.5,
              whiteSpace: 'normal',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default VariablesPreview;
