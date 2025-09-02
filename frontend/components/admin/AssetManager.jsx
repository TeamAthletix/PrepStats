export default function AssetManager() {
  return (
    <div>
      <h2>📦 Bulk Asset Operations</h2>
      <button onClick={() => fetch('/api/admin/renderAll')}>Render All Graphics</button>
      <button onClick={() => fetch('/api/admin/sendAll')}>Send All to Emails</button>
    </div>
  );
}
