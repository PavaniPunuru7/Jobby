import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(""); // clear previous error

    const userData = {
      username,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      let data;
      try {
        data = await response.json(); // try parsing JSON
      } catch (jsonErr) {
        console.error("❌ JSON parse failed:", jsonErr);
        setErrorMsg("Server returned invalid response.");
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        // ✅ Save token and go to /home
        Cookies.set("jwt_token", data.token, { expires: 30 });
        navigate("/home", { replace: true });
      } else {
        // ❌ Handle known errors (like "Username already exists")
        setErrorMsg(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("❌ Network or server error:", error);
      setErrorMsg("Something went wrong. Please try again later.");
    }

    setIsLoading(false);
  };

  return (
    <div className="signup-form-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
        <h1 className="signup-heading">Signup</h1>

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
            required
          />
        </div>

        <button className="login-button" type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>

        {errorMsg && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Signup;
