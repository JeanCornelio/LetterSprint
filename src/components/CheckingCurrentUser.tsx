import { LoadingIcon } from "../icons/Icons"


export const CheckingCurrentUser = () => {
  return (
    <div className=" overflow-y-auto overflow-x-hidden flex animate-fade-in  justify-center items-center w-full md:inset-0  h-full ">
        <div className="text-center flex  items-center">
        <LoadingIcon/>
        {/* <span > Downloading user data...</span> */}
        </div>
    </div>
  )
}
