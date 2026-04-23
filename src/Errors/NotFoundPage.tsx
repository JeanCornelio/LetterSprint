import { useRouteError, useNavigate } from "react-router-dom";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { UI_LABELS } from "../constants/uiLabels";

interface RouteError {
  statusText?: string;
  message?: string;
}

export const NotFoundPage = () => {
  const error = useRouteError() as RouteError | undefined;
  const navigate = useNavigate();
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sprint-home">
      <h1 className="text-6xl font-bold text-sprint-blue">404</h1>
      <h2 className="text-2xl font-semibold mt-4">{labels.utility.pageNotFound}</h2>
      <p className="text-sprint-muted mt-2">
        {error?.statusText || error?.message || labels.utility.pageNotFoundFallback}
      </p>
      <button 
        onClick={() => navigate(-1)}
        className="mt-6 bg-sprint-blue text-white px-6 py-3 rounded-md hover:opacity-80 transition"
      >
        {labels.utility.goBack}
      </button>
    </div>
  );
};
