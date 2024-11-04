import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../components";

import { useAuth } from "../hooks/useAuth";

import { CheckingAuth } from "../components/CheckingAuth";
import { CheckingCurrentUser } from "../components/CheckingCurrentUser";
import { useCheckingCurrentUser } from "../hooks/useCheckingCurrentUser";

export const HomePage = () => {
  const { state, isPending } = useAuth();
  useCheckingCurrentUser();

  return (
    <div className="container mx-auto flex flex-col h-screen  xl:px-0 relative min-w-[375px] ">
      {state === "checking" && <CheckingAuth />}
      <header className="max-h-24 fixed  top-0  container  bg-sprint-home z-5 px-2  md:px-0">
        <Nav />
      </header>
      <main className="flex justify-center  w-full flex-grow mt-[5.5rem] px-2 md:px-0">
        {isPending ? <CheckingCurrentUser /> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
