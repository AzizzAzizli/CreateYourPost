import React from "react";
import Navigation from "../../components/Nav";

const CreatePost = () => {
  return (
    <div className="h-screen">
      <Navigation />
      <div className="border border-black w-2/3 sm:w-1/2 m-auto p-5 ">
        <div>
          <div className="flex flex-col mb-3 ">
            <label htmlFor="title" className="font-semibold text-lg mb-2">Title</label>
            <input
              id="title"
              name="title"
              className="border border-black p-1"
              type="text"
            />
          </div>
          <div className="flex flex-col mb-3 ">
            <label htmlFor="description" className="font-semibold text-lg mb-2">Description</label>
            <input
              id="description"
              name="description"
              className="border border-black p-1"
              type="text"
            />
          </div>
          <div className="flex flex-col mb-3 ">
            <label htmlFor="content" className="font-semibold text-lg mb-2">Content</label>
            <textarea
              id="content"
              name="content"
              className="border border-black p-1"
              type="text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
