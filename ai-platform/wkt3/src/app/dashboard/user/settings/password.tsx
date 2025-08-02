"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [message, setMessage] = useState("");

  async function handleChange(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/user/password", {
      method: "POST",
      body: JSON.stringify({ current, newPass }),
    });
    const data = await res.json();
    setMessage(data.message);
    if (data.otpSent) router.push("/auth/2fa");
  }

  return (
    <form onSubmit={handleChange} className="space-y-3">
      <h2 className="text-xl font-bold">Change Password</h2>
      <input
        type="password"
        placeholder="Current password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        className="p-2 border w-full"
      />
      <input
        type="password"
        placeholder="New password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        className="p-2 border w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Change
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
