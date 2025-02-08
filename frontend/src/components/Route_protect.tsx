import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProfile } from "../hooks/profile";
import { Loader } from "lucide-react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, loading } = useProfile();

  useEffect(() => {
    // Only redirect if:
    // 1. Not loading (we know the auth state)
    // 2. No profile (user is not authenticated)
    // 3. Not already on home page
    if (!loading && !profile && location.pathname !== "/") {
      navigate("/");
    }
  }, [loading, profile, location.pathname, navigate]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Only render children if:
  // 1. User is authenticated OR
  // 2. On home page
  if (!profile && location.pathname !== "/") {
    return null;
  }

  return <>{children}</>;
};

export default AppLayout;