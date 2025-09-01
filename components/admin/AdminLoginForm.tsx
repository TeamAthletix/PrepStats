// Optional reusable component for login form (not required for basic flow)
import { useState } from "react";

export default function AdminLoginForm({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" style={{ width: "100%", padding: 10, background: "#b3a369", color: "#000", border: "none", borderRadius: 4 }}>
        Login
      </button>
    </form>
  );
}