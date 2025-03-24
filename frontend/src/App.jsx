import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { UserData } from "./context/UserContext";
import HomeSeeker from "./pages/HomeSeeker";
import JobseekerRegister from "./pages/JobseekerRegister";
import Verify from "./pages/Verify"

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
            <Route path="/verify/:token" element={<Verify />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
