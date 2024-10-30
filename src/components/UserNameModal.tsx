import { ChangeEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { CloseIcon } from "../icons/Icons";
import { current } from "@reduxjs/toolkit";




export const UserNameModal = () => {

  const { setLogout, createAccountName } = useAuth()
  const [userName, setUserName] = useState<string>('')
  const [erros, setErros] = useState({ state: null, error: null }) // ok | ko | null


  const handleSubmit = (event: HTMLFormElement) => {
    event.preventDefault()


    if (userName.trim().length === 0) {
      return setErros({ state: 'ko', error: 'username cannot be empty, username is required' })
    }

    if (userName.trim().length > 15) {
      return setErros({ state: 'ko', error: 'username cannot be longer than 15 characters' })
    }

    if (userName.trim().length < 5) {
      return setErros({ state: 'ko', error: 'username cannot be less than 5 characteres' })
    }

    //remenber valid if the user exist validation


    setErros({ state: 'ok', error: null })
    createAccountName(userName)
    setUserName('')
  }

  const handleOnchange = (event: ChangeEvent) => {
    const { value } = event.target

    setUserName(value)
  }






  return (
    <div className="flex bg-[#00000080]  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  h-full ">
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div className="relative bg-sprint-home rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-500">
              Account name
            </h3>
            <button
              type="button"
              className="text-gray-500 bg-transparent  rounded-lg text-sm  ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <button className="hover:text-sprint-blue"
                onClick={() => setLogout()}
              >
                <CloseIcon />
              </button>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {
                erros.state === null || erros.state === 'ok'
                  ? <h3 className="text-xs font-semibold">Please enter a username before continuing</h3>
                  : <h3 className="text-xs font-semibold text-red-500 opacity-80"> {erros.error} </h3>

              }
              <input
                type="text"
                name="username"
                value={userName}
                onChange={(e) => handleOnchange(e)}
                placeholder=""
                className="bg-sprint-config p-2 rounded-md w-full "
              />
              <button
                data-modal-hide="default-modal"
                type="submit"
                className=" w-full border border-gray-700 p-2 rounded-md hover:bg-sprint-blue hover:text-white"
              >
                OK
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
