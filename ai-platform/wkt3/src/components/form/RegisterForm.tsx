"use client";
import { useState } from "react";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  // Password validation checks
  const passwordValid = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isFormValid =
    Object.values(passwordValid).every(Boolean) && agree && name && email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registered successfully (Backend coming next step)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900"
    >
      <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)]">
        Create your WKT3 Account
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      {/* Password */}
      <div className="relative mb-3">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-2 text-sm"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Password Requirements */}
      <ul className="text-sm mb-3 text-gray-600 dark:text-gray-300">
        <li className={passwordValid.length ? "text-green-600" : ""}>
          ✓ At least 6 characters
        </li>
        <li className={passwordValid.upper ? "text-green-600" : ""}>
          ✓ One uppercase letter
        </li>
        <li className={passwordValid.lower ? "text-green-600" : ""}>
          ✓ One lowercase letter
        </li>
        <li className={passwordValid.number ? "text-green-600" : ""}>
          ✓ One number
        </li>
        <li className={passwordValid.special ? "text-green-600" : ""}>
          ✓ One special character
        </li>
      </ul>

      {/* Terms and Conditions */}
      <label className="flex items-center mb-4 text-sm">
        <input
          type="checkbox"
          className="mr-2"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        I agree to the{" "}
        <a href="/terms" className="underline text-[var(--primary-color)] ml-1">
          Terms and Conditions
        </a>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full p-2 rounded text-white transition ${
          isFormValid
            ? "bg-[var(--primary-color)] hover:opacity-90"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Register
      </button>
    </form>
  );
}
