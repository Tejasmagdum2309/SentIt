import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import StatusChip from '../../components/common/StatusChip';
import SimplePagination from '../../components/common/SimplePagination';
import NewCampaignDialog from '../../components/campaigns/NewCampaignDialog';
import { getApiErrorMessage, getCampaigns } from '../../api/campaigns';

const PAGE_SIZE = 10;

function CampaignsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get('status');
  const pageFromUrl = Number(searchParams.get('page')) || 1;

  const [campaigns, setCampaigns] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);

  const isNewCampaignOpen = location.pathname === '/campaigns/new';
  const page = pageFromUrl < 1 ? 1 : pageFromUrl;

  const apiStatus =
    statusFilter === 'draft'
      ? 'DRAFT'
      : statusFilter === 'sent'
        ? 'SENT'
        : undefined;

  const loadCampaigns = async (nextPage = page) => {
    try {
      setLoading(true);
      const result = await getCampaigns({
        page: nextPage,
        limit: PAGE_SIZE,
        status: apiStatus,
      });
      setCampaigns(result.data);
      setPagination(result.pagination);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load campaigns'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns(page);
  }, [page, statusFilter]);

  const handlePageChange = (nextPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params);
  };

  const emptyLabel =
    statusFilter === 'draft'
      ? 'No draft campaigns'
      : statusFilter === 'sent'
        ? 'No sent campaigns'
        : 'No campaigns yet';

  return (
    <Box>
      <Paper
        sx={{
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        <Box
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 500, color: 'text.primary' }}>
              {statusFilter === 'draft'
                ? 'Drafts'
                : statusFilter === 'sent'
                  ? 'Sent'
                  : 'All Campaigns'}
            </Typography>
            <Typography variant="caption">
              {pagination.total} campaigns
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/campaigns/new')}
            sx={{ borderRadius: '8px', flexShrink: 0 }}
          >
            New Campaign
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={32} />
          </Box>
        ) : campaigns.length === 0 ? (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography color="text.secondary">{emptyLabel}</Typography>
          </Box>
        ) : (
          campaigns.map((campaign, index) => (
            <Box
              key={campaign.id}
              onClick={() => navigate(`/campaign/${campaign.id}`)}
              sx={{
                display: 'grid',
                gridTemplateColumns: '28% 1fr 120px 140px',
                alignItems: 'center',
                gap: 2,
                px: 3,
                py: 1.75,
                cursor: 'pointer',
                borderBottom:
                  index === campaigns.length - 1 ? 'none' : '1px solid #F1F5F9',
                '&:hover': {
                  backgroundColor: '#F8FAFC',
                },
              }}
            >
              <Typography
                noWrap
                sx={{ fontSize: 14, fontWeight: 500, color: 'text.primary' }}
              >
                {campaign.campaignName}
              </Typography>

              <Typography noWrap variant="body2">
                {campaign.emailSubject || campaign.campaignDescription || 'No subject yet'}
              </Typography>

              <Box>
                <StatusChip status={campaign.campaignStatus} />
              </Box>

              <Typography variant="body2" sx={{ textAlign: 'right' }}>
                {dayjs(campaign.createdAt).format('MMM D, YYYY')}
              </Typography>
            </Box>
          ))
        )}

        <SimplePagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onChange={handlePageChange}
        />
      </Paper>

      <NewCampaignDialog
        open={isNewCampaignOpen}
        onClose={() => navigate('/campaigns')}
        onSuccess={(campaignId) => {
          loadCampaigns(1);
          if (campaignId) {
            navigate(`/campaign/${campaignId}`);
          } else {
            navigate('/campaigns');
          }
        }}
      />
    </Box>
  );
}

export default CampaignsPage;
