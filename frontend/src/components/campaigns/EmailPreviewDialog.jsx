import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import { replacePlaceholders } from '../../utils/formatVariables';
import VariablesPreview from './VariablesPreview';

function EmailPreviewDialog({ open, onClose, campaign, recipient }) {
  if (!campaign || !recipient) return null;

  const previewSubject = replacePlaceholders(
    campaign.emailSubject || '',
    recipient.variables
  );
  const previewBody = replacePlaceholders(
    campaign.emailBody || '',
    recipient.variables
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { borderRadius: '12px' },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>Email Preview</DialogTitle>

      <DialogContent>
        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          To
        </Typography>
        <Typography sx={{ mb: 2, color: 'text.primary', fontWeight: 500 }}>
          {recipient.recipientEmail}
        </Typography>

        <Typography variant="caption" sx={{ display: 'block', mb: 0.75 }}>
          Variables used
        </Typography>
        <Box sx={{ mb: 2 }}>
          <VariablesPreview variables={recipient.variables} />
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          Subject
        </Typography>
        <Typography sx={{ mb: 2, fontWeight: 500, color: 'text.primary' }}>
          {previewSubject || '—'}
        </Typography>

        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
          Body
        </Typography>
        <Box
          sx={{
            p: 2,
            borderRadius: '10px',
            border: '1px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
          }}
        >
          <Typography
            component="pre"
            sx={{
              m: 0,
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              fontSize: 14,
              lineHeight: 1.7,
              color: 'text.primary',
            }}
          >
            {previewBody.trim() || '—'}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained" sx={{ borderRadius: '8px' }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmailPreviewDialog;
