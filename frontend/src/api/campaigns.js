import api from './axios';

export async function getCampaigns() {
  const response = await api.get('/campaigns');
  return response.data?.data || [];
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

export async function getCampaignEmails(campaignId) {
  const response = await api.get(`/campaigns/${campaignId}/emails`);
  return response.data?.data || [];
}

export async function sendCampaign(campaignId) {
  const response = await api.post(`/campaigns/${campaignId}/send`);
  return response.data;
}

export async function sendCampaignEmail(campaignId, emailId) {
  const response = await api.post(`/campaigns/${campaignId}/email/${emailId}/send`);
  return response.data;
}

export function getApiErrorMessage(error, fallback = 'Something went wrong') {
  return error?.response?.data?.message || error?.message || fallback;
}
