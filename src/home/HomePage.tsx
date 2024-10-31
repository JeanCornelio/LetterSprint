import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../components";

import { useAuth } from "../hooks/useAuth";

import { CheckingAuth } from "../components/CheckingAuth";
import { CheckingCurrentUser } from "../components/CheckingCurrentUser";
import { useCheckingCurrentUser } from "../hooks/useCheckingCurrentUser";

export const HomePage = () => {
  const { state, isPending } = useAuth();
  useCheckingCurrentUser()

  return (
    <div className="container mx-auto flex flex-col  h-screen px-5 md:px-0 relative">
      {state === "checking" && (
        <CheckingAuth />
      )}
      <header className=" flex flex-col justify-center">
        <Nav />
      </header>
      <main className="flex justify-center  w-full flex-grow ">
        {isPending
          ? <CheckingCurrentUser />
          : <Outlet />
        }
      </main>
      <Footer />
    </div>
  );
};
