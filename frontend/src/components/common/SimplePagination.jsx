import { Box, Pagination, Typography } from '@mui/material';

function SimplePagination({ page, totalPages, total, limit, onChange }) {
  if (!totalPages || totalPages <= 1) {
    return null;
  }

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        px: 3,
        py: 2,
        borderTop: '1px solid #E2E8F0',
      }}
    >
      <Typography variant="caption">
        Showing {start}-{end} of {total}
      </Typography>
      <Pagination
        page={page}
        count={totalPages}
        onChange={(_, value) => onChange(value)}
        color="primary"
        shape="rounded"
        size="small"
      />
    </Box>
  );
}

export default SimplePagination;
