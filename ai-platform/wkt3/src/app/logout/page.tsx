"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    document.cookie = "auth=; Max-Age=0; path=/"; // clear token
    router.push("/auth/login");
  }, [router]);

  return <p className="p-4 text-center">Logging out...</p>;
}
