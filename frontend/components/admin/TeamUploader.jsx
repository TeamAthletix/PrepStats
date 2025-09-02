import { useState } from 'react';

export default function TeamUploader() {
  const [csv, setCsv] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', csv);

    await fetch('/api/admin/uploadTeam', {
      method: 'POST',
      body: formData
    });
  };

  return (
    <div>
      <h2>📥 Upload Team CSV</h2>
      <input type="file" accept=".csv" onChange={(e) => setCsv(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
