import { SignInIcon, UserAdd01Icon } from "../icons/Icons";
import { SubmitHandler, useForm } from "react-hook-form";

interface Form {
  email: string;
  password: string;
}

interface FormSignInProps {
  handleFormState: (state: "signIn" | "signUp") => void;
  onSignIn: (data: { email: string; password: string }) => Promise<void>;
}

export const FormSignIn = ({ handleFormState, onSignIn }: FormSignInProps) => {
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {errors.email?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Email is required, cannot be empty
            </h3>
          )}
          {errors.email?.type === "pattern" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Email is not valid
            </h3>
          )}
          <input
            className=" border border-1 border-gray-700 p-3 rounded-md w-full bg-sprint-config"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
        </div>
        <div>
          {errors.password?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              password is required
            </h3>
          )}
          <input
            className=" border border-1 border-gray-700 p-3 rounded-md w-full bg-sprint-config"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        <button
          className=" bg-sprint-blue p-3 rounded-md text-white hover:opacity-80 transition"
          type="submit"
        >
          <span className="flex gap-3 items-center justify-center font-bold ">
            <SignInIcon className="text-xl " />
            Sign In
          </span>
        </button>
      </form>
      <div className="flex gap-2 mt-4 ">
        <h3>or</h3>
        <button
          className="text-sprint-blue font-bold"
          onClick={() => handleFormState("signUp")}
        >
          Sign Up
        </button>
      </div>
    </article>
  );
};