import { ExternalAuthentication } from "../components/ExternalAuthentication";
import { FormSignIn } from "../components/FormSignIn";
import { FormSignUp } from "../components/FormSignUp";
import { GuestRoute } from "../components/GuestRoute";
import { UsernameModal } from "../components/UserNameModal";

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

type formState = "signIn" | "signUp";

export const LoginAndRegistrationPage = () => {
  const [formState, setFormState] = useState<formState>("signIn");
  const {
    signInWithGoogle,
    state,
    createUserWithEmailAndPassword,
    signIn,
    signInWithGithub,
  } = useAuth();

  const handleFormState = (newState: formState) => {
    setFormState(newState);
  };

  return (
    <GuestRoute>
      <section className=" flex flex-col justify-center items-center md:gap-10 animate-fade-in ">
        <div className="text-center mb-auto">
          <h2 className="text-4xl font-bold">
            {formState === "signUp" ? "Create an Account" : "Login to Your Account"}
          </h2>
          <p className="mb-3 font-normal text-sprint-muted mt-8 text-lg lg:text-center lg:text-xl xl:px-60">
            {formState === "signUp"
              ? "Join LetterSprint and start improving your typing speed today!"
              : "Challenge yourself by testing your typing speed and accuracy. Push your limits, beat your personal bests, and climb to the top of the leaderboard."}
          </p>
        </div>

        <div className=" flex flex-col-reverse md:flex-row w-full max-w-5xl md:gap-8 items-center justify-center p-5 mb-auto">
          {formState === "signIn" && (
            <>
              <FormSignIn handleFormState={handleFormState} onSignIn={signIn} />
              <div className="hidden md:block ">/</div>
              <ExternalAuthentication
                onSignInWithGoogle={signInWithGoogle}
                onSignWithGithub={signInWithGithub}
              />
            </>
          )}
          {state === "checkUserName" && <UsernameModal />}
          {formState === "signUp" && (
            <FormSignUp
              handleFormState={handleFormState}
              onCreateUserWithEmailAndPassword={createUserWithEmailAndPassword}
            />
          )}
        </div>
      </section>
    </GuestRoute>
  );
};
