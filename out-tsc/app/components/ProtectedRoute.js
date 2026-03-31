import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    // Show loading while checking authentication
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" }) }));
    }
    if (!isAuthenticated) {
        // Double-check localStorage in case state hasn't updated yet
        const token = localStorage.getItem('authToken');
        if (token && token.length > 10) {
            return _jsx(_Fragment, { children: children });
        }
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default ProtectedRoute;
