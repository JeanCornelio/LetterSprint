import { BackIcon, UserAdd01Icon } from "../icons/Icons";
import { useAuth } from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface Form {
  email: string;
  password: string;
  username?: string;
  verifyEmail?: string;
  verifyPassword?: string;
}

interface FormSignUpProps {
  handleFormState: (state: "signIn" | "signUp") => void;
  onCreateUserWithEmailAndPassword: (data: { email: string; password: string; username?: string }) => Promise<void>;
}

const initialForm = {
  username: "",
  email: "",
  verifyEmail: "",
  password: "",
  verifyPassword: "",
};

export const FormSignUp = ({
  handleFormState,
  onCreateUserWithEmailAndPassword,
}: FormSignUpProps) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>();
  const { checkUsername } = useAuth();
  const username = watch("username");
  const email = watch("email");
  const verifyEmail = watch("verifyEmail");
  const password = watch("password");
  const verifyPassword = watch("verifyPassword");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initialForm);
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { email, password, username } = data;
    await onCreateUserWithEmailAndPassword({ email, password, username });
    handleFormState("signIn");
  };

  return (
    <form
      className="flex flex-col md:flex-row w-full items-center md:gap-8 "
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-col flex w-full gap-4">
        <div className="">
          {errors.username?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Username is required, cannot be empty
            </h3>
          )}
          {errors.username?.type === "minLength" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Username cannot be less than 3 characters
            </h3>
          )}
          {errors.username?.type === "maxLength" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Username cannot be longer than 15 characters
            </h3>
          )}
          {errors.username?.type === "userNameNotAvailable" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              The username {username} is not available
            </h3>
          )}
          <input
            autoComplete="off"
            type="text"
            defaultValue=""
            placeholder="Username"
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 15,
              validate: {
                userNameNotAvailable: async () => await checkUsername(username || ""),
              },
            })}
            className="bg-sprint-config p-4 outline-none rounded-md w-full"
          />
        </div>
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
            autoComplete="off"
            type="email"
            defaultValue=""
            placeholder="Email@example.com"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            className="bg-sprint-config p-4 outline-none rounded-md w-full"
          />
        </div>
        <div>
          {errors.verifyEmail?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Email is not valid
            </h3>
          )}

          {errors.verifyEmail?.type === "emailEqual" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              emails not match
            </h3>
          )}

          <input
            autoComplete="off"
            type="email"
            defaultValue=""
            placeholder="Verify Email"
            {...register("verifyEmail", {
              required: true,
              validate: {
                emailEqual: () => email === verifyEmail,
              },
            })}
            className="bg-sprint-config p-4 outline-none rounded-md w-full"
          />
        </div>
        <div>
          {errors.password?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Password is required
            </h3>
          )}
          {errors.password?.type === "minLength" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Password cannot be less than 6 characters
            </h3>
          )}
          <input
            autoComplete="off"
            type="password"
            defaultValue=""
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="bg-sprint-config p-4 outline-none rounded-md w-full"
          />
        </div>
        <div>
          {errors.verifyPassword?.type === "required" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              Password is required
            </h3>
          )}
          {errors.verifyPassword?.type === "passwordEqual" && (
            <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
              {" "}
              passwords not match
            </h3>
          )}
          <input
            autoComplete="off"
            type="password"
            defaultValue=""
            placeholder="Verify Password"
            {...register("verifyPassword", {
              required: true,
              validate: {
                passwordEqual: () => password === verifyPassword,
              },
            })}
            className="bg-sprint-config p-4 outline-none rounded-md w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-sprint-blue p-4 rounded-md text-white hover:opacity-80 transition"
        >
          <span className="flex gap-3 items-center justify-center font-bold ">
            <UserAdd01Icon className="text-xl" />
            Sign Up
          </span>
        </button>
        <button
          type="button"
          className="flex gap-2 items-center justify-center font-bold "
          onClick={() => handleFormState("signIn")}
        >
          <BackIcon className="text-xl" />
          Back
        </button>
      </div>
    </form>
  );
};