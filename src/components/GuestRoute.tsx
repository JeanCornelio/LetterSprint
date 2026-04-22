import { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface GuestRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export const GuestRoute = ({ children, redirectPath = "/" }: GuestRouteProps) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === "authenticated") {
      navigate(redirectPath);
    }
  }, [state, navigate, redirectPath]);

  if (state === "authenticated") {
    return null;
  }

  return <>{children}</>;
};
