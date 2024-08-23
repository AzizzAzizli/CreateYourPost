import React, { useEffect, useState } from "react";
import Navigation from "../../components/Nav";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../services";
import { toast } from "react-toastify";
import views from "../../assets/icons/viewIcon.svg";
import { formatDate } from "../../utils";
const PostDetail = () => {
  const { id } = useParams();
  const [postId, setPostId] = useState("");
  const [postDetail, setPostDetail] = useState({});

  async function getDetail(postId) {
    const resData = await getPostDetail(postId);
    if (resData.status === 200) {
      setPostDetail(resData?.data[0]);
    } else {
      toast.error(resData.message);
    }
  }

  useEffect(() => {
    const linkId = id.split("=")[1];
    setPostId(linkId);
  }, [id]);

  useEffect(() => {
    if (postId) {
      getDetail(postId);
    }
  }, [postId]);

  return (
    <div className="h-screen">
      <Navigation />
      <div className="w-5/6 m-auto border-2 border-black h-3/4 p-7  overflow-y-auto">
        <div className="w-full flex flex-wrap justify-between gap-4 ">
          <div>
            <div className="flex flex-col mb-2">
              <p className=" text-xl font-medium">Author:</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-semibold  break-all">
                    {postDetail.author}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span>{postDetail.views}</span>{" "}
                  <img className="h-6" src={views} alt="view-icon" />{" "}
                  <span>{formatDate(postDetail.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-xl font-medium">Title:</p>
              <p className="text-3xl font-semibold  break-all">
                {postDetail.title}
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-xl font-medium">Description:</p>
              <p className="text-3xl font-semibold  break-all">
                {postDetail.description}
              </p>
            </div>
            <div className="flex flex-col mb-2">
              <p className=" text-xl font-medium">Content:</p>
              <p className="text-2xl font-sans font-medium break-all ">
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
