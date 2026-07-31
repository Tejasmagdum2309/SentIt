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
import SimplePagination from '../../components/common/SimplePagination';
import {
  getApiErrorMessage,
  getCampaigns,
  getDashboardStats,
} from '../../api/campaigns';

const PAGE_SIZE = 5;

const emptyStats = {
  totalCampaigns: 0,
  draftCampaigns: 0,
  sentCampaigns: 0,
  totalEmailsSent: 0,
};

function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(emptyStats);
  const [campaigns, setCampaigns] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const nextStats = await getDashboardStats();
        if (!cancelled) setStats(nextStats);
      } catch (error) {
        if (!cancelled) {
          toast.error(getApiErrorMessage(error, 'Failed to load dashboard stats'));
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadRecentCampaigns() {
      try {
        setLoading(true);
        const recent = await getCampaigns({ page, limit: PAGE_SIZE });
        if (cancelled) return;
        setCampaigns(recent.data);
        setPagination(recent.pagination);
      } catch (error) {
        if (!cancelled) {
          toast.error(getApiErrorMessage(error, 'Failed to load campaigns'));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadRecentCampaigns();

    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
          gap: 2.5,
          mb: 3,
        }}
      >
        <StatCard label="Total Campaigns" value={stats.totalCampaigns} />
        <StatCard label="Draft Campaigns" value={stats.draftCampaigns} />
        <StatCard label="Sent Campaigns" value={stats.sentCampaigns} />
        <StatCard label="Emails Sent" value={stats.totalEmailsSent} />
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={32} />
          </Box>
        ) : (
          <>
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
                  {campaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography color="text.secondary">No campaigns yet</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    campaigns.map((campaign) => (
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

            <SimplePagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              onChange={setPage}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}

export default DashboardPage;
