import React, { useState } from "react";
import Navigation from "../../components/Nav";
import { toast } from "react-toastify";
import { validateEmail } from "../../utils";
import { registerUser } from "../../services";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // console.log(userData);

  async function handleSubmit(e) {
    e.preventDefault();
    const { fullname, email, password } = userData;

    if (!fullname || !email || !password) {
      toast.warning("Please fill the all fields!");
      return;
    } else {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        toast.warning("Please enter a valid email");
        return;
      } else {
        const passwordLength = password.length;
        if (passwordLength <= 6) {
          toast.warning("Password must be more than 6 digits");
          return;
        } else {
          const resData = await registerUser(userData);
          console.log(resData);
          if (resData.status === 201) {
            toast.success(resData.message);
            setUserData({
              fullname: "",
              email: "",
              password: "",
            });
            navigate("/user/login");

            return;
          } else {
            toast.error(resData.message);
          }
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
            <p className="font-medium text-2xl text-center">Register</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1 mb-2">
              <label htmlFor="fullname" className="font-semibold">
                Fullname
              </label>
              <input
                value={userData.fullname}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, fullname: e.target.value }))
                }
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
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
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

export default Register;
