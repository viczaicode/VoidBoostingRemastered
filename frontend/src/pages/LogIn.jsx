import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { loginReg, errors } = useAuthContext("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const adat = {
                email: email,
                password: password,
            };
            
            await loginReg(adat, "/login");
            navigate("/");
        } catch (err) {
            setError("Invalid email or password.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <h1>Welcome Back</h1>
                        <p>Sign in to your VoidBoosting account</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">
                                <i className="fas fa-envelope"></i>
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <i className="fas fa-lock"></i>
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {(error || errors) && (
                            <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {error || "An error occurred during login."}
                            </div>
                        )}

                        <button className="btn btn-primary btn-large btn-full" type="submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-sign-in-alt"></i>
                                    Sign In
                                </>
                            )}
                        </button>

                        <div className="auth-divider">
                            <span>OR</span>
                        </div>

                        <button type="button" className="btn btn-secondary btn-large btn-full">
                            <i className="fab fa-discord"></i>
                            Continue with Discord
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/regisztracio" className="auth-link">
                                Create Account
                            </Link>
                        </p>
                        <p>
                            <Link to="/support" className="auth-link">
                                Forgot your password?
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}