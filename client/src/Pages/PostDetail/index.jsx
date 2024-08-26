import React, { useEffect, useState } from "react";
import Navigation from "../../components/Nav";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, getPostDetail, handleLike } from "../../services";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import views from "../../assets/icons/viewIcon.svg";
import close from "../../assets/icons/close.svg";
import dots from "../../assets/icons/dots.svg";
import heartfilled from "../../assets/icons/heartfilled.svg";
import heart from "../../assets/icons/heart.svg";
import { formatDate } from "../../utils";
const PostDetail = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState("");
  const [postDetail, setPostDetail] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [authorId, setAuthorId] = useState(JSON.parse(localStorage.getItem("user"))?.userId)
  const [isAuthor, setIsAuthor] = useState(false)
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [token, setToken] = useState(Cookies?.get("token")||"");
  const [isLiked, setIsLiked] = useState(false);
  const [likenumber, setLikenumber] = useState(0);
  const [userId,setUserId] = useState(JSON.parse(localStorage.getItem("user"))?.userId)

  async function updateLikes(postId, userId, token) {
    const resData = await handleLike(postId, userId, token);
    if (resData?.status === 200) {
      setIsLiked((prev) => !prev);
      if (isLiked) {
        setLikenumber((prev) => prev - 1);
      } else {
        setLikenumber((prev) => prev + 1);
      }
    } else {
      toast.error(resData?.message);
    }
  }

  useEffect(() => {

      setIsLiked(postDetail?.likes?.includes(userId));
      setLikenumber(postDetail?.likenum);

  }, [postDetail?.likes]);


  async function getDetail(postId) {
    const resData = await getPostDetail(postId);
    if (resData.status === 200) {
      setPostDetail(resData?.data[0]);
    } else {
      toast.error(resData.message);
    }
  }
  async function deleteCurrentPost(postId) {
    const resData = await deletePost(postId)
    if (resData.status === 200) { 
      toast.success("Post deleted successfully!")
      toggleModalDiv()
      navigate("/user/profile")
    } else {
      toast.error(resData.message);
    }
    
  }
  useEffect(() => {
    if (postDetail?.userId !== authorId) {
      setIsAuthor(false)
      return
    }
    setIsAuthor(true)
  },[postDetail,authorId])

  useEffect(() => {
    const linkId = id.split("=")[1];
    setPostId(linkId);
  }, [id]);

  useEffect(() => {
    if (postId) {
      getDetail(postId);
    }
  }, [postId]);


  const toggleMenu = () => {
    setIsMenuOpen((prev)=>!prev);
  };

  function toggleModalDiv() {
    setIsModalOpen((prev) => !prev)
    setIsMenuOpen(false)
 
  }
  return (
    <div className="h-screen">
      <Navigation />
      {/* Modal div */}
      <div className={`bg-white h-44 fixed z-10 flex flex-col w-2/3 sm:w-1/3 p-3 border border-black  transition-all duration-500 top-[50%] ${isModalOpen?" right-[50%] ":" right-[-100%] "}  transform translate-x-1/2 -translate-y-1/2`}>
        <div onClick={toggleModalDiv} className="fixed top-0 right-0 "><img className="h-8 w-8 cursor-pointer" src={close} alt="close-icon" /></div>
        <div className="text-center font-semibold text-xl border-b border-black pb-3"><p>Are you sure?</p>
        </div>
        <div className="flex h-full gap-5  justify-center items-center"><button onClick={()=>deleteCurrentPost(postId)}  className="border border-black py-1 w-1/3 hover:bg-green-400">Yes</button> <button onClick={toggleModalDiv} className="border border-black py-1 w-1/3 hover:bg-red-400">No</button></div>
      </div>
      <div className="w-5/6 m-auto border-2 border-black h-3/4 p-7  overflow-y-auto  relative">
        {/* Three dots */}
        <div className={`${isAuthor?"":"hidden"}`} ><img onClick={toggleMenu} className="h-8 w-8 absolute top-2 right-2 cursor-pointer" src={dots} alt="dots-icon" /></div>
       {/* Delete and Edit div */}
        <div className={`absolute flex flex-col py-5 px-7 border border-gray-300 shadow-md gap-3 right-5 top-10 bg-white transition-all duration-300 transform ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}> <button onClick={toggleModalDiv} className="hover:text-red-400">Delete</button>
          <button onClick={()=>navigate(`/user/posts/edit/postId=${postId}`)} className="hover:text-green-400">Edit</button></div>
        {/* Body of detail */}
        <div className="w-full ">
          <div>
            <div className="flex flex-col mb-2">
             <div className="flex items-center justify-between"><p className=" text-lg sm:text-xl font-medium">Author:</p>  <div className="flex items-center gap-2">
          <span className="text-xl">{likenumber}</span>
          <div>
            <img
              onClick={() => updateLikes(postDetail?._id, userId, token)}
              className="h-7 w-7 cursor-pointer"
              src={isLiked ? heartfilled : heart}
              alt="like-icon"
            />
          </div>
        </div></div> 
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center  gap-2">
                  <p className="text-xl sm:text-3xl  font-semibold  break-all">
                    {postDetail.author}
                  </p>
                  <span onClick={()=>navigate(`/user/profile/userId=${postDetail?.userId}`)} className="font-bold text-sm sm:text-lg cursor-pointer hover:text-blue-500">{ "-->"}</span>
                </div>
                <div className="flex gap-2">
                  <span>{postDetail.views}</span>{" "}
                  <img className="h-6" src={views} alt="view-icon" />{" "}
                  <span>{formatDate(postDetail.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-lg sm:text-xl font-medium">Title:</p>
              <p className="text-xl sm:text-3xl font-semibold  break-all">
                {postDetail.title}
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-lg sm:text-xl font-medium">Description:</p>
              <p className="text-xl sm:text-3xl  font-semibold  break-all">
                {postDetail.description}
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-lg sm:text-xl font-medium">Content:</p>
              <p className="text-xl sm:text-2xl font-sans font-medium break-all ">
                {postDetail.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
