import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import "./index.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwt_token");

  // If already logged in, redirect to /home
  if (jwtToken !== undefined) {
    return <Navigate to="/home" replace />;
  }

  const submitForm = async (event) => {
    event.preventDefault();

    const userData = { username, password };

    try {
      const response = await fetch(
        "https://jobby-41mg.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();
      console.log("🔁 Login response:", data);

      if (response.ok) {
        Cookies.set("jwt_token", data.token, { expires: 30 });
        navigate("/home", { replace: true });
      } else {
        setShowSubmitError(true);
        setErrorMsg(data.error || "Login failed");
      }
    } catch (error) {
      console.error("🔥 Fetch error:", error);
      setShowSubmitError(true);
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
