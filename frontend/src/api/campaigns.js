import api from './axios';

function normalizeCampaignsResponse(response, page = 1, limit = 10) {
  const payload = response.data;
  const rawData = payload?.data;

  // Preferred shape: { data: Campaign[], pagination: {...} }
  if (Array.isArray(rawData) && payload?.pagination) {
    return {
      data: rawData,
      pagination: {
        page: Number(payload.pagination.page) || page,
        limit: Number(payload.pagination.limit) || limit,
        total: Number(payload.pagination.total) || rawData.length,
        totalPages: Number(payload.pagination.totalPages) || 1,
      },
    };
  }

  // Nested shape: { data: { campaigns, pagination } }
  if (rawData && Array.isArray(rawData.campaigns)) {
    const pagination = rawData.pagination || {};
    return {
      data: rawData.campaigns,
      pagination: {
        page: Number(pagination.page) || page,
        limit: Number(pagination.limit) || limit,
        total: Number(pagination.total) || rawData.campaigns.length,
        totalPages: Number(pagination.totalPages) || 1,
      },
    };
  }

  // Legacy shape: { data: Campaign[] }
  const list = Array.isArray(rawData) ? rawData : [];
  return {
    data: list,
    pagination: {
      page: 1,
      limit: list.length || limit,
      total: list.length,
      totalPages: 1,
    },
  };
}

export async function getCampaigns({
  page = 1,
  limit = 10,
  status,
} = {}) {
  const params = { page, limit };

  if (status) {
    params.status = status;
  }

  const response = await api.get('/campaigns', { params });
  return normalizeCampaignsResponse(response, page, limit);
}

export async function getDashboardStats() {
  const response = await api.get('/campaigns/stats');
  const data = response.data?.data || {};

  return {
    totalCampaigns: Number(data.totalCampaigns) || 0,
    draftCampaigns: Number(data.draftCampaigns) || 0,
    sentCampaigns: Number(data.sentCampaigns) || 0,
    totalEmailsSent: Number(data.totalEmailsSent) || 0,
  };
}

export async function createCampaign({ campaignName, campaignDescription }) {
  const response = await api.post('/campaigns', {
    campaignName,
    campaignDescription,
  });
  return response.data?.data;
}

export async function updateCampaign(campaignId, payload) {
  const response = await api.patch(`/campaigns/${campaignId}`, payload);
  return response.data?.data;
}

export async function uploadCampaignFile(campaignId, file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`/campaigns/${campaignId}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.data;
}

export async function getCampaignById(campaignId) {
  const response = await api.get(`/campaigns/${campaignId}`);
  return response.data?.data || null;
}

export async function getCampaignEmails(campaignId) {
  const response = await api.get(`/campaigns/${campaignId}/emails`);
  return response.data?.data || [];
}

export async function sendCampaign(campaignId, payload) {
  const response = await api.post(`/campaigns/${campaignId}/send`, payload);
  return response.data;
}

export async function sendCampaignEmail(campaignId, emailId) {
  const response = await api.post(`/campaigns/${campaignId}/email/${emailId}/send`);
  return response.data;
}

export function getApiErrorMessage(error, fallback = 'Something went wrong') {
  return error?.response?.data?.message || error?.message || fallback;
}
