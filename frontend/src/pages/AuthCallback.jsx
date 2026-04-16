import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AuthCallback = () => {
    const { handleAuthSuccess } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const email = params.get('email');
        const name = params.get('name');
        const picture = params.get('picture');
        const roles = params.get('roles')?.split(',') || [];

        if (token) {
            handleAuthSuccess({ email, name, picture, roles }, token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [location, handleAuthSuccess, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
};

export default AuthCallback;
