import {KeyBoardIcon, UserIcon } from "../icons/Icons";

export const Nav = () => {
  return (
    <nav className="container mx-auto ">
      <div className=" flex justify-centerbg-red-400  py-7  ">
      <a className="mx-auto cursor-pointer ">
          
          <h1 className="text-xl lg:text-3xl gap-2 flex font-bold tracking-wide ">
          <KeyBoardIcon className=" text-xl lg:text-3xl text-sprint-blue " /> LetterSprint
          </h1>
        </a>
      
        <div className="flex  md:space-x-0 ">
          <button className="me-auto  p-1 rounded-full">
            <UserIcon className="text-xl" />
          </button>
        </div>
      </div>
    </nav>
  );
};
