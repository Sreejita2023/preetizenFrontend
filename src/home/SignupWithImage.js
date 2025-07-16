"use client";
import { useState } from "react";
import Image from "next/image";
export default function SignupWithImage() {
  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your form submit logic
    console.log("Form submitted:", form);
  };

  return (
    <section className="relative max-w-screen mx-20 md:mb-40 py-20">
      {/* Image */}
      <Image
        src="https://static.wixstatic.com/media/cf391b_81ca38dbefe5493b9fb739f5aa0ed5ca~mv2.jpg"
        alt="Sign Up Background"
        width={640}
        height={460}
        className="max-w-[640px] max-h-[460px] object-cover rounded-md shadow-md"
      />

      {/* Signup Form Card */}
      <div className="md:absolute md:top-80 md:left-120 bg-white shadow-xl rounded-lg p-8 max-w-sm w-full mt-10 md:mt-0">
        <h3 className="text-xl font-semibold mb-6 tracking-widest">
          SIGNUP FOR UPDATES
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">First name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
