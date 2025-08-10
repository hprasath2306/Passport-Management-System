import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import Header from './components/Header/Header';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

export default function App() {
  const { user, isLoading, isAdmin } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/dashboard" element={isAdmin() ? <AdminDashboard /> : <UserDashboard />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}
