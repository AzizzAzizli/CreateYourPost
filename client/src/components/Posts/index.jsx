import React, { useState } from "react";
import PostCard from "../Post";

const Posts = ({ data, isProfile,name }) => {
  
  // const [name, setName] = useState(JSON.parse(localStorage.getItem("user"))?.fullname)
  return (
    <fieldset className="w-5/6 m-auto border-2 border-black h-3/4 p-7  overflow-y-auto">
     {isProfile&& <legend className="font-bold text-2xl">{name}'s posts</legend>}
      <div className="w-full flex flex-wrap justify-between gap-4 ">
        {/* <PostCard /> */}
        {data?.length>0 ? (
          data.map((post) => {
            return <PostCard key={post._id} {...post} />;
          })
        ) : (
          <p className="text-3xl m-auto font-bold  mt-5">No post</p>
        )}
      </div>
    </fieldset>
  );
};

export default Posts;
