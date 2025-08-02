"use server";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirm: string;
  accept: boolean;
};

export async function registerUser(data: FormData) {
  // Simulate in-memory DB logic (later connect to Go DB)
  if (data.email === "test@taken.com") {
    return { error: "Email is already registered." };
  }

  // Generate a serial number (mock token logic)
  const serial =
    "SN-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  console.log("✅ Registered:", {
    name: data.name,
    email: data.email,
    serial,
    timestamp: new Date().toISOString(),
  });

  return { success: true };
}
