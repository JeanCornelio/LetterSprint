import { Link } from "react-router-dom";
import { CrownIcon, KeyBoardIcon, UserIcon } from "../icons/Icons";
import { useAuth } from "../hooks/useAuth";

export const Nav = () => {
  const { state, photoURL, userName, setLogout } = useAuth()



  return (
    <nav className="container max-h-24 ">
      <div className="flex py-7 justify-between items-center">
        <Link to='/' className=" cursor-pointer ">
          <h1 className="text-xl lg:text-3xl gap-2 flex font-bold tracking-wide  fade-in-bottom">
            <KeyBoardIcon className=" text-xl lg:text-3xl text-sprint-blue mt-0.5" />{" "}
            LetterSprint
          </h1>
        </Link>

        <div className="flex gap-2 items-center ">
          <button className="me-auto  p-1 rounded-full hover:text-sprint-blue transition">
            <CrownIcon className="text-2xl" />
          </button>

          {
            state !== 'authenticated'
              ? <Link to='/login' className="  p-1 rounded-full hover:text-sprint-blue transition">
                <UserIcon className="text-2xl" />
              </Link>
              : <div className="  flex items-center gap-2">
                <div className="cursor-pointer">
                  <img className="w-6 h-6 p-1 rounded-full ring-2 ring-slate-600 " src={photoURL} alt="Bordered avatar" />
                </div>
                <span className="select-none">{userName}</span>
                <button className="border " onClick={() => setLogout()} >close</button>
              </div>
          }

        </div>
      </div>
    </nav>
  );
};
