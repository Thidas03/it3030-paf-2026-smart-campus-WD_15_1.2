import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const AuthCallback = () => {
    const { handleAuthSuccess } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const normalizeSingleRole = (role) => {
        if (typeof role === 'string') return role;
        if (role && typeof role === 'object') {
            return role.authority || role.role || role.name || '';
        }
        return '';
    };

    const normalizeRoles = (roles) => {
        const roleList = Array.isArray(roles) ? roles : [roles];
        return roleList
            .map((role) => normalizeSingleRole(role))
            .map((role) => String(role || '').trim().replace('ROLE_', '').toUpperCase())
            .filter(Boolean);
    };

    const getRedirectPathByRole = (userData) => {
        const roles = normalizeRoles(userData?.roles);
        if (roles.includes('ADMIN')) return '/admin';
        if (roles.includes('TECHNICIAN')) return '/technician/tickets';
        return '/student/resources';
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const email = params.get('email');
        const name = params.get('name');
        const picture = params.get('picture');
        const roles = params.get('roles')?.split(',') || [];

        if (token) {
            const authUser = { email, name, picture, roles };
            handleAuthSuccess(authUser, token);
            navigate(getRedirectPathByRole(authUser));
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
