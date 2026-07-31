import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';
import StatCard from '../../components/common/StatCard';
import { getApiErrorMessage, getDashboardStats } from '../../api/campaigns';

const emptyStats = {
  totalCampaigns: 0,
  draftCampaigns: 0,
  sentCampaigns: 0,
  totalEmailsSent: 0,
};

function DashboardPage() {
  const [stats, setStats] = useState(emptyStats);
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
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '1fr 1fr',
          lg: 'repeat(4, 1fr)',
        },
        gap: 2.5,
      }}
    >
      <StatCard label="Total Campaigns" value={stats.totalCampaigns} />
      <StatCard label="Draft Campaigns" value={stats.draftCampaigns} />
      <StatCard label="Sent Campaigns" value={stats.sentCampaigns} />
      <StatCard label="Emails Sent" value={stats.totalEmailsSent} />
    </Box>
  );
}

export default DashboardPage;
