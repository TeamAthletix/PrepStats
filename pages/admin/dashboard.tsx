import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();

  // Protection placeholder (add real auth later)
  useEffect(() => {
    // Here you can check if the admin is logged in, otherwise redirect to login
    // For now, this does nothing (demo only)
  }, []);

  return (
    <div style={{ padding: "2rem", color: "#fff", background: "#222", minHeight: "100vh" }}>
      <h1 style={{ color: "#b3a369" }}>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users, view stats, and configure PrepStats.</p>
      {/* Add dashboard features/components here */}
    </div>
  );
}