import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  fallbackPath?: string;
}

export const ProtectedRoute = ({ children, fallbackPath = "/login" }: ProtectedRouteProps) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === "not authenticated") {
      navigate(fallbackPath);
    }
  }, [state, navigate, fallbackPath]);

  if (state === "not authenticated") {
    return null;
  }

  return <>{children}</>;
};
