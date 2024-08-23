import React, { useState } from "react";
import Navigation from "../../components/Nav";
import { toast } from "react-toastify";
import { createNewPost } from "../../services";
import Cookies from "js-cookie";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    content: "",
    userId: JSON?.parse(localStorage.getItem("user"))?.userId,
    author:JSON?.parse(localStorage.getItem('user'))?.fullname
  });

  async function createPost(e) {
    e.preventDefault();
    const { title, description, content } = postData;
    if (!title || !description || !content) {
      toast.warning("Please fill the all fields!");
      return;
    } else {
      const token = Cookies.get("token");
      const resData = await createNewPost(postData, token);
      console.log(resData);
      
      if (resData.status === 201) {
        toast.success(resData.message);
        setPostData({
          title: "",
          description: "",
          content: "",
          userId: JSON?.parse(localStorage.getItem("user"))?.userId,
        });

        return;
      } else {
        toast.error(resData.message);
      }
    }
  }
  return (
    <div className="h-screen">
      <Navigation />
      <div className="border border-black w-2/3 sm:w-1/2 m-auto p-5 ">
        <div>
          <form onSubmit={createPost}>
            <div className="flex flex-col mb-3 ">
              <label htmlFor="title" className="font-semibold text-lg mb-2">
                Title
              </label>
              <input
                value={postData.title}
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                id="title"
                name="title"
                className="border border-black p-1"
                type="text"
              />
            </div>
            <div className="flex flex-col mb-3 ">
              <label
                htmlFor="description"
                className="font-semibold text-lg mb-2"
              >
                Description
              </label>
              <input
                required
                value={postData.description}
                onChange={(e) =>
                  setPostData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                id="description"
                name="description"
                className="border border-black p-1"
                type="text"
              />
            </div>
            <div className="flex flex-col mb-3 ">
              <label htmlFor="content" className="font-semibold text-lg mb-2">
                Content
              </label>
              <textarea
                required
                value={postData.content}
                onChange={(e) =>
                  setPostData((prev) => ({ ...prev, content: e.target.value }))
                }
                id="content"
                name="content"
                className="border border-black p-1"
                type="text"
              />
            </div>
            <button
              type="submit"
              className="border mt-3 border-black w-full py-2 hover:bg-blue-500 hover:text-white font-semibold"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
