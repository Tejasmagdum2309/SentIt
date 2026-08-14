import { Chip } from '@mui/material';

const statusStyles = {
  DRAFT: {
    backgroundColor: '#F1F5F9',
    color: '#475569',
  },
  SENT: {
    backgroundColor: '#E8F0FE',
    color: '#1976D2',
  },
  SCHEDULED: {
    backgroundColor: '#F3E8FF',
    color: '#7C3AED',
  },
  PENDING: {
    backgroundColor: '#FEF7E0',
    color: '#C78300',
  },
  FAILED: {
    backgroundColor: '#FCE8E6',
    color: '#D93025',
  },
};

function StatusChip({ status }) {
  const normalized = String(status || 'DRAFT').toUpperCase();
  const style = statusStyles[normalized] || statusStyles.DRAFT;

  return (
    <Chip
      label={normalized.toLowerCase()}
      size="small"
      sx={{
        ...style,
        textTransform: 'capitalize',
        fontWeight: 500,
        borderRadius: '8px',
        height: 24,
      }}
    />
  );
}

export default StatusChip;
