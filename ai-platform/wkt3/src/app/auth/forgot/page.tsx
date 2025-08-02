"use client";

import { useState } from "react";
import { requestReset, resetPassword } from "./actions";
import Input from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [form, setForm] = useState({ email: "", code: "", newPass: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmail = async (e: any) => {
    e.preventDefault();
    setError("");
    const res = await requestReset(form.email);
    if (res.error) setError(res.error);
    else {
      setSuccess("Reset code sent to your email");
      setStep("code");
    }
  };

  const handleReset = async (e: any) => {
    e.preventDefault();
    setError("");
    const res = await resetPassword(form.email, form.code, form.newPass);
    if (res.error) setError(res.error);
    else {
      setSuccess("Password updated. Please login again.");
      // Optional: redirect to login after few secs
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
      {success && <div className="text-green-500 mb-2 text-sm">{success}</div>}
      <form
        onSubmit={step === "email" ? handleEmail : handleReset}
        className="space-y-4"
      >
        {step === "email" ? (
          <Input
            type="email"
            label="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        ) : (
          <>
            <Input
              label="Reset Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
            />
            <Input
              type="password"
              label="New Password"
              value={form.newPass}
              onChange={(e) => setForm({ ...form, newPass: e.target.value })}
            />
          </>
        )}
        <button
          type="submit"
          className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark transition"
        >
          {step === "email" ? "Send Reset Code" : "Set New Password"}
        </button>
      </form>
    </section>
  );
}
