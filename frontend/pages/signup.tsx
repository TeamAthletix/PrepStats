// TODO: Implement frontend/pages/signup.tsx
import { useEffect, useState } from 'react';

export default function SchoolSelect({ onSelect, value }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/schools')
      .then(r => r.json())
      .then(setSchools)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <label htmlFor="school">Select your school:</label>
      <select
        id="school"
        value={value}
        onChange={e => onSelect(e.target.value)}
        disabled={loading}
      >
        <option value="">Choose...</option>
        {schools.map(s => (
          <option key={s.id} value={s.id}>
            {s.name} ({s.state})
          </option>
        ))}
      </select>
      {loading && <span>Loading schools...</span>}
    </div>
  );
}