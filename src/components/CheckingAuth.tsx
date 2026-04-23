import { LoadingIcon } from "../icons/Icons"


export const CheckingAuth = () => {
  return (
    <div className="flex bg-sprint-overlay/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full">
          <div className="w-full flex justify-center">
            <LoadingIcon />
          </div>
        </div>
  )
}
