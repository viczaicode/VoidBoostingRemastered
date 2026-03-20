import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Registration() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const { loginReg, errors } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== passwordAgain){
            alert("A jelszavak nem egyeznek!");
            return;
        }
        
        //Összegyűjtjük egyetlen objektumban az űrlap adatokat
        const adat = { 
            email: email,
            // A backend validáció `nickname` mezőt vár
            nickname: username,
            // A backend controller viszont `$request->name`-et használ a create-nél,
            // ezért ezt is adjuk meg ugyanazzal az értékkel.
            //name: username,
            password: password,
            password_confirmation: passwordAgain
        };

        // regisztráció kezelése
        loginReg(adat, "/register");
    }

    return (
        <div className="m-auto" style={{ maxWidth: "400px" }}>
            <h1 className="text-center">Regisztráció</h1>
            <form onSubmit={handleSubmit}>

                <div className="mb-3 mt-3">
                    <label className="form-label">Felhasználónév:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        placeholder="felhasználónév"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        placeholder="email"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Jelszó:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        placeholder="jelszó"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Jelszó újra:</label>
                    <input
                        type="password"
                        value={passwordAgain}
                        onChange={(e) => setPasswordAgain(e.target.value)}
                        className="form-control"
                        placeholder="jelszó újra"
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-success w-100">
                        Regisztráció
                    </button>

                    <p className="mt-2">
                        Már van fiókod?
                        <Link className="nav-link text-info" to="/">
                            Bejelentkezés
                        </Link>
                    </p>
                </div>

            </form>
        </div>
    );
}