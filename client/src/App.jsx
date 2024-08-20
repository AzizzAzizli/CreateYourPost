import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register/> } />
        
        
     </Routes>
    </>
  );
}

export default App;
