import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/packages", label: "Packages" },
  { to: "/contact", label: "Contact" },
  { to: "/bookings/my-bookings", label: "My Bookings" },
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pink-100/70 backdrop-blur-md border-b border-border px-3">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex justify-center mb-4">
                <img
                  src="/imagelogo.png"
                  alt="Peacock Feather"
                  className="h-12 pt-2 w-auto"
                />
              </div>
          <span className="font-display text-lg md:text-xl font-bold text-foreground tracking-tight">
            Shankhnadam
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Admin
            </Link>
          )}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/login" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground active:scale-95 transition-transform"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  pathname === "/admin" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-base font-medium py-2 text-left text-muted-foreground hover:text-primary transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  pathname === "/login" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
