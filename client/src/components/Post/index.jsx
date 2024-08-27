import React, { useEffect, useRef, useState } from "react";
import viewIcon from "../../assets/icons/viewIcon.svg";
import { useNavigate } from "react-router-dom";
import { addComment, getComment, handleLike, updateViews } from "../../services";
import { truncateTitle } from "../../utils";
import heartfilled from "../../assets/icons/heartfilled.svg";
import heart from "../../assets/icons/heart.svg";
import comment from "../../assets/icons/comment.svg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CommentsModal from "../CommentsModal";

const PostCard = ({ title, description, views, _id, likes, likenum,commentsnum }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(Cookies?.get("token") || "");
  const [isLiked, setIsLiked] = useState(false);
  const [likenumber, setLikenumber] = useState(0);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("user"))?.userId
  );
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [commentData, setCommentData] = useState({
    name: JSON.parse(localStorage.getItem("user"))?.fullname,
    userId: JSON.parse(localStorage.getItem("user"))?.userId,
    comment: "",
  })
const [comments, setComments] = useState([]);
const [commentsnumber, setCommentsnumber] = useState(0)
const topRef = useRef(null)
  
  
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
    setCommentsnumber(commentsnum)
    setIsLiked(likes?.includes(userId));
    setLikenumber(likenum);
  }, [likes,commentsnum]);

  // console.log(likenum, isLiked, likes,likenumber);

  async function postClick() {
    const resData = await updateViews(_id);
    if (resData.status === 200) {
      navigate(`/user/posts/postId=${_id}`);
      return;
    } else {
      toast.error(resData.message);
      return;
    }
  }

  async function newComment(postId, data, token) {
    if (commentData?.comment.trim() === "") {
      toast.warning("Please enter a comment!")
      return
    }
    const resData = await addComment(postId, data, token);
    if (resData.status === 201) {
      toast.success(resData.message)
      setCommentsnumber(prev=>prev+1)
      setComments((prev) => ([resData?.data, ...prev]))
      topRef.current.scrollIntoView({ behavior: "smooth" });
      
      setCommentData({
        name: JSON.parse(localStorage.getItem("user"))?.fullname,
        userId: JSON.parse(localStorage.getItem("user"))?.userId,
        comment: "",
      })
    } else {
      toast.error(resData.message)
      return
    }
    
  }

  async function getPostComments(postId) {
    toggleCommentDiv()

    const resData = await getComment(postId)
    if (resData.status === 200) {
      setComments(resData.data)
      return
    } else {
      toast.error(resData.message)
      return
    }
    
  }
  function toggleCommentDiv() {
    setIsOpenComment(prev=>!prev)
  }

  return (
    
    
    <div className="border-2 border-black w-full sm:w-1/2  sm:-mx-4 p-2  md:p-3  ">
      <p className="font-bold text-2xl  ">{truncateTitle(title, 15)}</p>
      <p className="font-semibold text-xl max-h-16 overflow-y-auto">
        {truncateTitle(description, 30)}
      </p>
      <div className="flex justify-end gap-4 items-center">
        {" "}
        <div className="flex items-center gap-2">
          <span>{commentsnumber }</span>{" "}
          <div>
            <img
              onClick={()=>getPostComments(_id)}
              className="h-5 w-5 cursor-pointer"
              src={comment}
              alt="comment-icon"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>{likenumber}</span>
          <div>
            {" "}
            <img
              onClick={() => updateLikes(_id, userId, token)}
              className="h-5 w-5 cursor-pointer"
              src={isLiked ? heartfilled : heart}
              alt="like-icon"
            />
          </div>
        </div>{" "}
        <div className="flex gap-2 items-center">
          {views}
          <img  className="h-6" src={viewIcon} alt="view-icon" />
        </div>{" "}
        <p
          onClick={postClick}
          className="hover:text-blue-700 text-sm md:text-lg cursor-pointer"
        >
          Read more
        </p>
      </div>
        <CommentsModal commentData={commentData} comments={comments} isOpenComment={isOpenComment} newComment={newComment} postId={_id}
        setCommentData={setCommentData} toggleCommentDiv={toggleCommentDiv} token={token} topRef={topRef} />
      </div>
     
  );
};

export default PostCard;
