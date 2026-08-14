import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import StatusChip from '../../components/common/StatusChip';
import LoadingButton from '../../components/common/LoadingButton';
import HighlightedTemplate from '../../components/common/HighlightedTemplate';
import EditCampaignDialog from '../../components/campaigns/EditCampaignDialog';
import EmailPreviewDialog from '../../components/campaigns/EmailPreviewDialog';
import SendCampaignDialog from '../../components/campaigns/SendCampaignDialog';
import VariablesPreview from '../../components/campaigns/VariablesPreview';
import {
  getApiErrorMessage,
  getCampaignById,
  getCampaignEmails,
  sendCampaignEmail,
  uploadCampaignFile,
} from '../../api/campaigns';

function CampaignDetailsPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingEmailId, setSendingEmailId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [previewRecipient, setPreviewRecipient] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [campaignData, campaignEmails] = await Promise.all([
        getCampaignById(campaignId),
        getCampaignEmails(campaignId),
      ]);

      setCampaign(campaignData);
      setEmails(campaignEmails);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load campaign'));
      setCampaign(null);
      setEmails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [campaignId]);

  const isDraft = campaign?.campaignStatus === 'DRAFT';
  const isScheduled = campaign?.campaignStatus === 'SCHEDULED';
  const hasRecipients = emails.length > 0;
  const canUploadSheet = isDraft && !hasRecipients;

  const validateFile = (file) => {
    if (!file) return null;

    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const validExtension = /\.(csv|xlsx|xls)$/i.test(file.name);

    if (!validTypes.includes(file.type) && !validExtension) {
      toast.error('Please upload a CSV or XLSX file');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File must be 5MB or smaller');
      return null;
    }

    return file;
  };

  const handleFileChange = (event) => {
    const file = validateFile(event.target.files?.[0]);
    if (file) setSelectedFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = validateFile(event.dataTransfer.files?.[0]);
    if (file) setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    try {
      await uploadCampaignFile(campaignId, selectedFile);
      toast.success('Recipients uploaded successfully');
      setSelectedFile(null);
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to upload file'));
    } finally {
      setUploading(false);
    }
  };

  const handleSendOne = async (emailId) => {
    setSendingEmailId(emailId);
    try {
      const result = await sendCampaignEmail(campaignId, emailId);
      toast.success(result?.message || 'Email sent');
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to send email'));
    } finally {
      setSendingEmailId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ mb: 2, color: 'text.primary' }}>
          Campaign not found
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/campaigns')}>
          Back to Campaigns
        </Button>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Paper
      sx={{
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ px: 3, py: 2.5 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/campaigns')}
          sx={{ mb: 2, color: 'text.secondary' }}
        >
          Back
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 500,
                color: 'text.primary',
                mb: 0.75,
              }}
            >
              {campaign.campaignName}
            </Typography>
            <Typography variant="body2">
              Created {dayjs(campaign.createdAt).format('MMM D, YYYY')}
            </Typography>
            {campaign.campaignDescription && (
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                {campaign.campaignDescription}
              </Typography>
            )}
            {campaign.scheduledAt && (
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                Scheduled At:{' '}
                {new Date(campaign.scheduledAt).toLocaleString('en-US', {
                  timeZone: campaign.timeZone || 'UTC',
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
                {campaign.timeZone ? ` (${campaign.timeZone})` : ' (UTC)'}
              </Typography>
            )}
            {!campaign.scheduledAt && campaign.timeZone && (
              <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary' }}>
                Timezone: {campaign.timeZone}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <StatusChip status={campaign.campaignStatus} />
            {isDraft && (
              <Button
                variant="contained"
                startIcon={<EditOutlinedIcon />}
                onClick={() => setEditOpen(true)}
                sx={{ borderRadius: '8px' }}
              >
                Edit Campaign
              </Button>
            )}
            {isDraft && hasRecipients && (
              <Button
                variant="outlined"
                onClick={() => setSendOpen(true)}
                sx={{ borderRadius: '8px' }}
              >
                Send Campaign
              </Button>
            )}
            {isScheduled && (
              <Button
                variant="outlined"
                disabled
                sx={{ borderRadius: '8px' }}
              >
                Scheduled
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ px: 3, py: 2.5 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 0.75 }}>
          Subject
        </Typography>
        <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'text.primary' }}>
          <HighlightedTemplate text={campaign.emailSubject?.trim()} />
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ px: 3, pt: 2, pb: 1.5 }}>
        <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
          Email Body
        </Typography>
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
          <HighlightedTemplate text={campaign.emailBody?.trim()} />
        </Typography>
      </Box>
    </Paper>
      {/* <Divider /> */}
      <Paper
      sx={{
        borderRadius: '10px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 1.5,
          pb: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: 500, color: 'text.primary' }}>
          Recipients
        </Typography>
        <Typography variant="caption">{emails.length} total</Typography>
      </Box>

      {canUploadSheet ? (
        <Box sx={{ px: 3, pb: 3 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            This draft has no recipients yet. Upload a CSV or XLSX file to continue.
          </Typography>

          <Box
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            sx={{
              border: '1px dashed #CBD5E1',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              px: 3,
              py: 5,
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
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 2, color: '#1976D2' }}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <LoadingButton
              variant="contained"
              loading={uploading}
              disabled={!selectedFile}
              onClick={handleUpload}
              sx={{ borderRadius: '8px' }}
            >
              Upload Recipients
            </LoadingButton>
          </Box>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Recipient</TableCell>
                <TableCell>Variables Preview</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">
                      No recipients uploaded yet
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                emails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell sx={{ color: 'text.primary' }}>
                      {email.recipientEmail}
                    </TableCell>
                    <TableCell>
                      <VariablesPreview variables={email.variables} />
                    </TableCell>
                    <TableCell>
                      <StatusChip status={email.status} />
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 1,
                          flexWrap: 'wrap',
                        }}
                      >
                        <Button
                          size="small"
                          variant="text"
                          startIcon={<VisibilityOutlinedIcon />}
                          onClick={() => setPreviewRecipient(email)}
                          sx={{ borderRadius: '8px' }}
                        >
                          Preview
                        </Button>
                        <LoadingButton
                          size="small"
                          variant="outlined"
                          disabled={
                            email.status === 'PENDING' || email.status === 'SENT'
                          }
                          loading={sendingEmailId === email.id}
                          onClick={() => handleSendOne(email.id)}
                          sx={{ borderRadius: '8px' }}
                        >
                          Send
                        </LoadingButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

     
    </Paper>
      <EditCampaignDialog
        open={editOpen}
        campaign={campaign}
        onClose={() => setEditOpen(false)}
        onSuccess={loadData}
      />
      <SendCampaignDialog
        open={sendOpen}
        campaignId={campaignId}
        onClose={() => setSendOpen(false)}
        onSuccess={loadData}
      />
      <EmailPreviewDialog
        open={Boolean(previewRecipient)}
        campaign={campaign}
        recipient={previewRecipient}
        onClose={() => setPreviewRecipient(null)}
      />
    </Box>
  );
}

export default CampaignDetailsPage;
