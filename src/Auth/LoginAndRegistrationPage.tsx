import {
  BackIcon,
  GithubIcon,
  GoogleIcon,
  SignInIcon,
  UserAdd01Icon,
} from "../icons/Icons";
import { useState } from "react";

type formState = "signIn" | "signUp";

export const LoginAndRegistrationPage = () => {
  const [formState, setformState] = useState<formState>("signIn");

  const handleFormState = (state: formState) => {
    setformState(state);
  };

  return (
    <section className=" flex flex-col justify-center items-center gap-10 animate-fade-in ">
      <div className="text-center mb-auto">
        <h2 className="text-4xl font-bold">Login to Your Account</h2>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 mt-8  text-lg lg:text-center lg:text-xl xl:px-60">
          Challenge yourself by testing your typing speed and accuracy and
          compete against people from all corners of the globe in real-time to
          prove your skills and climb to the top of the leaderboard
        </p>
      </div>

      <div className=" flex w-full max-w-5xl gap-8 items-center justify-center p-5 mb-auto">
        {formState === "signIn" && (
          <>
            <article className="flex flex-col w-full ">
              <form className="flex flex-col gap-4 ">
                <div>
                  <input
                    type="email"
                    name="email"
                    value=""
                    placeholder="Email@example.com"
                    className="bg-sprint-config p-4 outline-none rounded-md w-full"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    value=""
                    placeholder="*******"
                    className="bg-sprint-config p-4 outline-none rounded-md w-full"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 bg-gray-50 "
                      required
                    />
                  </div>
                  <label
                    htmlFor="remember"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

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

            <div className="">/</div>
            <div className="flex flex-col w-full gap-4 mb-4 ">
              <button className="border border-1 border-gray-700 p-4 rounded-md  hover:border-sprint-blue hover:text-sprint-blue transition">
                <span className="flex gap-3 items-center ">
                  <GoogleIcon className="text-xl" />
                  Sign in with Google
                </span>
              </button>
              <button className="border border-1 border-gray-700 p-4  rounded-md  hover:border-sprint-blue hover:text-sprint-blue transition">
                <span className="flex gap-2 items-center ">
                  <GithubIcon className="text-xl" />
                  Github
                </span>
              </button>
            </div>
          </>
        )}

        {formState === "signUp" && (
          <form className="flex  w-full items-center gap-8  ">
            <div className="flex-col flex w-full gap-4">
              <div>
                <input
                  type="text"
                  name="username"
                  value=""
                  placeholder="Username"
                  className="bg-sprint-config p-4 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value=""
                  placeholder="Email@example.com"
                  className="bg-sprint-config p-4 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="verifyEmail"
                  value=""
                  placeholder="Verify email"
                  className="bg-sprint-config p-4 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value=""
                  placeholder="Password"
                  className="bg-sprint-config p-4 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="verifyPassword"
                  name="password"
                  value=""
                  placeholder="Verify Password"
                  className="bg-sprint-config p-4 outline-none rounded-md w-full"
                />
              </div>
            </div>
            <div className="">/</div>
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
        )}
      </div>

    </section>
  );
};
