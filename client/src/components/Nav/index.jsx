import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import burger from "../../assets/icons/burger.svg";
import close from "../../assets/icons/close.svg";
import search from "../../assets/icons/search.svg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { searchUsers } from "../../services";

const Navigation = () => {
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const [avatar, setAvatar] = useState("A");
  const [islogOutOpen, setIsLogOutOpen] = useState(false)
  const [userId, setUserId] = useState(JSON.parse(localStorage.getItem("user"))?.userId)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchData,setSearchData] = useState("")
  const [usersDivOpen, setUsersDivOpen] = useState(false)
  const [searchedUsers, setSearchedUsers] = useState([]) 

  useEffect(() => {
    const token = Cookies.get("token")||"";
    // console.log(token);

    const user = JSON.parse(localStorage?.getItem("user"));
    const firstLetter = user?.fullname[0]?.toUpperCase();
    if (user) {
      setAvatar(firstLetter);
    }
    if (token) {
      setIsUser(true);
      return;
    } else {
      setIsUser(false);
      localStorage.removeItem("user");
      return;
    }
  }, []);
  
  function toggleLogoutDiv() {
    setIsLogOutOpen((prev) => !prev)
    if (window.innerWidth < 640) {
      setIsClose(true)
      return
    }
  }
  function toggleSearchDiv(){
setSearchOpen(prev=> !prev)
  }

  function toggleUsersDiv() {
    setUsersDivOpen(prev=> !prev)
  }
  async function searchUser() {
    toggleSearchDiv()
    if (searchOpen) {
      if (!searchData) {
        return
      }
      toggleUsersDiv()
      const resData = await searchUsers(searchData)
      if (resData.status === 200) {
        setSearchedUsers(resData.data)
        setSearchData("")
        return
      } else {
        toast.error(resData.message)
        return
      }
    }
   
    
  }

  function onClickUser(userId) {
    navigate(`/user/profile/userId=${userId}`)
    toggleUsersDiv()
}
  function logOut() {
    localStorage.removeItem("user");
    Cookies.remove("token")
    toast.success("User logged out!")
    navigate("/")
    window.location.reload()
    toggleLogoutDiv()
 
    return
  }

  return (
    <>
        {/* Modal div */}
      <div className={`bg-white h-44 fixed flex z-10 flex-col w-2/3 sm:w-1/3 p-3 border border-black  transition-all duration-500 top-[50%] ${islogOutOpen?" right-[50%] ":" right-[-100%] "}  transform translate-x-1/2 -translate-y-1/2`}>
        <div onClick={toggleLogoutDiv} className="fixed top-0 right-0 "><img className="h-8 w-8 cursor-pointer"  src={close} alt="close-icon" /></div>
        <div className="text-center font-semibold text-xl border-b border-black pb-3"><p>Are you sure?</p>
        </div>
        <div className="flex h-full gap-5  justify-center items-center"><button onClick={logOut} className="border border-black py-1 w-1/3 hover:bg-green-400">Yes</button> <button onClick={toggleLogoutDiv} className="border border-black py-1 w-1/3 hover:bg-red-400">No</button></div>
      </div>
{/* Search div */}
      <div className={`fixed top-[90px] left-[50%] border-black border  transition-all duration-500  -translate-x-1/2 bg-white ${usersDivOpen?"h-[300px]":"h-0 opacity-0"} w-2/3 ssm:w-1/2 sm:w-1/3`}>
        <div className="flex justify-end p-1"><div><img className="h-7 w-7" onClick={toggleUsersDiv} src={close} alt="close-icon" /></div></div>
        <div className="p-3 h-[250px] overflow-y-auto">
          {searchedUsers?.map(user => (<div key={user.userId} onClick={()=>onClickUser(user.userId)} className="border-black border-b pb-2 cursor-pointer mb-2"><p>Name: <span>{ user.fullname}</span></p></div>)) }
        </div>
      </div> 
      {/* ------------------------------------------- */}
    <div
      className={`flex  justify-between py-3 px-1 sm:px-5 items-center h-24 border-b-2 w-5/6 m-auto  border-black mb-12`}
    >
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <h1 className="font-sans text-2xl sm:text-3xl font-bold sm:font-bold tracking-tighter">
          Create your posts
        </h1>
        </div>
       
        <div className="flex items-center gap-1 md:hidden">
        <div className="flex items-center gap-3 mt-1 relative">
              <input value={searchData} onChange={(e) => setSearchData(e?.target?.value?.trim())} className={`border-black ${searchOpen ? "w-32" : "w-0 opacity-0"} border absolute right-9 transition-width duration-500 ease-in-out  px-2 py-1`} type="text" />
              <div><img className="h-7 w-7 cursor-pointer" onClick={searchUser} src={search} alt="search-icon" />
              </div>
            </div>
          <div>
        <img
          className="h-8 w-8"
          src={burger}
          alt="burger-icon"
          onClick={() => setIsClose((prev) => !prev)}
            />
            </div>
      </div>
      <div
        className={`fixed flex top-0 ease-linear transition-all z-10 duration-500  ${
          isClose ? "right-[-100%]" : "right-0"
        } h-screen  w-1/2 gap-5 `}
        >
          {/* Burger menu */}
        <div>
          <img
            src={close}
            className="h-8 w-8"
            alt="close-icon"
            onClick={() => setIsClose((prev) => !prev)}
          />
        </div>
        <div  className="flex flex-col gap-5 py-10 pl-10 bg-white w-full h-screen">
          {isUser ? (
            <>
              <p
                onClick={() => navigate(`/user/profile/userId=${userId}`)}
                className="font-sans font-semibold text-lg underline hover:text-blue-600 "
              >
                Profile
              </p>
              <p
                onClick={() => navigate("/user/create_post")}
                className="font-sans font-semibold text-lg underline hover:text-blue-600"
              >
                Create post
              </p>
              <p onClick={toggleLogoutDiv} className="font-sans font-semibold text-lg underline hover:text-blue-600">
                Logout
              </p>
            </>
          ) : (
            <>
              <p
                onClick={() => navigate("/user/login")}
                className="font-sans font-semibold text-lg underline hover:text-blue-600 "
              >
                Login
              </p>
              <p
                onClick={() => navigate("/user/register")}
                className="font-sans font-semibold text-lg underline hover:text-blue-600 "
              >
                Register
              </p>
            </>
          )}
        </div>
      </div>
      {isUser ? (
          <div className=" gap-3 hidden items-center md:flex">
            <div className="flex items-center gap-3 mt-1 relative">
              <input value={searchData} onChange={(e) => setSearchData(e?.target?.value?.trim())} className={`border-black ${searchOpen ? "w-32" : "w-0 opacity-0"} border absolute right-9 transition-width duration-500 ease-in-out  px-2 py-1`} type="text" />
              <div><img className="h-8 w-8 cursor-pointer" onClick={searchUser} src={search} alt="search-icon" />
              </div>
            </div>
          <div
             onClick={() => navigate(`/user/profile/userId=${userId}`)}
            className=" border border-black rounded-full flex justify-center items-center h-9 w-9 hover:bg-gray-200 cursor-pointer "
          >
            <span>{avatar}</span>
          </div>
          <button
            onClick={() => navigate("/user/create_post")}
            className=" border border-black px-3 h-9 hover:bg-gray-200 "
          >
            Create post
          </button>
          <button onClick={toggleLogoutDiv} className=" border border-black px-3 h-9 hover:bg-gray-200">
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
      </>
  );
};

export default Navigation;
