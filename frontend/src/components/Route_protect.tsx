import { Navigate } from "react-router-dom";
import { useProfile } from "../hooks/profile";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { loading, statusCode } = useProfile();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  // 🚀 Redirect only if statusCode is 405
  if (statusCode === 405) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
