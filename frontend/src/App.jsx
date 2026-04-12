import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RaiseTicket from './pages/RaiseTicket.jsx';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public demo home page */}
          <Route path="/" element={<Dashboard />} />
          {/* Ticket Management */}
          <Route path="/raise-ticket" element={<RaiseTicket />} />
          {/* Login page (kept for later when OAuth2 is wired) */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

