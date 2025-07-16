"use client";
import { useState } from "react";
import { useModal } from "../context/ModalContext";

export default function SignupForm() {
  const { closeModal, openModal ,setInfo} = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (res.ok) {
        const data = await res.json();
         setInfo(data.id);
          console.log("Signup Success:", data);
          
          localStorage.setItem(
            "user",
            JSON.stringify({ user_id: data.id })
          );
        closeModal();
      } else {
        const err = await res.json();
        alert(err.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-6">
      <h2 className="text-4xl font-bold text-center">Sign Up</h2>
      <p className="text-center text-gray-600">
        Already a member?{" "}
        <span
          className="text-black font-semibold cursor-pointer"
          onClick={() => openModal("login")}
        >
          Log In
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

      <button type="submit" className="bg-gray-800 text-white py-3">
        Sign Up
      </button>
    </form>
  );
}
