import { Outlet } from "react-router-dom";
import { Footer, Nav } from "../components";

export const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-col  h-screen px-5 md:px-0">
      <header className=" flex flex-col justify-center">
        <Nav />
      </header>
      <main className="flex justify-center  w-full flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
