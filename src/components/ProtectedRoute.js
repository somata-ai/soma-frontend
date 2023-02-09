import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
};

export default ProtectedRoute;
