import { useState } from "react";

export const useLoading = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLoading = (state: boolean) => {
    setLoading(state);
  };

  return {
    loading,
    handleLoading,
  };
};
