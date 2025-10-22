import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../context/authContext'
import './auth.css';
import logo from '../../assets/logo.png';



export default function Login() {
    const navigate = useNavigate();
    const { handleLogin, error } = useAuth();

    // Form state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Loader
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Call backend signup API
            const credentials = { email: formData.email, password: formData.password };
            await handleLogin(credentials);
            // Redirect to chat page after successful signup
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="">
                    <img src={logo} alt="Loading" className="logo" />
                </div>
                <h2 className="auth-title">
                    Sign in to continue your conversations
                </h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="auth-input"
                        />
                    </div>

                    <div className="auth-field">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="auth-input"
                        />
                    </div>

                    {error && (
                        <div className="auth-error">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="auth-button"
                    >
                        {isLoading ? (
                            <span className="fas fa-spinner fa-spin"></span>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                    <div className="auth-footer">
                        <span>New to ChatterAI? </span>
                        <Link to="/signup">Create account</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
