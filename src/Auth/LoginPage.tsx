import { Link } from "react-router-dom";
import {
  BackIcon,
  GithubIcon,
  GoogleIcon,
  KeyBoardIcon,
  SignInIcon,
  UserAdd01Icon,
} from "../icons/Icons";
import { useState } from "react";

type formState = "signIn" | "signUp";

export const LoginPage = () => {
  const [formState, setformState] = useState<formState>("signIn");

  const handleFormState = (state: formState) => {
    setformState(state);
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <article className="border border-1 border-gray-700 p-5 rounded-lg w-96 ">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl lg:text-2xl gap-2 flex font-bold tracking-wide  ">
            LetterSprint
          </h1>

          <Link to={"/"}>
            <KeyBoardIcon className=" text-xl lg:text-2xl  hover:text-sprint-blue transition " />{" "}
          </Link>
        </div>
        {formState === "signIn" && (
          <>
            <div className="flex w-full gap-4 mb-4 ">
              <button className="border border-1 border-gray-700 p-2 rounded-md w-3/6 hover:border-sprint-blue transition">
                <span className="flex gap-2 items-center ">
                  <GoogleIcon className="text-xl" />
                  Google
                </span>
              </button>
              <button className="border border-1 border-gray-700 p-2 rounded-md w-3/6 hover:border-sprint-blue transition">
                <span className="flex gap-2 items-center ">
                  <GithubIcon className="text-xl" />
                  Github
                </span>
              </button>
            </div>
            <form className="flex flex-col gap-4 ">
              <div>
                <input
                  type="email"
                  name="email"
                  value=""
                  placeholder="Email@example.com"
                  className="bg-sprint-config p-2 outline-none rounded-md w-full"
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value=""
                  placeholder="*******"
                  className="bg-sprint-config p-2 outline-none rounded-md w-full"
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
                className="bg-sprint-blue text-white p-2 rounded flex items-center justify-center gap-2 font-bold"
              >
                <SignInIcon className="font-bold" />
                Sign in
              </button>
            </form>
          </>
        )}

        {formState === "signUp" && (
          <form className="flex flex-col gap-4 ">
            <div>
              <input
                type="text"
                name="username"
                value=""
                placeholder="Username"
                className="bg-sprint-config p-2 outline-none rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value=""
                placeholder="Email@example.com"
                className="bg-sprint-config p-2 outline-none rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="email"
                name="verifyEmail"
                value=""
                placeholder="Verify email"
                className="bg-sprint-config p-2 outline-none rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value=""
                placeholder="Password"
                className="bg-sprint-config p-2 outline-none rounded-md w-full"
              />
            </div>
            <div>
              <input
                type="verifyPassword"
                name="password"
                value=""
                placeholder="Verify Password"
                className="bg-sprint-config p-2 outline-none rounded-md w-full"
              />
            </div>

            <button
              type="submit"
              className="border border-gray-700  text-white p-2 rounded flex items-center justify-center gap-2 font-bold hover:border-sprint-blue w-full mt-4"
            >
              <UserAdd01Icon className="font-bold" />
              Sign up
            </button>
          </form>
        )}

        {formState === "signIn" && (
          <button
            onClick={() => handleFormState("signUp")}
            className="border border-gray-700  text-white p-2 rounded flex items-center justify-center gap-2 font-bold hover:border-sprint-blue w-full mt-4"
          >
            <UserAdd01Icon className="font-bold" />
            Sign up
          </button>
        )}
        {formState === "signUp" && (
          <button
            onClick={() => handleFormState("signIn")}
            className="border border-gray-700  text-white p-2 rounded flex items-center justify-center gap-2 font-bold hover:border-sprint-blue w-full mt-4"
          >
            <BackIcon className="font-bold" />
            Go Back
          </button>
        )}
      </article>
    </section>
  );
};
