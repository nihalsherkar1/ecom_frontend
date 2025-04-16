import React from "react";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 z-50">
      <div className="flex flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs">
        <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-white px-[10px] shadow-lg border-2 border-white  ">
          <div className="flex gap-2">
            <div className="text-[#d65563] bg-black  backdrop-blur-xl p-1 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                ></path>
              </svg>
            </div>
            <div>
              <p className="text-black">Please try again</p>
              <p className="text-gray-500">{message}</p>
            </div>
          </div>
          <button
            className="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
