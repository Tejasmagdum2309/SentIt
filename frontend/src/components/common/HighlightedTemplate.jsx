import { Box } from '@mui/material';

const placeholderSx = {
  color: '#1976D2',
  fontWeight: 600,
  backgroundColor: '#E8F0FE',
  px: 0.5,
  py: 0.15,
  borderRadius: '4px',
  fontFamily: 'inherit',
};

function HighlightedTemplate({ text, empty = '—' }) {
  if (!text) return empty;

  const parts = String(text).split(/(\{\{\w+\}\})/g);

  return parts.map((part, index) => {
    if (/^\{\{\w+\}\}$/.test(part)) {
      return (
        <Box component="span" key={`${part}-${index}`} sx={placeholderSx}>
          {part}
        </Box>
      );
    }

    return part;
  });
}

export default HighlightedTemplate;
