import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    useEffect(() => {
        // Get token from URL parameters
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        if (token && token.length > 10) {
            // Store the actual token from backend
            localStorage.setItem("authToken", token);
            login(token);
            // Redirect to home page after a short delay
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 1000);
        }
        else {
            navigate("/login", { replace: true });
        }
    }, [navigate, location.search, login]); // More specific dependency
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4" }), _jsx("p", { className: "text-lg font-medium text-gray-700", children: "Signing you in..." }), _jsx("p", { className: "text-sm text-gray-500 mt-2", children: "Redirecting to dashboard..." })] }) }));
};
export default Success;
