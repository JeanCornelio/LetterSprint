import { Link } from "react-router-dom";
import { CrownIcon, KeyBoardIcon, UserIcon } from "../icons/Icons";






export const Nav = () => {
  return (
    <nav className="container px-5">
      <div className="flex py-7">
        <a className="mx-auto cursor-pointer ">
          <h1 className="text-xl lg:text-3xl gap-2 flex font-bold tracking-wide  fade-in-bottom">
            <KeyBoardIcon className=" text-xl lg:text-3xl text-sprint-blue mt-0.5" />{" "}
            LetterSprint
          </h1>
        </a>
  
        <div className="flex gap-2 items-center ">
        <button  className="me-auto  p-1 rounded-full hover:text-sprint-blue transition">
            <CrownIcon className="text-xl" />
          </button>
          <Link to='/login' className="  p-1 rounded-full hover:text-sprint-blue transition">
            <UserIcon className="text-xl" />
          </Link>
       
        </div>
      </div>
    </nav>
  );
};
