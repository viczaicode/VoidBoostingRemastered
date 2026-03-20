import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Hibás e-mail vagy jelszó.");
    } finally {
      setSubmitting(false);
    }
  }

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

        {error && <div className="error-message">{error}</div>}

        <button className="btn btn-login" type="submit" disabled={submitting}>
          {submitting ? "Bejelentkezés..." : "Log in"}
        </button>
      </form>
      <p style={{ marginTop: "16px" }}>
        Don't have an account yet?{" "}
        <Link to="/register" style={{ color: "#7968c6" }}>
          Register here.
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;

