import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Email and password required");
      return;
    }

    try {
      const res = await fetch(`${API}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("✅ Registered successfully! Please login.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 w-80 rounded">
        <h2 className="text-xl font-bold mb-4">Register</h2>

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
          onClick={handleRegister}
          className="bg-white-100 text-black w-full py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}
