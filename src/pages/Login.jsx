import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import peacock_feather from "@/assets/peacock_feather.png";
import ScrollReveal from "@/components/ScrollReveal";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const API_BASE = import.meta.env.VITE_API_BASE_URL; 
  // Example: https://sankhnadam-server.onrender.com/api/v1

  // Check for auth token in URL hash (after OAuth redirect)
  useEffect(() => {
    const hash = window.location.hash; // e.g., "#/login?token=xxx"
    const queryString = hash.split("?")[1];

    if (!queryString) return;

    const urlParams = new URLSearchParams(queryString);
    const token = urlParams.get("token");

    if (token) {
      login(token);

      // Clean URL so token is not visible
      window.history.replaceState({}, document.title, "/#/");

      // Redirect to home or previous page
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [login, navigate, location.state]);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, location.state]);

const handleGoogleLogin = () => {
  if (!API_BASE) return;
  window.location.href = `${API_BASE}/auth/google`;
};

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center pt-16 pb-16">
        <ScrollReveal>
          <div className="w-full max-w-sm mx-auto px-4 mt-6">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={peacock_feather}
                  alt="Peacock Feather"
                  className="h-12 w-auto"
                />
              </div>
              <div className="flex flex-col items-center mb-4">
                <h1 className="font-display text-xl font-semibold text-orange-600 mb-1 text-center">
                  Radhey Radhey!
                </h1>
                <span className="w-10 h-0.5 bg-orange-600 rounded-full"></span>
              </div>
              <p className="text-gray-600 text-sm mb-8">
                Sign in to manage your bookings and tour history
              </p>

              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-orange-600 text-white font-semibold text-sm hover:bg-orange-700 active:scale-[0.97] transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.04 24.04 0 0 0 0 21.56l7.98-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="text-xs text-gray-500 mt-6">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <Footer />
    </div>
  );
};

export default Login;