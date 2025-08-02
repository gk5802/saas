"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    const token = cookie?.split("=")[1];

    if (!token) return router.push("/auth/login");

    // Just simulate lookup here (actual validation is in middleware)
    fetch("/api/role", {
      method: "POST",
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => router.push(`/dashboard/${data.role}`));
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <ThemeSwitcher />
    </div>
  );
}
