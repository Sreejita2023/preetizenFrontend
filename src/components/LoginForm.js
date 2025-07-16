"use client";
import { useState } from "react";
import { useModal } from "../context/ModalContext";
export default function LoginForm() {
  const { closeModal, openModal ,setInfo,setCount,info,} = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        const data = await res.json();
          console.log("Login Success:", data);
          setInfo(data.user_id)
          localStorage.setItem(
            "user",
            JSON.stringify({ user_id: data.user_id })
          );
        closeModal();
      } else {
        const err = await res.json();
        alert(err.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-6">
      <h2 className="text-4xl font-bold text-center">Log In</h2>
      <p className="text-center text-gray-600">
        New to this site?{" "}
        <span
          className="text-black font-semibold cursor-pointer"
          onClick={() => openModal("signup")}
        >
          Sign Up
        </span>
      </p>

      <input
        type="email"
        placeholder="Email"
        className="border-b py-2 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border-b py-2 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <a href="#" className="text-sm underline">
        Forgot password?
      </a>

      <button type="submit" className="bg-gray-800 text-white py-3">
        Log In
      </button>
    </form>
  );
}
