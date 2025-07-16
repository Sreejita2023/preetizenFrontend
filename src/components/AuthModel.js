"use client";
import { useModal } from "../context/ModalContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal() {
  const { modalType, closeModal } = useModal();

  if (!modalType) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto p-6">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-black cursor-pointer"
      >
        &times;
      </button>

      <div className="max-w-md mx-auto pt-20">
        {modalType === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
