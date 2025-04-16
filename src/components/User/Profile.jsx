import React from "react";
import userLogo from "../../images/user.svg";
import { useSelector } from "react-redux";
const Profile = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  return (
    <div className="flex items-center  justify-center max-h-screen mt-25 ">
      <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          <div
            id="dropdown"
            class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul class="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userLogo}
            alt="Bonnie image"
          />
          <div className="flex">
            <h5 className="text-xl   font-medium mr-5">User: </h5>
            <h5 class="mb-1 text-lg font-medium text-gray-500 dark:text-white">
              {user.userName}
            </h5>
          </div>
          <div className="flex">
            <h5 className="text-xl   font-medium mr-5">Email: </h5>
            <h5 class="mb-1 text-lg font-medium text-gray-500 dark:text-white     ">
              {user.email}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
