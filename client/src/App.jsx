import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CreatePost from "./Pages/CreatePost";
import PostDetail from "./Pages/PostDetail";
import EditPost from "./Pages/EditPost";
import UserProfile from "./Pages/UsersProfile";
import Page404 from "./Pages/404";

function App() {
  return (
    <>
      <ToastContainer autoClose={750} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        {/* <Route path="/user/profile" element={<Profile />} /> */}
        <Route path="/user/profile/:id" element={<UserProfile />} />

        <Route path="/user/create_post" element={<CreatePost />} />
        <Route path="/user/posts/:id" element={<PostDetail />} />
        <Route path="/user/posts/edit/:id" element={<EditPost />} />
        <Route path="/*" element={<Page404/>} />

      </Routes>
    </>
  );
}

export default App;
