import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import burger from "../../assets/icons/burger.svg";
import close from "../../assets/icons/close.svg";
const Navigation = ({ marginB = "mb-16", isUser = true }) => {
  const navigate = useNavigate();
const [isClose,setIsClose] = useState(true)
  return (
    <div
      className={`flex justify-between py-3 px-5 items-center h-24 border-b-2 w-5/6 m-auto  border-black ${marginB}`}
    >
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tighter">
          Create your posts
        </h1>
      </div>
      <div className="block sm:hidden">
        <img className="h-8 w-8" src={burger} alt="burger-icon"   onClick={()=>setIsClose((prev)=>!prev)}/>
      </div>
      <div className={`fixed flex top-0 ease-linear transition-all duration-500  ${isClose?"right-[-100%]":"right-0"} h-screen  w-1/2 gap-5 `}>
        <div><img src={close} className="h-8 w-8"  alt="close-icon"  onClick={()=>setIsClose((prev)=>!prev)}/></div>
        <div className="flex flex-col gap-5 py-10 pl-10 bg-white w-full h-screen">
          <p className="font-sans font-semibold text-lg underline hover:text-blue-600 ">Profile</p>
          <p className="font-sans font-semibold text-lg underline hover:text-blue-600">Create post</p>
          <p className="font-sans font-semibold text-lg underline hover:text-blue-600">Logout</p>
        </div>
      </div>
      {isUser ? (
        <div className=" gap-3 hidden sm:flex">
          <div
            onClick={() => navigate("/user/profile")}
            className=" border border-black rounded-full flex justify-center items-center h-9 w-9 hover:bg-gray-200 cursor-pointer "
          >
            <span>A</span>
          </div>
          <button
            onClick={() => navigate("/user/create_post")}
            className=" border border-black px-3 h-9 hover:bg-gray-200 "
          >
            Create post
          </button>
          <button className=" border border-black px-3 h-9 hover:bg-gray-200">
            Logout
          </button>
        </div>
      ) : (
        <div className=" gap-3 hidden sm:flex ">
          <button
            onClick={() => navigate("/user/login")}
            className=" border border-black px-3 h-9 hover:bg-gray-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/user/register")}
            className=" border border-black px-3 h-9 hover:bg-gray-200"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
