import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext'
import './auth.css';

export default function Logout() {
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    async function logout() {
        try {
            await handleLogout();
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <button
            className="auth-button"
            onClick={logout}
        >
            Logout
        </button>
    );
}
