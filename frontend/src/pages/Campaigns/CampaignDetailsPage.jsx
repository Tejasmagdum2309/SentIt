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
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import StatusChip from '../../components/common/StatusChip';
import LoadingButton from '../../components/common/LoadingButton';
import formatVariables from '../../utils/formatVariables';
import {
  getApiErrorMessage,
  getCampaignEmails,
  getCampaigns,
  sendCampaign,
  sendCampaignEmail,
} from '../../api/campaigns';

function CampaignDetailsPage() {
  const { campaignId } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingAll, setSendingAll] = useState(false);
  const [sendingEmailId, setSendingEmailId] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [campaigns, campaignEmails] = await Promise.all([
        getCampaigns(),
        getCampaignEmails(campaignId),
      ]);

      const found = campaigns.find((item) => item.id === campaignId) || null;
      setCampaign(found);
      setEmails(campaignEmails);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load campaign'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [campaignId]);

  const handleSendAll = async () => {
    setSendingAll(true);
    try {
      const result = await sendCampaign(campaignId);
      toast.success(result?.message || 'Campaign send started');
      await loadData();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to send campaign'));
    } finally {
      setSendingAll(false);
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
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <StatusChip status={campaign.campaignStatus} />
            {campaign.campaignStatus === 'DRAFT' && emails.length > 0 && (
              <LoadingButton
                variant="contained"
                loading={sendingAll}
                onClick={handleSendAll}
                sx={{ borderRadius: '8px' }}
              >
                Send Campaign
              </LoadingButton>
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
          {campaign.emailSubject || '—'}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ px: 3, py: 2.5 }}>
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
          {campaign.emailBody || '—'}
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          px: 3,
          pt: 2.5,
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
                  <TableCell>{formatVariables(email.variables)}</TableCell>
                  <TableCell>
                    <StatusChip status={email.status} />
                  </TableCell>
                  <TableCell align="right">
                    {email.status === 'PENDING' && (
                      <LoadingButton
                        size="small"
                        variant="outlined"
                        loading={sendingEmailId === email.id}
                        onClick={() => handleSendOne(email.id)}
                        sx={{ borderRadius: '8px' }}
                      >
                        Send
                      </LoadingButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default CampaignDetailsPage;
