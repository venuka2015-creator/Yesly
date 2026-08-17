import { Navigate, useLocation } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
  const location = useLocation();
  return localStorage.getItem('dating_jwt') ? children : <Navigate to={`/?next=${encodeURIComponent(location.pathname)}`} replace />;
}
