import { CloseIcon } from "../icons/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { UI_LABELS } from "../constants/uiLabels";

interface Form {
  username?: string;
}

const initialForm = {
  username: "",
};

export const UsernameModal = () => {
  const { setLogout, createAccountName, checkUsername } = useAuth();
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>();
  const username = watch("username");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initialForm);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { username } = data;
    createAccountName(username || "");
  };

  return (
    <div className="flex bg-sprint-overlay/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full md:inset-0 h-full ">
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div className="relative rounded-lg animate-fade-in bg-sprint-home text-sprint-foreground">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold text-sprint-muted">
              {labels.auth.accountName}
            </h3>
            <button
              type="button"
              className="text-slate-500 bg-transparent rounded-lg text-sm ms-auto inline-flex justify-center items-center"
              data-modal-hide="default-modal">
              <button
                className="hover:text-sprint-blue"
                onClick={() => setLogout()}>
                <CloseIcon />
              </button>
              <span className="sr-only">{labels.auth.closeModal}</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold">
                {labels.auth.enterUsernameBeforeContinue}
              </h3>
              {errors.username?.type === "required" && (
                <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                  {labels.auth.errors.usernameRequired}
                </h3>
              )}
              {errors.username?.type === "minLength" && (
                <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                  {labels.auth.errors.usernameMinLength}
                </h3>
              )}
              {errors.username?.type === "maxLength" && (
                <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                  {labels.auth.errors.usernameMaxLength}
                </h3>
              )}
              {errors.username?.type === "userNameNotAvailable" && (
                <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                  {labels.auth.errors.usernameNotAvailable(username || "")}
                </h3>
              )}
              <input
                type="text"
                placeholder={labels.auth.usernamePlaceholder}
                defaultValue=""
                value={username}
                {...register("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                  validate: {
                    userNameNotAvailable: async () =>
                      await checkUsername(username || ""),
                  },
                })}
                className="p-2 rounded-md w-full bg-sprint-config text-sprint-foreground placeholder:text-sprint-muted focus:ring-2 focus:ring-sprint-ring/50"
              />
              <button
                data-modal-hide="default-modal"
                type="submit"
                className="w-full p-2 rounded-md hover:bg-sprint-blue hover:text-white transition">
                {labels.auth.ok}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
