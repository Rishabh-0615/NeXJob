import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/register", {
        name,
        email,
        password,
      });
      toast.success(data.message);
      navigate(`/verify/${data.token}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setBtnLoading(false);
    }
  }

  async function verify(token, otp, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/verify/" + token, {
        otp
      });
      toast.success(data.message);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message);
      setBtnLoading(false);
    }
  }

  async function forgotUser(email, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/user/forgot", { email });
      toast.success(data.message);
      navigate(`/reset/${data.token}`);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Password reset request failed"
      );
    } finally {
      setBtnLoading(false);
    }
  }

  async function resetUser(token, otp, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`/api/user/reset/${token}`, {
        otp,
        password,
      });
      toast.success(data.message);
      navigate("/login-seeker");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/me");
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      console.log("User fetch error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchAdmin() {
    try {
      const { data } = await axios.get("/api/admin/meadmin");
      setAdmin(data);
      setIsAuthAdmin(true);
      setLoading(false);
    } catch (error) {
      console.log("Admin fetch error:", error);
    }
  }

  async function loginAdmin(email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post("/api/admin/admin-login", {
        email,
        password,
      });
      toast.success(data.message);
      setAdmin(data.admin);
      setIsAuthAdmin(true);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
    } finally {
      setBtnLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchAdmin();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        loginAdmin,
        registerUser,
        forgotUser,
        resetUser,
        btnLoading,
        isAuth,
        user,
        admin,
        loading,
        setIsAuth,
        setUser,
        setAdmin,
        isAuthAdmin,
        verify,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
