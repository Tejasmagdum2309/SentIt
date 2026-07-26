import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import useAuth from '../hooks/useAuth';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../pages/Login/LoginPage';
import AuthCallbackPage from '../pages/Auth/AuthCallbackPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import CampaignsPage from '../pages/Campaigns/CampaignsPage';
import CampaignDetailsPage from '../pages/Campaigns/CampaignDetailsPage';
import SettingsPage from '../pages/Settings/SettingsPage';
import NextPhasePage from '../pages/NextPhase/NextPhasePage';
import TermsPage from '../pages/Legal/TermsPage';
import PrivacyPage from '../pages/Legal/PrivacyPage';

function LegacyCampaignRedirect() {
  const { campaignId } = useParams();
  return <Navigate to={`/campaign/${campaignId}`} replace />;
}

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/campaigns" element={<CampaignsPage />} />
        <Route path="/campaigns/new" element={<CampaignsPage />} />
        <Route path="/campaign/:campaignId" element={<CampaignDetailsPage />} />
        <Route path="/campaigns/:campaignId" element={<LegacyCampaignRedirect />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/nextPhase" element={<NextPhasePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default AppRoutes;
