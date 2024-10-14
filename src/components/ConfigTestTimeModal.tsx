import { useState } from "react";
import { CloseIcon } from "../icons/Icons";

export const ConfigTestTimeModal = ({dialogState}) => {


    const closeModal = () => {
        dialogState(false)
    }

  return (
    <div

      className="flex bg-[#00000080]  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full "
    >
      <div className="relative p-4 w-full max-w-md max-h-full ">
        <div className="relative bg-sprint-home rounded-lg shadow ">
          <div className="flex items-center justify-between p-4 md:p-5">
            <h3 className="text-xl font-semibold text-gray-500">
              Test duration
            </h3>
            <button
              type="button"
              className="text-gray-500 bg-transparent  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
              data-modal-hide="default-modal"
            >
              <button onClick={closeModal} className="hover:text-sprint-blue">
                <CloseIcon/>
              </button>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-4 md:p-5 space-y-4"></div>

          <div className="flex items-center p-4 md:p-5  border-gray-200 rounded-b ">
            <button
              data-modal-hide="default-modal"
              onClick={closeModal}
              type="button"
              className=" w-full border border-gray-700 p-2 rounded-md hover:bg-sprint-blue hover:text-white"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
