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
}) => {
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
        onCreateUserWithEmailAndPassword({ email, password, username });
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
                            Username cannot be less than 3 characteres
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
                                userNameNotAvailable: async () => await checkUsername(username),
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
                        type="text"
                        defaultValue=""
                        placeholder="Verify email"
                        {...register("verifyEmail", {
                            required: true,
                            validate: { emailEqual: () => email === verifyEmail },
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

                    {errors.password?.type === "pattern" && (
                        <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                            {" "}
                            Password must include a mix of letters, numbers, and symbols
                        </h3>
                    )}

                    <input
                        autoComplete="off"
                        type="password"
                        defaultValue=""
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                            pattern:
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/,
                        })}
                        className="bg-sprint-config p-4 outline-none rounded-md w-full"
                    />
                </div>
                <div>
                    {errors.verifyPassword?.type === "required" && (
                        <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                            Password is not valid
                        </h3>
                    )}

                    {errors.verifyPassword?.type === "passwordEqual" && (
                        <h3 className="text-xs font-semibold text-red-500 opacity-8 mb-2">
                            Passwords not match
                        </h3>
                    )}

                    <input
                        autoComplete="off"
                        type="password"
                        defaultValue=""
                        placeholder="Verify Password"
                        {...register("verifyPassword", {
                            required: true,
                            validate: { passwordEqual: () => password === verifyPassword },
                        })}
                        className="bg-sprint-config p-4 outline-none rounded-md w-full"
                    />
                </div>
            </div>
            <div className="hidden md:block">/</div>
            <div className="flex flex-col w-full gap-4 mb-4 ">
                <button
                    type="submit"
                    className="border border-gray-700   p-4 rounded flex items-center justify-center gap-2  hover:border-sprint-blue w-full mt-4"
                >
                    <UserAdd01Icon className="font-bold" />
                    Create
                </button>
                <button
                    onClick={() => handleFormState("signIn")}
                    className="border border-gray-700   p-4 rounded flex items-center justify-center gap-2  hover:border-sprint-blue w-full "
                >
                    <BackIcon className="font-bold" />
                    Go Back
                </button>
            </div>
        </form>
    );
};
