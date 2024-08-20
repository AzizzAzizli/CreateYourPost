import React from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {

const navigate = useNavigate()

  return (
    <div className="flex justify-between py-3 px-5 items-center h-24 border-b-2 w-5/6 m-auto border-black mb-16">
      <div className="cursor-pointer" onClick={()=>navigate("/")}>
        <h1 className="font-sans text-3xl font-bold tracking-tighter">
          Create your posts
        </h1>
      </div>
      <div className="flex gap-3 ">
        <button className=" border border-black px-3 py-1 hover:bg-gray-200">
          Create post
              </button>
              <button className=" border border-black px-3 py-1 hover:bg-gray-200">
          Logout
        </button>
      </div>
      <div className="flex gap-3 ">
        <button onClick={()=>navigate("/user/login")} className=" border border-black px-3 py-1 hover:bg-gray-200">
          Login
        </button>
        <button onClick={()=>navigate("/user/register")} className=" border border-black px-3 py-1 hover:bg-gray-200">
          Register
        </button>
      </div>
    </div>
  );
};

export default Navigation;
