import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeSingleRole = (role) => {
    if (typeof role === 'string') return role;
    if (role && typeof role === 'object') {
      return role.authority || role.role || role.name || '';
    }
    return '';
  };

  const normalizeRoles = (roles = []) => {
    const roleList = Array.isArray(roles) ? roles : [roles];
    return roleList
      .map((role) => normalizeSingleRole(role))
      .map((role) => String(role || '').trim().replace('ROLE_', '').toUpperCase())
      .filter(Boolean);
  };

  const normalizeUser = (userData) => {
    if (!userData) return null;
    return {
      ...userData,
      roles: normalizeRoles(userData.roles || []),
    };
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('accessToken');
    if (storedUser && token) {
      setUser(normalizeUser(JSON.parse(storedUser)));
    }
    setLoading(false);
  }, []);

  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:8081/oauth2/authorization/google';
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        handleAuthSuccess(data.user, data.token);
        return { success: true, user: normalizeUser(data.user) };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (err) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const signup = async (name, email, password, role = 'STUDENT') => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      if (response.ok) {
        const data = await response.json();
        handleAuthSuccess(data.user, data.token);
        return { success: true, user: normalizeUser(data.user) };
      } else {
        const error = await response.text();
        return { success: false, error };
      }
    } catch (err) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const handleAuthSuccess = (userData, token) => {
    const normalizedUser = normalizeUser(userData);
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('user', JSON.stringify(normalizedUser));
    setUser(normalizedUser);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('user');
    localStorage.removeItem('accessToken'); // Fallback cleanup
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const hasRole = (role) => {
    return user?.roles?.includes(String(role || '').replace('ROLE_', '').toUpperCase());
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, login, signup, handleAuthSuccess, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

