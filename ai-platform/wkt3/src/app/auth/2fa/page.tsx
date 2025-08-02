"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TwoFAPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/user/verify-otp", {
      method: "POST",
      body: JSON.stringify({ otp }),
    });
    const data = await res.json();
    if (data.success) router.push("/dashboard/user");
    else setMessage(data.message);
  }

  return (
    <form onSubmit={handleVerify} className="space-y-3">
      <h2 className="text-xl font-bold">Enter 6-digit OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="p-2 border"
      />
      <button className="px-4 py-2 bg-green-700 text-white">Verify</button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
