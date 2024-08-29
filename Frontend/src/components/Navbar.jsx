import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";

export default function Navbar() {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

    const navigateTo = useNavigate();

    const handleLogout = async () => {
        await axios
            .get("http://localhost:3000/api/v1/user/patient/logout", {
                withCredentials: true,
            })
            .then((res) => {
                toast.success(res.data.message);
                setIsAuthenticated(false);
            })
            .catch((err) => {
                toast.error(err.response.data.message);
            });
    };
    const goToLogin = async () => {
        navigateTo("/login");
    };
    return (
        <nav className="conatainer">
            <div className="logo">ZeeCare</div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
                <div className="links">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/appointment"}>Appointment</Link>
                    <Link to={"/about"}>About us</Link>
                </div>
                {isAuthenticated ? (
                    <button className="logoutBtn btn" onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <button className="logoutBtn btn" onClick={goToLogin}>
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
}
