import React from "react";
import Navigation from "../../components/Nav";

const Register = () => {
  return (
    <div>
      <Navigation />
      <div className="flex justify-center items-center ">
        <div className=" border border-black p-5 w-2/3 md:w-1/3 lg:w-1/4">
          <div className="mb-5">
            <p className="font-medium text-2xl text-center">Register</p>
          </div>
          <form>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="fullname" className="font-semibold">
                Fullname
              </label>
              <input
                name="fullname"
                autoComplete="name"
                placeholder="Enter your fullname"
                required
                className="border border-black h-8 p-2"
                id="fullname"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
                className="border border-black h-8 p-2"
                id="email"
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1 mb-4 ">
              <label htmlFor="password" className="font-semibold">
                Password
              </label>
              <input
                name="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="border border-black h-8 p-2"
                id="password"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="border border-black w-full py-1 hover:bg-blue-500 hover:text-white font-semibold"
            >
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
