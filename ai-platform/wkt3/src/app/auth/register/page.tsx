"use client";

import { useState } from "react";
import { registerUser } from "./actions";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    accept: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);

  const validatePassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{6,}$/.test(pwd);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.confirm)
      return setError("All fields are required.");

    if (!validatePassword(form.password))
      return setError(
        "Password must be 6+ chars, include upper/lowercase, number & special char."
      );

    if (form.password !== form.confirm)
      return setError("Passwords do not match.");

    if (!form.accept) return setError("You must accept terms and conditions.");

    const result = await registerUser(form);
    if (result?.error) setError(result.error);
    else setSuccess("Registration successful!");
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
      {success && <div className="text-green-500 mb-2 text-sm">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          type="email"
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          type={show ? "text" : "password"}
          label="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          toggle={() => setShow(!show)}
        />
        <Input
          type={show ? "text" : "password"}
          label="Confirm Password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
        />
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={form.accept}
            onChange={(e) => setForm({ ...form, accept: e.target.checked })}
            className="mr-2"
          />
          I accept the{" "}
          <a href="/terms" className="underline text-blue-600">
            terms & conditions
          </a>
        </label>
        <button
          type="submit"
          className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark transition"
        >
          Register
        </button>
      </form>
    </section>
  );
}
