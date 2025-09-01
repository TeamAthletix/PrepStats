import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Simple demo login logic (replace with real backend later)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@prepstats.com" && password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, background: "#222", borderRadius: 8 }}>
      <h2 style={{ color: "#b3a369", marginBottom: 16 }}>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12, borderRadius: 4 }}
        />
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button type="submit" style={{ width: "100%", padding: 10, background: "#b3a369", color: "#000", border: "none", borderRadius: 4 }}>
          Login
        </button>
      </form>
    </div>
  );
}