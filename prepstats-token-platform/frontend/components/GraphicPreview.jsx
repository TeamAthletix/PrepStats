export default function GraphicPreview({ asset, unlocked }) {
  return (
    <div className="preview-container">
      <img
        src={unlocked ? asset.fullResUrl : asset.previewUrl}
        className={unlocked ? "fullres" : "blurred"}
        alt="Player Graphic"
      />
      {!unlocked && (
        <div className="overlay">
          <p>🔒 Preview Only — Unlock with Tokens</p>
        </div>
      )}
    </div>
  );
}
