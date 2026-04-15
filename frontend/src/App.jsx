import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AuthCallback from './pages/AuthCallback.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import TechnicianTickets from './pages/TechnicianTickets.jsx';
import TechnicianStatus from './pages/TechnicianStatus.jsx';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Protected dashboard home page */}
                    <Route 
                        path="/" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Protected admin panel */}
                    <Route 
                        path="/admin" 
                        element={
                            <ProtectedRoute>
                                <AdminPanel />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Protected technician tickets */}
                    <Route 
                        path="/technician/tickets" 
                        element={
                            <ProtectedRoute>
                                <TechnicianTickets />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Protected technician status */}
                    <Route 
                        path="/technician/status" 
                        element={
                            <ProtectedRoute>
                                <TechnicianStatus />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Login page */}
                    <Route path="/login" element={<LoginPage />} />
                    
                    {/* OAuth2 Callback page */}
                    <Route path="/auth/callback" element={<AuthCallback />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;

