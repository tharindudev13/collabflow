"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function TestLoginPage() {
  const [message, setMessage] = useState("");

  async function handleLogin() {
    try {
      const result = await signIn("credentials", {
        email: "tes@example.com",
        password: "TestPassword123",
        redirect: false,
      });

      if (result?.error) {
        setMessage("Login failed");
      } else {
        setMessage("Login successful!");
      }
    } catch {
      setMessage("Something went wrong");
    }
  }

  return (
    <div className="p-10">
      <button onClick={handleLogin}>
        Test Login
      </button>
      <p>{message}</p>
    </div>
  );
}