import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct, setError } from "../../features/Auth/Regisiter";

import ErrorModal from "../ErrorModal.jsx";
import { regiterUser } from "../../features/Auth/RegisterAction.js";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status } = useSelector((state) => state.register);

  useEffect(() => {
    dispatch(setError(null));
  }, [dispatch]);

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (status == "failed") {
  //     dispatch(setError(""));
  //   }
  // });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password || !data.userName) {
      dispatch(setError("Please Check Credentials"));
    }

    console.log(data);

    dispatch(regiterUser(data));
    navigate("/login");
  };

  const closeModal = () => {
    dispatch(setError(null));
  };

  return (
    <div className="mt-8">
      {error && <ErrorModal message={error} onClose={closeModal} />}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center justify-center px-6 mt-2 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow border border-gray-300 md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6    space-y-2 md:space-y-3 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Register
              </p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Username
                </label>
                <input
                  placeholder="Enter Username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="userName"
                  name="userName"
                  type="text"
                  onChange={handleChange}
                  value={data.userName}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Email Address"
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Password"
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                    type="checkbox"
                    aria-describedby="terms"
                    id="terms"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 text-gray-300">
                    I accept the
                    <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline text-primary-500"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
                type="submit"
              >
                Create an account
              </button>
              <span className="text-blue-500"> If you have an account </span>
              <Link to={"/login"} className="text-blue-900">
                Login
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
