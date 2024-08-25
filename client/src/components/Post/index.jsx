import React, { useEffect, useState } from "react";
import viewIcon from "../../assets/icons/viewIcon.svg";
import { useNavigate } from "react-router-dom";
import { handleLike, updateViews } from "../../services";
import { truncateTitle } from "../../utils";
import heartfilled from "../../assets/icons/heartfilled.svg";
import heart from "../../assets/icons/heart.svg";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const PostCard = ({
  title,
  description,
  views,
  _id,
  likes,
  likenum,
}) => {
  const navigate = useNavigate();
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

      setIsLiked(likes?.includes(userId));
      setLikenumber(likenum);

  }, [likes]);

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

  return (
    <div className="border-2 border-black w-full sm:w-1/2  sm:-mx-4 p-3  ">
      <p className="font-bold text-2xl  ">{truncateTitle(title, 15)}</p>
      <p className="font-semibold text-xl max-h-16 overflow-y-auto">
        {truncateTitle(description, 30)}
      </p>
      <div className="flex justify-end gap-4 items-center">
        {" "}
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
          <img className="h-6" src={viewIcon} alt="" />
        </div>{" "}
        <p onClick={postClick} className="hover:text-blue-700">
          Read more
        </p>
      </div>
    </div>
  );
};

export default PostCard;
