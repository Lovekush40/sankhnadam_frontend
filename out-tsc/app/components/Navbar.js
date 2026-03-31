import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
const navLinks = [
    { to: "/", label: "Home" },
    { to: "/packages", label: "Packages" },
    { to: "/contact", label: "Contact" },
];
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const { isAuthenticated, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/");
        setOpen(false);
    };
    return (_jsxs("nav", { className: "fixed top-0 left-0 right-0 z-50 bg-pink-100/70 backdrop-blur-md border-b border-border px-3", children: [_jsxs("div", { className: "container flex items-center justify-between h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("img", { src: "/imagelogo.png", alt: "Peacock Feather", className: "h-12 pt-2 w-auto" }) }), _jsx("span", { className: "font-display text-lg md:text-xl font-bold text-foreground tracking-tight", children: "Sankhnadam" })] }), _jsxs("div", { className: "hidden md:flex items-center gap-8", children: [navLinks.map((link) => (_jsx(Link, { to: link.to, className: `text-sm font-medium transition-colors hover:text-primary ${pathname === link.to ? "text-primary" : "text-muted-foreground"}`, children: link.label }, link.to))), isAuthenticated && isAdmin && (_jsx(Link, { to: "/admin", className: `text-sm font-medium transition-colors hover:text-primary ${pathname === "/admin" ? "text-primary" : "text-muted-foreground"}`, children: "Admin" })), isAuthenticated ? (_jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: [_jsx(LogOut, { size: 16 }), "Logout"] })) : (_jsx(Link, { to: "/login", className: `text-sm font-medium transition-colors hover:text-primary ${pathname === "/login" ? "text-primary" : "text-muted-foreground"}`, children: "Login" }))] }), _jsx("button", { className: "md:hidden p-2 text-foreground active:scale-95 transition-transform", onClick: () => setOpen(!open), "aria-label": "Toggle menu", children: open ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] }), open && (_jsx("div", { className: "md:hidden bg-background border-b border-border animate-fade-in", children: _jsxs("div", { className: "container py-4 flex flex-col gap-4", children: [navLinks.map((link) => (_jsx(Link, { to: link.to, onClick: () => setOpen(false), className: `text-base font-medium py-2 transition-colors ${pathname === link.to ? "text-primary" : "text-muted-foreground"}`, children: link.label }, link.to))), isAuthenticated && isAdmin && (_jsx(Link, { to: "/admin", onClick: () => setOpen(false), className: `text-base font-medium py-2 transition-colors ${pathname === "/admin" ? "text-primary" : "text-muted-foreground"}`, children: "Admin" })), isAuthenticated ? (_jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 text-base font-medium py-2 text-left text-muted-foreground hover:text-primary transition-colors", children: [_jsx(LogOut, { size: 16 }), "Logout"] })) : (_jsx(Link, { to: "/login", onClick: () => setOpen(false), className: `text-base font-medium py-2 transition-colors ${pathname === "/login" ? "text-primary" : "text-muted-foreground"}`, children: "Login" }))] }) }))] }));
};
export default Navbar;
