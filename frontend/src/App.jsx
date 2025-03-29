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

// General Pages

const App = () => {
  const { loading, isAuth, isAuthRecruiter, isAuthAdmin } = UserData();
  console.log(isAuth, isAuthRecruiter, isAuthAdmin);

  if (loading) return <Loading />;

  return (
    <BrowserRouter>
      {/* Dynamic Navbar */}
      {isAuth && <Navbar />}

      {!isAuth && !isAuthRecruiter && !isAuthAdmin && <Empty />}

      <Routes>
        {/* Home Route (Based on Authentication) */}
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

        {/* Authentication Routes */}
        <Route
          path="/register-seeker"
          element={
            isAuth || isAuthRecruiter ? <AllJobs /> : <JobseekerRegister />
          }
        />
        <Route
          path="/register-recruiter"
          element={
            isAuth || isAuthRecruiter ? <AllJobs /> : <JobRecruiterRegister />
          }
        />
        <Route
          path="/login-seeker"
          element={isAuth ? <AllJobs /> : <JobSeekerLogin />}
        />
        <Route
          path="/login-recruiter"
          element={isAuthRecruiter ? <MyJobs /> : <JobRecruiterLogin />}
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<VerifyRecruiter />} />

        {/* OTP & Verification */}
        <Route path="/verify/:token" element={<Verify />} />
        <Route path="/verifyRecruiter/:token" element={<VerifyR />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/forgot-recruiter" element={<ForgotRecruiter />} />
        <Route path="/reset/:token" element={<Reset />} />
        <Route path="/resetRecruiter/:token" element={<ResetRecruiter />} />

        {/* Job Seeker Routes */}
        <Route
          path="/alljobs"
          element={isAuth ? <AllJobs /> : <LandingPage />}
        />
        <Route
          path="/jobpost/:id"
          element={isAuth ? <JobPostDetailPage /> : <LandingPage />}
        />
        <Route
          path="/myapplication"
          element={isAuth ? <MyApplicationsPage /> : <LandingPage />}
        />
        <Route
          path="/seeker"
          element={isAuth ? <JobseekerProfile /> : <LandingPage />}
        />
        <Route
          path="/allapplication"
          element={isAuth ? <JobApplicationsPage /> : <LandingPage />}
        />
        <Route
          path="/allapplication/:id"
          element={isAuth ? <JobApplicationDetailsPage /> : <LandingPage />}
        />
        <Route
          path="/application/:id"
          element={isAuth ? <ApplicationDetailPage /> : <LandingPage />}
        />

        {/* Recruiter Routes */}
        <Route
          path="/homerecruiter"
          element={isAuthRecruiter ? <HomeRecruiter /> : <LandingPage />}
        />
        <Route
          path="/post"
          element={isAuthRecruiter ? <JobPosting /> : <LandingPage />}
        />
        <Route
          path="/myjobs"
          element={isAuthRecruiter ? <MyJobs /> : <LandingPage />}
        />
        <Route
          path="/edit/:id"
          element={isAuthRecruiter ? <EditJob /> : <LandingPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
