import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CreatePost from "./Pages/CreatePost";
import PostDetail from "./Pages/PostDetail";
import Navigation from "./components/Nav";

function App() {
  return (
    <>
      <ToastContainer autoClose={750} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/create_post" element={<CreatePost />} />
        <Route path="/user/posts/:id" element={<PostDetail/> } />
        
        
        
        
        
     </Routes>
    </>
  );
}

export default App;
