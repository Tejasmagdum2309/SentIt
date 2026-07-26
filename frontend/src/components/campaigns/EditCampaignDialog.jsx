import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import toast from 'react-hot-toast';
import LoadingButton from '../common/LoadingButton';
import { getApiErrorMessage, updateCampaign } from '../../api/campaigns';

const steps = ['Campaign Information', 'Compose Email', 'Review'];

function EditCampaignDialog({ open, onClose, campaign, onSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    subject: '',
    body: '',
  });

  useEffect(() => {
    if (open && campaign) {
      setActiveStep(0);
      setSaving(false);
      setForm({
        name: campaign.campaignName || '',
        description: campaign.campaignDescription || '',
        subject: campaign.emailSubject || '',
        body: campaign.emailBody || '',
      });
    }
  }, [open, campaign]);

  const updateField = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleClose = () => {
    setActiveStep(0);
    setSaving(false);
    onClose();
  };

  const saveCampaign = async () => {
    await updateCampaign(campaign.id, {
      campaignName: form.name.trim(),
      campaignDescription: form.description.trim(),
      emailSubject: form.subject,
      emailBody: form.body,
    });
  };

  const handleNext = async () => {
    if (activeStep === 0 && !form.name.trim()) {
      toast.error('Campaign name is required');
      return;
    }

    if (activeStep === 1 && !form.subject.trim()) {
      toast.error('Subject is required');
      return;
    }

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
      return;
    }

    setSaving(true);
    try {
      await saveCampaign();
      toast.success('Campaign updated');
      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update campaign'));
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error('Campaign name is required');
      return;
    }

    setSaving(true);
    try {
      await saveCampaign();
      toast.success('Campaign updated');
      onSuccess?.();
      handleClose();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update campaign'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '12px',
          minHeight: 480,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>Edit Campaign</DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ my: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField
              label="Campaign Name"
              value={form.name}
              onChange={updateField('name')}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={form.description}
              onChange={updateField('description')}
              fullWidth
              multiline
              minRows={3}
            />
          </Box>
        )}

        {activeStep === 1 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField
              label="Subject"
              value={form.subject}
              onChange={updateField('subject')}
              fullWidth
              required
            />
            <TextField
              label="Body"
              value={form.body}
              onChange={updateField('body')}
              fullWidth
              multiline
              minRows={10}
              placeholder="Write your email content here. You can use {{variable}} placeholders."
            />
          </Box>
        )}

        {activeStep === 2 && (
          <Box
            sx={{
              mt: 1,
              p: 3,
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <Typography sx={{ fontWeight: 500, color: 'text.primary', mb: 1 }}>
              Summary
            </Typography>
            <Typography variant="body2">
              <strong>Name:</strong> {form.name || '—'}
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {form.description || '—'}
            </Typography>
            <Typography variant="body2">
              <strong>Subject:</strong> {form.subject || '—'}
            </Typography>
            <Typography variant="body2">
              <strong>Body:</strong>{' '}
              {form.body
                ? `${form.body.slice(0, 120)}${form.body.length > 120 ? '…' : ''}`
                : '—'}
            </Typography>
            <Typography variant="caption" sx={{ mt: 1 }}>
              Recipients sheet cannot be changed after upload.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={handleClose} color="inherit" disabled={saving}>
          Cancel
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          disabled={activeStep === 0 || saving}
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          Previous
        </Button>
        <LoadingButton
          variant="outlined"
          loading={saving}
          onClick={handleSave}
          sx={{ borderRadius: '8px' }}
        >
          Save Changes
        </LoadingButton>
        <LoadingButton
          variant="contained"
          loading={saving}
          onClick={handleNext}
          sx={{ borderRadius: '8px' }}
        >
          {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default EditCampaignDialog;
