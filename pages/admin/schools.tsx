// pages/admin/schools.tsx
import React from 'react';

interface School {
  [key: string]: string | number;
}

const schools: School[] = [
  { name: 'Lincoln High', state: 'AL', students: 1200 },
  { name: 'Jefferson Prep', state: 'AL', students: 950 },
  // Add more sample rows or inject real data
];

export default function SchoolsPage() {
  return (
    <div style={{ padding: '2rem', background: '#111', color: '#fff' }}>
      <h1 style={{ marginBottom: '1rem' }}>Schools in Alabama</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {Object.keys(schools[0]).map((key) => (
              <th key={key} style={{ padding: '0.7rem', borderBottom: '1px solid #333' }}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schools.map((school, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #232323' }}>
              {Object.values(school).map((value, i) => (
                <td key={i} style={{ padding: '0.7rem', color: '#fff' }}>
                  {value as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
