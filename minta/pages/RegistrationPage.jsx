import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      navigate("/login");
    } catch (err) {
      setError("A regisztráció nem sikerült. Ellenőrizd az adatokat.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <h2>Registration</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button className="btn btn-login" type="submit" disabled={submitting}>
          {submitting ? "Registering.." : "Register"}
        </button>
      </form>
      <p style={{ marginTop: "16px" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#7968c6" }}>
                Log in here.
              </Link>
            </p>
    </div>
  );
}

export default RegistrationPage;

