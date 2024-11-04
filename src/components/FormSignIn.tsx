import { SignInIcon, UserAdd01Icon } from "../icons/Icons";

import { SubmitHandler, useForm } from "react-hook-form";

interface Form {
    email: string;
    password: string;
}

export const FormSignIn = ({ handleFormState, onSignIn }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<Form>();

    const onSubmit: SubmitHandler<Form> = async (data) => {
        const { email, password } = data;
        onSignIn({ email, password });
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
                        autoComplete="off"
                        type="email"
                        defaultValue=""
                        placeholder="Email"
                        {...register("email", {
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        })}
                        className="bg-sprint-config p-4 outline-none rounded-md w-full"
                    />
                </div>
                <div>
                    {errors.password?.type === "required" && (
                        <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                            Password is required
                        </h3>
                    )}

                    <input
                        autoComplete="off"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                        className="bg-sprint-config p-4 outline-none rounded-md w-full"
                    />
                </div>
                {/*     <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-gray-300 bg-gray-50 "

                        />
                    </div>
                    <label
                        htmlFor="remember"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Remember me
                    </label>
                </div> */}

                <button
                    type="submit"
                    className="bg-sprint-blue text-white p-4 rounded flex items-center justify-center gap-2 "
                >
                    <SignInIcon className="font-bold" />
                    Sign in
                </button>
            </form>

            <button
                onClick={() => handleFormState("signUp")}
                className="border border-gray-700   p-4 rounded flex items-center justify-center gap-2  hover:border-sprint-blue hover:text-sprint-blue w-full mt-4"
            >
                <UserAdd01Icon className="font-bold" />
                Sign up
            </button>
        </article>
    );
};
