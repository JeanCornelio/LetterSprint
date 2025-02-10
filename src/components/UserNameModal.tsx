import { CloseIcon } from "../icons/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

interface Form {
  username?: string;
}

const initialForm = {
  username: "",
};

export const UsernameModal = () => {
  const { setLogout, createAccountName, checkUsername } = useAuth();
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
    createAccountName(username);
  };

  return (
    <div className="flex bg-[#00000080]  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-10 justify-center items-center w-full md:inset-0  h-full ">
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div className="relative bg-sprint-home rounded-lg animate-fade-in ">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-500">
              Account name
            </h3>
            <button
              type="button"
              className="text-gray-500 bg-transparent  rounded-lg text-sm  ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <button
                className="hover:text-sprint-blue"
                onClick={() => setLogout()}
              >
                <CloseIcon />
              </button>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <h3 className="text-xs font-semibold">
                Please enter a username before continuing
              </h3>
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
                type="text"
                placeholder=""
                defaultValue=""
                value={username}
                {...register("username", {
                  required: true,
                  minLength: 3,
                  maxLength: 15,
                  validate: {
                    userNameNotAvailable: async () =>
                      await checkUsername(username),
                  },
                })}
                className="bg-sprint-config p-2 rounded-md w-full "
              />
              <button
                data-modal-hide="default-modal"
                type="submit"
                className=" w-full border border-gray-700 p-2 rounded-md hover:bg-sprint-blue hover:text-white"
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
