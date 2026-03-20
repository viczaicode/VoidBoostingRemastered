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
            setError("Hibás e-mail vagy jelszó.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <h2>Log in</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {(error || errors) && <div className="error-message">{error || "Hiba történt a bejelentkezés során."}</div>}

                <button className="btn btn-login" type="submit" disabled={submitting}>
                    {submitting ? "Bejelentkezés..." : "Log in"}
                </button>
            </form>
            <p>
                Don't have an account yet?{" "}
                <Link to="/regisztracio" style={{ color: "#7968c6" }}>
                    Register here.
                </Link>
            </p>
        </div>
    );
}