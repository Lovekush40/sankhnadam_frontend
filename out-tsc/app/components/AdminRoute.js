import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
const AdminRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }));
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    if (!isAdmin) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold text-destructive mb-4", children: "Access Denied" }), _jsx("p", { className: "text-muted-foreground", children: "You don't have permission to access this page." }), _jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Admin privileges required." })] }) }));
    }
    return _jsx(_Fragment, { children: children });
};
export default AdminRoute;
