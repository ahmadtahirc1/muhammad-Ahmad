"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => ({}));
    setError(data.error || "Login failed");
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6">
      <form onSubmit={handleSubmit} className="card w-full max-w-sm rounded-2xl p-8">
        <h1
          className="mb-6 text-xl font-medium"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Admin Login
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="mb-4 w-full rounded-lg border border-border bg-surface-hover px-4 py-2.5 text-sm outline-none focus:border-accent/50"
        />
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-full bg-foreground py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
