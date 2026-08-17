import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateRequestPage from './pages/CreateRequestPage';
import RequestCreatedPage from './pages/RequestCreatedPage';
import RecipientPage from './pages/RecipientPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/create" element={<ProtectedRoute><CreateRequestPage /></ProtectedRoute>} />
    <Route path="/created/:token" element={<ProtectedRoute><RequestCreatedPage /></ProtectedRoute>} />
    <Route path="/request/:token" element={<RecipientPage />} />
    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
