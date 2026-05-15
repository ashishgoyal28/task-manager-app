import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
  
      localStorage.setItem("token", res.data.token);

alert("Login Successful");

window.location.href = "/dashboard";
  
    } catch (error) {
      console.log(error);
  
      alert("Login Failed");
    }
  };

  return (
    <div className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
      }}
    >
      <h1>Login</h1>

      <form onSubmit={handleLogin} className="form"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <p>
  Don't have an account?{" "}
  <Link to="/register">
    Register
  </Link>
</p>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;