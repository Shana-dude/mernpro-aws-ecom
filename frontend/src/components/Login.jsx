import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../utils/api";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await fetch(`${API}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", email);

      alert("✅ Login successful");

      setIsLoggedIn(true);

      // ✅ REDIRECT BACK
      navigate(from, { replace: true });

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 w-80 rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-white-100 text-black w-full py-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
