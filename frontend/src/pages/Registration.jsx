import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Registration() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const { loginReg, errors } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        if (password !== passwordAgain) {
            setError("Passwords do not match!");
            setSubmitting(false);
            return;
        }
        
        try {
            const adat = { 
                email: email,
                nickname: username,
                password: password,
                password_confirmation: passwordAgain
            };

            await loginReg(adat, "/register");
            navigate("/bejelentkezes");
        } catch (err) {
            setError("Registration failed. Please check your data.");
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
                            <i className="fas fa-user-plus"></i>
                        </div>
                        <h1>Create Account</h1>
                        <p>Join VoidBoosting and start your journey</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">
                                <i className="fas fa-user"></i>
                                Username
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose your username"
                                required
                            />
                        </div>

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
                                placeholder="Create a strong password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_confirmation">
                                <i className="fas fa-lock"></i>
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={passwordAgain}
                                onChange={(e) => setPasswordAgain(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        {(error || errors) && (
                            <div className="error-message">
                                <i className="fas fa-exclamation-circle"></i>
                                {error || "An error occurred during registration."}
                            </div>
                        )}

                        <button className="btn btn-primary btn-large btn-full" type="submit" disabled={submitting}>
                            {submitting ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus"></i>
                                    Create Account
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
                            Already have an account?{" "}
                            <Link to="/bejelentkezes" className="auth-link">
                                Sign In
                            </Link>
                        </p>
                        <p>
                            By creating an account, you agree to our{" "}
                            <Link to="/support" className="auth-link">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/support" className="auth-link">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}