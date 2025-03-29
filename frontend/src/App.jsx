import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { UserData } from "./context/UserContext";
import HomeSeeker from "./pages/HomeSeeker";
import JobseekerRegister from "./pages/JobseekerRegister";
import Verify from "./pages/Verify";
import JobSeekerLogin from "./pages/JobSeekerLogin";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import JobRecruiterRegister from "./pages/JobRecruiterRegister";
import JobRecruiterLogin from "./pages/JobRecruiterLogin";
import AdminLogin from "./pages/AdminLogin";
import VerifyRecruiter from "./pages/VerifyRecruiter";
import ForgotRecruiter from "./pages/ForgotRecruiter";
import ResetRecruiter from "./pages/resetRecruiter";
import HomeRecruiter from "./pages/HomeRecruiter";
import JobPosting from "./pages/JobPosting";
import AllJobs from "./pages/AllJobs";
import MyJobs from "./pages/MyJobs";
import EditJob from "./pages/EditJob";
import JobPostDetailPage from "./pages/JobPostDetailPage";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import ApplicationDetailPage from "./pages/ApplicationDetailPage ";
import JobApplicationsPage from "./pages/JobApplicationsPage";
import Navbar from "./components/Navbar";
import Navbar1 from "./components/Navbar1";
import Empty from "./components/Empty";
import LandingPage from "./pages/Home";
import JobseekerProfile from "./pages/JobseekerProfile";
import VerifyR from "./pages/VerifyR";
import JobApplicationDetailsPage from "./pages/JobApplicationDetailsPage";

const App = () => {
  const { loading, isAuth, isAuthRecruiter, isAuthAdmin,setIsAuth,setIsAuthRecruiter } = UserData();
  console.log(isAuth,isAuthRecruiter,isAuthAdmin)



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          {isAuth && <Navbar/>}
          
          <Routes>
            <Route
              path="/"
              element={
                isAuthAdmin ? (
                  <VerifyRecruiter />
                ) : isAuth ? (
                  <AllJobs />
                ) : isAuthRecruiter ? (
                  <MyJobs />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="/register-seeker"
              element={
                isAuth ? (
                  <AllJobs />
                ) : isAuthRecruiter ? (
                  <MyJobs />
                ) : (
                  <JobseekerRegister />
                )
              }
            />
            <Route
              path="/register-recruiter"
              element={
                isAuth ? (
                  <AllJobs />
                ) : isAuthRecruiter ? (
                  <MyJobs />
                ) : (
                  <JobRecruiterRegister />
                )
              }
            />
            <Route
              path="/login-recruiter"
              element={
                isAuth ? (
                  <AllJobs />
                ) : isAuthRecruiter ? (
                  <MyJobs />
                ) : (
                  <JobRecruiterLogin />
                )
              }
            />
            <Route
              path="/login-seeker"
              element={
                isAuth ? (
                  <AllJobs />
                ) : isAuthRecruiter ? (
                  <MyJobs />
                ) : (
                  <JobSeekerLogin />
                )
              }
            />
            <Route path="/verify/:token" element={<Verify />} />
            <Route path="/verifyRecruiter/:token" element={<VerifyR />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/forgot-recruiter" element={<ForgotRecruiter />} />
            <Route path="/reset/:token" element={<Reset />} />
            <Route path="/resetRecruiter/:token" element={<ResetRecruiter />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<VerifyRecruiter />} />

            <Route path="/homerecruiter" element={<HomeRecruiter />} /> 
         
            <Route path="/post" element={isAuthRecruiter ? <JobPosting /> : <LandingPage />} />
            <Route path="/alljobs" element={isAuth?<AllJobs />:<LandingPage/>} />
            <Route path="/jobpost/:id" element={isAuth ? <JobPostDetailPage /> : <LandingPage />} />
            <Route path="/myjobs" element={isAuthRecruiter ? <MyJobs /> : <LandingPage />} />
            <Route path="/edit/:id" element={isAuthRecruiter ? <EditJob /> : <LandingPage />} />
            <Route path="/myapplication" element={isAuth ? <MyApplicationsPage /> : <LandingPage />} />
            <Route path = "/seeker" element={isAuth ? <JobseekerProfile /> : <LandingPage /> } />
            <Route path="/allapplication" element={ isAuthRecruiter ? <JobApplicationsPage /> : <LandingPage />} />
            <Route
              path="/allapplication/:id"
              element={isAuthRecruiter ? <JobApplicationDetailsPage /> : <LandingPage />}
            />

            <Route
              path="/application/:id"
              element={isAuth? <ApplicationDetailPage /> : <LandingPage /> }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
