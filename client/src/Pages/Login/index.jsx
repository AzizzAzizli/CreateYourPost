import React, { useState } from "react";
import Navigation from "../../components/Nav";
import { validateEmail } from "../../utils";
import { loginUser } from "../../services";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();

    const { fullname, email, password } = userData;

    if (!email || !password) {
      toast.warning("Please fill the all fields!");
      return;
    } else {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        toast.warning("Please enter a valid email");
        return;
      } else {
        const resData = await loginUser(userData);
        console.log(resData);
        if (resData.status === 200) {
          toast.success(resData.message);
          setUserData({
            email: "",
            password: "",
          });
          localStorage.setItem("user", JSON.stringify(resData.data));
          Cookies.set("token", resData.token, { expires: 3 });
          navigate("/");
        } else {
          toast.error(resData.message);
          return;
        }
      }
    }
  }

  return (
    <div>
      <Navigation />
      <div className="flex justify-center items-center ">
        <div className=" border border-black p-5 w-2/3 md:w-1/3 lg:w-1/4">
          <div className="mb-5">
            <p className="font-medium text-2xl text-center">Log in</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                autoComplete="email"
                name="email"
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
                value={userData.password}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, password: e.target.value }))
                }
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

export default Login;
