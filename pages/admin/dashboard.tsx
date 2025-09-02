import { useState } from "react";

const stats = [
  { label: "Total Users", value: 9 },
  { label: "Total Stats", value: 46 },
  { label: "Verified Stats", value: 39 },
  { label: "Pending Requests", value: 0 },
  { label: "Total Revenue", value: "$40.00" },
  { label: "Active Ads", value: 0 },
];

const tabs = [
  "Users",
  "Stats",
  "School Requests",
  "Ad Management",
  "Grace Period",
  "Games",
  "Test Accounts"
];

const users = [
  { name: "Robert Smith", email: "test@statsverified.me", role: "athlete", school: "—", joined: "Aug 9, 2025" },
  { name: "John Mitch", email: "jab2u@icloud.com", role: "athlete", school: "—", joined: "Aug 7, 2025" },
  { name: "Hayden Woodford", email: "hayden.woodford@outlook.com", role: "athlete", school: "—", joined: "Aug 6, 2025" },
  { name: "Brayden Lawson", email: "brayden.lawson12@icloud.com", role: "athlete", school: "—", joined: "Aug 6, 2025" },
  { name: "Eric Johnson", email: "gcoastathletics@gmail.com", role: "athlete", school: "—", joined: "Aug 6, 2025" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#171717",
      color: "#fff",
      fontFamily: "Inter, Arial, sans-serif",
      padding: "2rem 0"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>
        <h1 style={{
          color: "#b3a369",
          marginBottom: 20,
          fontWeight: 700,
          fontSize: "2.4rem"
        }}>
          Admin Dashboard
        </h1>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "1.2rem",
          marginBottom: "2.2rem"
        }}>
          {stats.map(stat => (
            <div key={stat.label}
              style={{
                background: "#222",
                borderRadius: 12,
                padding: "1.2rem 0.8rem",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,.07)"
              }}
            >
              <div style={{ fontSize: "2.1rem", fontWeight: 600, color: "#b3a369" }}>{stat.value}</div>
              <div style={{ fontSize: "1rem", color: "#ccc", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.6rem",
          borderBottom: "2px solid #232323",
          paddingBottom: "0.5rem"
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              style={{
                background: "none",
                border: "none",
                color: activeTab === tab ? "#b3a369" : "#ccc",
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: "1.07rem",
                padding: "0.4rem 1.2rem",
                borderBottom: activeTab === tab ? "2px solid #b3a369" : "2px solid transparent",
                cursor: "pointer"
              }}
              onClick={() => setActiveTab(tab)}
            >{tab}</button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Users" && (
          <section>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#fff" }}>User Management</h2>
            <div style={{
              background: "#222",
              borderRadius: 8,
              padding: "1.2rem",
              boxShadow: "0 2px 8px rgba(0,0,0,.05)"
            }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "1rem"
              }}>
                <thead>
                  <tr style={{ background: "#171717", color: "#b3a369" }}>
                    <th style={{ textAlign: "left", padding: "0.8rem 0.5rem" }}>Name</th>
                    <th style={{ textAlign: "left", padding: "0.8rem 0.5rem" }}>Email</th>
                    <th style={{ textAlign: "left", padding: "0.8rem 0.5rem" }}>Role</th>
                    <th style={{ textAlign: "left", padding: "0.8rem 0.5rem" }}>School</th>
                    <th style={{ textAlign: "left", padding: "0.8rem 0.5rem" }}>Joined</th>
                    <th style={{ textAlign: "left", padding: "0.8rem 0.5rem" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.email} style={{ borderBottom: "1px solid #232323" }}>
                      <td style={{ padding: "0.7rem 0.5rem" }}>{user.name}</td>
                      <td style={{ padding: "0.7rem 0.5rem" }}>{user.email}</td>
                      <td style={{ padding: "0.7rem 0.5rem", color: "#b3a369", fontWeight: 500 }}>{user.role}</td>
                      <td style={{ padding: "0.7rem 0.5rem" }}>{user.school}</td>
                      <td style={{ padding: "0.7rem 0.5rem" }}>{user.joined}</td>
                      <td style={{ padding: "0.7rem 0.5rem", display: "flex", gap: "0.5rem" }}>
                        <button style={{
                          padding: "0.3rem 0.7rem",
                          borderRadius: 6,
                          background: "#b3a369",
                          border: "none",
                          color: "#222",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}>Edit</button>
                        <button style={{
                          padding: "0.3rem 0.7rem",
                          borderRadius: 6,
                          background: "#222",
                          border: "1px solid #b3a369",
                          color: "#b3a369",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}>Change Role</button>
                        <button style={{
                          padding: "0.3rem 0.7rem",
                          borderRadius: 6,
                          background: "#9c2b2b",
                          border: "none",
                          color: "#fff",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "Users" && (
          <section style={{
            background: "#222",
            borderRadius: 8,
            padding: "2rem",
            color: "#ccc",
            textAlign: "center"
          }}>
            <span style={{ fontSize: "1.2rem" }}>
              <strong>{activeTab}</strong> management coming soon...
            </span>
          </section>
        )}
      </div>
    </div>
  );
}