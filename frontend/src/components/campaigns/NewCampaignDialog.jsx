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
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import toast from 'react-hot-toast';
import LoadingButton from '../common/LoadingButton';
import {
  createCampaign,
  getApiErrorMessage,
  updateCampaign,
  uploadCampaignFile,
} from '../../api/campaigns';

const steps = [
  'Campaign Information',
  'Compose Email',
  'Upload Recipients',
  'Review',
];

const initialForm = {
  name: '',
  description: '',
  subject: '',
  body: '',
  file: null,
};

function NewCampaignDialog({ open, onClose, onSuccess }) {
  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [campaignId, setCampaignId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setActiveStep(0);
      setForm(initialForm);
      setCampaignId(null);
      setSaving(false);
    }
  }, [open]);

  const updateField = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const resetForm = () => {
    setActiveStep(0);
    setForm(initialForm);
    setCampaignId(null);
    setSaving(false);
  };

  const resetAndClose = () => {
    resetForm();
    onClose();
  };

  const ensureCampaignCreated = async () => {
    if (campaignId) {
      await updateCampaign(campaignId, {
        campaignName: form.name.trim(),
        campaignDescription: form.description.trim(),
      });
      return campaignId;
    }

    const campaign = await createCampaign({
      campaignName: form.name.trim(),
      campaignDescription: form.description.trim(),
    });

    setCampaignId(campaign.id);
    return campaign.id;
  };

  const saveEmailContent = async (id) => {
    await updateCampaign(id, {
      emailSubject: form.subject,
      emailBody: form.body,
    });
  };

  const uploadFileIfNeeded = async (id) => {
    if (!form.file) return;
    await uploadCampaignFile(id, form.file);
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

    setSaving(true);

    try {
      if (activeStep === 0) {
        await ensureCampaignCreated();
        setActiveStep(1);
        return;
      }

      if (activeStep === 1) {
        const id = await ensureCampaignCreated();
        await saveEmailContent(id);
        setActiveStep(2);
        return;
      }

      if (activeStep === 2) {
        const id = await ensureCampaignCreated();
        await uploadFileIfNeeded(id);
        setActiveStep(3);
        return;
      }

      // Review → finish
      const id = await ensureCampaignCreated();
      await saveEmailContent(id);
      await uploadFileIfNeeded(id);

      toast.success('Campaign saved');
      resetForm();
      onSuccess?.(id);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSaveDraft = async () => {
    if (!form.name.trim()) {
      toast.error('Campaign name is required');
      return;
    }

    setSaving(true);

    try {
      const id = await ensureCampaignCreated();

      if (form.subject || form.body) {
        await saveEmailContent(id);
      }

      if (form.file) {
        await uploadFileIfNeeded(id);
      }

      toast.success('Draft saved');
      resetForm();
      onSuccess?.(id);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const validExtension = /\.(csv|xlsx|xls)$/i.test(file.name);

    if (!validTypes.includes(file.type) && !validExtension) {
      toast.error('Please upload a CSV or XLSX file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be 5MB or smaller');
      return;
    }

    setForm((prev) => ({ ...prev, file }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    handleFileChange({ target: { files: [file] } });
  };

  return (
    <Dialog
      open={open}
      onClose={resetAndClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: '12px',
          minHeight: 520,
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>New Campaign</DialogTitle>

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
          <Box sx={{ mt: 1 }}>
            <Box
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              sx={{
                border: '1px dashed #CBD5E1',
                borderRadius: '10px',
                backgroundColor: '#F8FAFC',
                px: 3,
                py: 6,
                textAlign: 'center',
              }}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography sx={{ color: 'text.primary', fontWeight: 500, mb: 0.5 }}>
                Drag & drop your recipients file
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                CSV or XLSX accepted (max 5MB). Must include an email column.
              </Typography>
              <Button variant="outlined" component="label" sx={{ borderRadius: '8px' }}>
                Browse
                <input
                  hidden
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                />
              </Button>
              {form.file && (
                <Typography variant="body2" sx={{ mt: 2, color: '#1976D2' }}>
                  Selected: {form.file.name}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {activeStep === 3 && (
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
            <Typography variant="body2">
              <strong>Recipients file:</strong> {form.file?.name || 'None uploaded'}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={resetAndClose} color="inherit" disabled={saving}>
          Cancel
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button disabled={activeStep === 0 || saving} onClick={handleBack}>
          Previous
        </Button>
        <LoadingButton
          variant="outlined"
          loading={saving}
          onClick={handleSaveDraft}
          sx={{ borderRadius: '8px' }}
        >
          Save Draft
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

export default NewCampaignDialog;
