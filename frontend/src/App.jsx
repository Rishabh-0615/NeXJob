import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { UserData } from "./context/UserContext";
import HomeSeeker from "./pages/HomeSeeker";
import JobseekerRegister from "./pages/JobseekerRegister";
import Verify from "./pages/Verify"
import JobSeekerLogin from "./pages/JobSeekerLogin";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import JobRecruiterRegister from "./pages/JobRecruiterRegister";
import AdminLogin from "./pages/AdminLogin";
import VerifyRecruiter from "./pages/VerifyRecruiter";

const App = () => {
  const { loading, isAuth, user } = UserData(); 

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {/* {isAuth && <Navbar user={user} />} */}
          <Routes>
            <Route path="/" element={<HomeSeeker />} />
            <Route path="/register-seeker" element={<JobseekerRegister />} />
            <Route path="/register-recruiter" element={<JobRecruiterRegister />} />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path='/login-seeker' element={<JobSeekerLogin />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/reset/:token' element={<Reset />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/admin' element={<VerifyRecruiter />} />

          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
