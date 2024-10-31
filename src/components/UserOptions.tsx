import {
  Button,
  Dialog,
  DialogTrigger,
  Popover,
} from "react-aria-components";
import { Link } from "react-router-dom";
import { AvatarIcon, SignOutIcon, UserIcon } from "../icons/Icons";

export const UserOptions = ({ setLogout, username, photoURL }) => {
  return (
    <DialogTrigger>
      <Button className="flex items-center gap-2 hover:text-sprint-blue hover:ring-sprint-blue">
        <div className="cursor-pointer ">

          {
            photoURL
              ? < img
                className="w-6 h-6 p-1 rounded-full ring-2 ring-slate-600 "
                src={photoURL}
                alt="Bordered avatar"
              />

              : <div className="relative  overflow-hidden w-6 h-6 p-1 rounded-full ring-2 ring-slate-600">
                <AvatarIcon className="absolute w-8 h-8 text-gray-400 top-0 -left-1" />
              </div>

          }

        </div>
        <span className="select-none">{username}</span>
      </Button>

      <Popover>

        <Dialog className="border border-zinc-500 rounded-md w-28 bg-sprint-config overflow-hidden">
          <div className="flex-col text-sm ">
            <div className=" hover:bg-gray-400 hover:text-sprint-config transition ">
              <Link
                to="/user"
                className="flex gap-1 items-center py-1  px-3"
              >
                <UserIcon /> <span>Profile</span>
              </Link>
            </div>

            <div className="hover:bg-gray-400 hover:text-sprint-config transition">
              <button className="   flex gap-1 items-center py-1  px-3 " onClick={() => setLogout()}>
                <SignOutIcon /> <span>Sign out</span>
              </button>
            </div>

          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
