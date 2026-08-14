import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import toast from 'react-hot-toast';
import LoadingButton from '../common/LoadingButton';
import { getApiErrorMessage, sendCampaign } from '../../api/campaigns';
import { isWallClockInFuture } from '../../utils/scheduleTime';

const TIMEZONES = [
  { value: 'Asia/Kolkata', label: 'India (Asia/Kolkata)' },
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'US Eastern (New York)' },
  { value: 'America/Chicago', label: 'US Central (Chicago)' },
  { value: 'America/Denver', label: 'US Mountain (Denver)' },
  { value: 'America/Los_Angeles', label: 'US Pacific (Los Angeles)' },
  { value: 'Europe/London', label: 'UK (London)' },
  { value: 'Europe/Paris', label: 'Central Europe (Paris)' },
  { value: 'Asia/Dubai', label: 'UAE (Dubai)' },
  { value: 'Asia/Singapore', label: 'Singapore' },
  { value: 'Asia/Tokyo', label: 'Japan (Tokyo)' },
  { value: 'Australia/Sydney', label: 'Australia (Sydney)' },
];

function OptionCard({ selected, icon, title, subtitle, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: '10px',
        border: selected ? '2px solid #1976D2' : '1px solid #E2E8F0',
        backgroundColor: selected ? '#E8F0FE' : '#ffffff',
        cursor: 'pointer',
        display: 'flex',
        gap: 1.5,
        alignItems: 'flex-start',
        '&:hover': {
          borderColor: '#1976D2',
          backgroundColor: selected ? '#E8F0FE' : '#F8FAFC',
        },
      }}
    >
      <Box sx={{ color: selected ? '#1976D2' : 'text.secondary', mt: 0.25 }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 500, color: 'text.primary', mb: 0.25 }}>
          {title}
        </Typography>
        <Typography variant="body2">{subtitle}</Typography>
      </Box>
    </Box>
  );
}

function SendCampaignDialog({ open, onClose, campaignId, onSuccess }) {
  const [mode, setMode] = useState('now');
  const [scheduledAt, setScheduledAt] = useState('');
  const [timeZone, setTimeZone] = useState('Asia/Kolkata');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setMode('now');
      setScheduledAt('');
      setTimeZone('Asia/Kolkata');
      setSubmitting(false);
    }
  }, [open]);

  const handleClose = () => {
    if (submitting) return;
    onClose();
  };

  const handleSubmit = async () => {
    if (mode === 'schedule') {
      if (!scheduledAt) {
        toast.error('Please select a date and time');
        return;
      }

      if (!timeZone) {
        toast.error('Please select a timezone');
        return;
      }

      // datetime-local is wall-clock time in the selected timezone, not browser local.
      if (!isWallClockInFuture(scheduledAt, timeZone)) {
        toast.error('Scheduled time must be in the future for the selected timezone');
        return;
      }
    }

    setSubmitting(true);

    try {
      const payload =
        mode === 'now'
          ? { publishNow: true }
          : {
              publishNow: false,
              scheduledAt,
              timeZone,
            };

      const result = await sendCampaign(campaignId, payload);
      toast.success(result?.message || 'Campaign queued successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to send campaign'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: '12px' } }}
    >
      <DialogTitle sx={{ pb: 1 }}>Send Campaign</DialogTitle>

      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Choose how you want to send this campaign.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <OptionCard
            selected={mode === 'now'}
            onClick={() => setMode('now')}
            icon={<SendOutlinedIcon />}
            title="Send Now"
            subtitle="Start sending emails immediately to all recipients."
          />

          <OptionCard
            selected={mode === 'schedule'}
            onClick={() => setMode('schedule')}
            icon={<ScheduleOutlinedIcon />}
            title="Schedule Campaign"
            subtitle="Pick a date, time, and timezone to send later."
          />
        </Box>

        {mode === 'schedule' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
            <TextField
              label="Date & Time"
              type="datetime-local"
              value={scheduledAt}
              onChange={(event) => setScheduledAt(event.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
              <InputLabel id="timezone-label">Timezone</InputLabel>
              <Select
                labelId="timezone-label"
                label="Timezone"
                value={timeZone}
                onChange={(event) => setTimeZone(event.target.value)}
              >
                {TIMEZONES.map((zone) => (
                  <MenuItem key={zone.value} value={zone.value}>
                    {zone.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="caption">
              Time is interpreted in the selected timezone (wall-clock time).
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={handleClose} color="inherit" disabled={submitting}>
          Cancel
        </Button>
        <LoadingButton
          variant="contained"
          loading={submitting}
          onClick={handleSubmit}
          sx={{ borderRadius: '8px' }}
        >
          {mode === 'now' ? 'Send Now' : 'Schedule'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default SendCampaignDialog;
