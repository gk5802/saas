"use client";

import { useState } from "react";
import { startLogin, verify2FA } from "./actions";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState<"login" | "verify">("login");
  const [form, setForm] = useState({ email: "", password: "", code: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    const result = await startLogin(form.email, form.password);
    if (result?.error) setError(result.error);
    else setStep("verify");
  };

  const handle2FA = async (e: any) => {
    e.preventDefault();
    setError("");
    const result = await verify2FA(form.email, form.code);
    if (result?.error) setError(result.error);
    else {
      document.cookie = `auth=${result.token}; path=/`;
      router.push("/dashboard");
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {step === "login" ? "Login" : "Verify 2FA"}
      </h2>
      {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

      <form
        onSubmit={step === "login" ? handleLogin : handle2FA}
        className="space-y-4"
      >
        {step === "login" ? (
          <>
            <Input
              type="email"
              label="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              type="password"
              label="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </>
        ) : (
          <Input
            type="text"
            label="Enter 2FA Code"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
        )}
        <button
          type="submit"
          className="w-full bg-brand text-white py-2 rounded hover:bg-brand-dark transition"
        >
          {step === "login" ? "Continue" : "Verify"}
        </button>
      </form>
    </section>
  );
}
