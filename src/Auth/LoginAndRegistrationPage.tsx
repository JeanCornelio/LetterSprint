import { ExternalAuthentication } from "../components/ExternalAuthentication";
import { FormSignIn } from "../components/FormSignIn";
import { FormSignUp } from "../components/FormSignUp";
import { UsernameModal } from "../components/UsernameModal";

import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

type formState = "signIn" | "signUp";

export const LoginAndRegistrationPage = () => {
  const [formState, setFormState] = useState<formState>("signIn");
  const { signInWithGoogle, state, createUserWithEmailAndPassword, signIn } = useAuth();

  const handleFormState = (state: formState) => {
    setFormState(state);
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
        {formState === "signIn" &&
          <>
            <FormSignIn handleFormState={handleFormState} onSignIn={signIn} />
            <div className="">/</div>
            <ExternalAuthentication onSignInWithGoogle={signInWithGoogle} />
          </>
        }
        {state === "checkUserName" && <UsernameModal />}
        {formState === "signUp" && <FormSignUp handleFormState={handleFormState} onCreateUserWithEmailAndPassword={createUserWithEmailAndPassword} />}
      </div>
    </section>
  );
};
