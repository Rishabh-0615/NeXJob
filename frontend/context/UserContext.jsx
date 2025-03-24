import axios from 'axios';
import { createContext,useContext,useEffect,useState } from 'react';
import toast from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) =>{
    const [user,setUser] =useState([]);
    const [isAuth,setIsAuth] = useState(false);
    const [btnLoading,setBtnLoading] = useState(false);
    const [admin,setAdmin] = useState([]);
    const [isAuthAdmin,setIsAuthAdmin] = useState(false);
    const [loading,setLoading] = useState(true);


    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/login", { email, password });
            toast.success(data.message);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate(`/jobseeker`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            setBtnLoading(false);
        }
    }
    async function registerUser(name, email, mobile, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/register", { name, email, mobile, password });
            toast.success(data.message);
            setBtnLoading(false);
            navigate(`/verify/${data.token}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
            setBtnLoading(false);
        }
    }

    async function forgotUser(email, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/user/forget", { email });
            toast.success(data.message);
            setBtnLoading(false);
            navigate(`/reset-password/${data.token}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset request failed");
            setBtnLoading(false);
        }
    }

    async function resetUser(token, otp, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`/api/user/reset-password/${token}`, { otp, password });
            toast.success(data.message);
            setBtnLoading(false);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Password reset failed");
            setBtnLoading(false);
        }
    }

    async function fetchUser() {
        try {
            const { data } = await axios.get("/api/user/me");
            setUser(data);
            setIsAuth(true);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    
    async function fetchAdmin() {
        try {
            const { data } = await axios.get("/api/admin/meadmin");
            setAdmin(data);
            setIsAuthAdmin(true);
        } catch (error) {
            console.log(error);
        }
    }


    async function loginAdmin(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post("/api/admin/admin-login", { email, password });
            toast.success(data.message);
            setUser(data.admin);
            setIsAuthAdmin(true);
            setBtnLoading(false);
            navigate("/admin");
        } catch (error) {
            toast.error(error.response?.data?.message || "Admin login failed");
            setBtnLoading(false);
        }
    }

    useEffect(()=>{
        fetchUser();
        fetchAdmin();
    },[]);

    return(
        <UserContext.Provider
          value={{
            loginUser,
            loginAdmin,
            btnLoading,
            isAuth,
            user,
            admin,
            loading,
            setIsAuth,
            setUser,
            registerUser,
            forgotUser,
            resetUser,
            setAdmin,
            isAuthAdmin
          }}    
        >
            {children}
        </UserContext.Provider>
    );
};
export const Userdata = () => useContext(UserContext);