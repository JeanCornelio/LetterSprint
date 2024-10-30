import { Link } from "react-router-dom";
import { CrownIcon, KeyBoardIcon, UserIcon } from "../icons/Icons";
import { useAuth } from "../hooks/useAuth";
import { UserOptions } from "./UserOptions";

export const Nav = () => {
  const { state, photoURL, userName, setLogout, isPending } = useAuth();

  return (
    <nav className="container max-h-24 ">
      <div className="flex py-7 justify-between items-center">
        <Link to="/" className=" cursor-pointer ">
          <h1 className="text-xl lg:text-3xl gap-2 flex font-bold tracking-wide  fade-in-bottom">
            <KeyBoardIcon className=" text-xl lg:text-3xl text-sprint-blue mt-0.5" />{" "}
            LetterSprint
          </h1>
        </Link>
        {!isPending && (
          <div className="flex gap-2 items-center transition animate-fade-in">
            <button className="me-auto  p-1 rounded-full hover:text-sprint-blue transition">
              <CrownIcon className="text-2xl" />
            </button>

            {state !== "authenticated" ? (
              <Link
                to="/login"
                className="  p-1 rounded-full hover:text-sprint-blue transition"
              >
                <UserIcon className="text-2xl" />
              </Link>
            ) : (
              <UserOptions
                setLogout={setLogout}
                userName={userName}
                photoURL={photoURL}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
