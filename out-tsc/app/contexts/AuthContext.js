import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
const AuthContext = createContext(undefined);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Helper function to decode JWT token
    const decodeToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                name: payload.name || payload.email || 'User',
                role: payload.role || 'user'
            };
        }
        catch (error) {
            console.error('Failed to decode token:', error);
            return { name: 'User', role: 'user' };
        }
    };
    useEffect(() => {
        // Check if user is logged in on app start
        const token = localStorage.getItem('authToken');
        if (token && token.length > 10) {
            const userData = decodeToken(token);
            setIsAuthenticated(true);
            setUser(userData);
        }
        setIsLoading(false);
    }, []);
    const login = useCallback((token) => {
        localStorage.setItem('authToken', token);
        const userData = decodeToken(token);
        setIsAuthenticated(true);
        setUser(userData);
    }, []);
    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setUser(null);
    }, []);
    const isAdmin = user?.role === 'admin';
    const value = {
        isAuthenticated,
        login,
        logout,
        user,
        isLoading,
        isAdmin,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
};
