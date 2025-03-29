import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { LogOut } from "lucide-react";
import { UserData } from "../context/UserContext";

const Navbar1 = () => {
  const {setIsAuth,setUser,isAuth,setIsAuthRecruiter} =UserData()
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get("/api/recruiter/logout");
      toast.success(data.message);
      setUser([]);
      setIsAuthRecruiter(false);
      navigate("/");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-900/30 bg-blue-600 backdrop-blur supports-[backdrop-filter]:bg-blue-900">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <div className="absolute inset-[2px] rounded-full bg-black flex items-center justify-center text-blue-400 font-bold">
              N
            </div>
          </div>
          <span className="text-xl font-bold text-white">NeXJob</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 mr-6">
          <a
            href="/alljobs"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
          >
            Home
          </a>
          <a
            href="/myapplication"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
          >
            My Applications
          </a>
          <a
            href="/seeker"
            className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
          >
            Profile
          </a>
         
        </nav>
        <button
          onClick={logoutHandler}
          className="w-full lg:w-auto px-4 py-2 text-sm border border-blue-800 text-gray-300 hover:text-blue-400 hover:bg-blue-900/20 rounded-md flex items-center transition-colors"
        >
          <LogOut className="mr-2" />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar1;
