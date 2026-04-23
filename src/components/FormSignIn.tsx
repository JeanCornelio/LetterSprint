import { SignInIcon } from "../icons/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTestConfiguration } from "../hooks/useTestConfiguration";
import { UI_LABELS } from "../constants/uiLabels";

interface Form {
  email: string;
  password: string;
}

interface FormSignInProps {
  handleFormState: (state: "signIn" | "signUp") => void;
  onSignIn: (data: { email: string; password: string }) => Promise<void>;
}

export const FormSignIn = ({ handleFormState, onSignIn }: FormSignInProps) => {
  const { language } = useTestConfiguration();
  const labels = UI_LABELS[language];

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Form>();

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { email, password } = data;
    await onSignIn({ email, password });
  };

  return (
    <article className="flex flex-col w-full ">
      <form
        className="flex flex-col gap-4 "
        noValidate
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          {errors.email?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {labels.auth.errors.emailRequired}
            </h3>
          )}
          {errors.email?.type === "pattern" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {labels.auth.errors.emailInvalid}
            </h3>
          )}
          <input
            className="p-3 rounded-md w-full bg-sprint-config text-sprint-foreground placeholder:text-sprint-muted focus:outline-none focus:ring-2 focus:ring-sprint-ring/50"
            type="email"
            placeholder={labels.auth.emailPlaceholder}
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
        </div>
        <div>
          {errors.password?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {labels.auth.errors.passwordRequired}
            </h3>
          )}
          <input
            className="p-3 rounded-md w-full bg-sprint-config text-sprint-foreground placeholder:text-sprint-muted focus:outline-none focus:ring-2 focus:ring-sprint-ring/50"
            type="password"
            placeholder={labels.auth.passwordPlaceholder}
            {...register("password", { required: true })}
          />
        </div>

        <button
          className=" bg-sprint-blue p-3 rounded-md text-white hover:opacity-80 transition"
          type="submit">
          <span className="flex gap-3 items-center justify-center font-bold ">
            <SignInIcon className="text-xl " />
            {labels.auth.signIn}
          </span>
        </button>
      </form>
      <div className="flex gap-2 mt-4 ">
        <h3>{labels.auth.or}</h3>
        <button
          className="text-sprint-blue font-bold"
          onClick={() => handleFormState("signUp")}>
          {labels.auth.signUp}
        </button>
      </div>
    </article>
  );
};
