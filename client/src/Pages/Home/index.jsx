import React, { useEffect, useState } from "react";
import Navigation from "../../components/Nav";
import Posts from "../../components/Posts";
import { getAllPosts } from "../../services";
import { toast } from "react-toastify";

const Home = () => {
  const [posts, setPosts] = useState();

  async function getPosts() {
    const resData = await getAllPosts();
    // console.log(resData);
    if (resData.status === 200) {
      setPosts(resData.data);
    } else {
      toast.error(resData.message);
    }
  }
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="h-screen">
      <Navigation />
      <Posts data={posts} />
    </div>
  );
};

export default Home;
