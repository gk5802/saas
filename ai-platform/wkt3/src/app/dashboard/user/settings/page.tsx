"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/user/name", {
      method: "POST",
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border"
        />
        <button type="submit" className="px-4 py-2 bg-black text-white">
          Update
        </button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
