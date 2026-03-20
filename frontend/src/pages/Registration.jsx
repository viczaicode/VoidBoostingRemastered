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
            setError("A jelszavak nem egyeznek!");
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
            setError("A regisztráció nem sikerült. Ellenőrizd az adatokat.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <h2>Registration</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                        id="name"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

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

                <div className="form-group">
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        required
                    />
                </div>

                {(error || errors) && <div className="error-message">{error || "Hiba történt a regisztráció során."}</div>}

                <button className="btn btn-login" type="submit" disabled={submitting}>
                    {submitting ? "Registering.." : "Register"}
                </button>
            </form>
            <p>
                Already have an account?{" "}
                <Link to="/bejelentkezes" style={{ color: "#7968c6" }}>
                    Log in here.
                </Link>
            </p>
        </div>
    );
}