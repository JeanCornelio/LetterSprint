import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../components";
import { LoadingIcon } from "../icons/Icons";
import { useAuth } from "../hooks/useAuth";

export const HomePage = () => {
  const { state } = useAuth()

  return (
    <div className="container mx-auto flex flex-col  h-screen px-5 md:px-0 relative">
      {state === 'checking' &&
        <div className="flex bg-[#00000080]  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  h-full">
          <div className="w-full flex justify-center">
            <LoadingIcon />
          </div>
        </div>
      }

      <header className=" flex flex-col justify-center">
        <Nav />
      </header>
      <main className="flex justify-center  w-full flex-grow ">

        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
