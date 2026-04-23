import { useRouteError, useNavigate } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export const NotFoundPage = () => {
  const error = useRouteError() as RouteError | undefined;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sprint-home">
      <h1 className="text-6xl font-bold text-sprint-blue">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-sprint-muted mt-2">
        {error?.statusText || error?.message || "The page you're looking for doesn't exist."}
      </p>
      <button 
        onClick={() => navigate(-1)}
        className="mt-6 bg-sprint-blue text-white px-6 py-3 rounded-md hover:opacity-80 transition"
      >
        Go Back
      </button>
    </div>
  );
};
