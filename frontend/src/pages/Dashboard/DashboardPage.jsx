import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import StatCard from '../../components/common/StatCard';
import StatusChip from '../../components/common/StatusChip';
import { getApiErrorMessage, getCampaigns } from '../../api/campaigns';

function DashboardPage() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const list = await getCampaigns();
        if (cancelled) return;
        setCampaigns(list);
      } catch (error) {
        if (!cancelled) {
          toast.error(getApiErrorMessage(error, 'Failed to load dashboard'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  const drafts = campaigns.filter((c) => c.campaignStatus === 'DRAFT').length;
  const sent = campaigns.filter((c) => c.campaignStatus === 'SENT').length;
  const recentCampaigns = [...campaigns]
    .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf())
    .slice(0, 5);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(3, 1fr)',
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <StatCard label="Total Campaigns" value={campaigns.length} />
        <StatCard label="Draft Campaigns" value={drafts} />
        <StatCard label="Sent Campaigns" value={sent} />
      </Box>

      <Paper
        sx={{
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ px: 3, py: 2, borderBottom: '1px solid #E2E8F0' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'text.primary' }}>
            Recent Campaigns
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Campaign</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentCampaigns.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No campaigns yet</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                recentCampaigns.map((campaign) => (
                  <TableRow
                    key={campaign.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                  >
                    <TableCell sx={{ color: 'text.primary', fontWeight: 500 }}>
                      {campaign.campaignName}
                    </TableCell>
                    <TableCell>
                      <StatusChip status={campaign.campaignStatus} />
                    </TableCell>
                    <TableCell>{campaign.emailSubject || '—'}</TableCell>
                    <TableCell>
                      {dayjs(campaign.createdAt).format('MMM D, YYYY')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default DashboardPage;
