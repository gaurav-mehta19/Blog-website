import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/profile";
import { FullScreenLoading } from "./Loading";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, statusCode } = useProfile();

  if (loading) {
    return <FullScreenLoading text="Authenticating..." />;
  }

  // 🚀 Redirect only if statusCode is 405
  if (statusCode === 405) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
