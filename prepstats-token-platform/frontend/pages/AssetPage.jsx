import { useState } from 'react';
import GraphicPreview from '../components/GraphicPreview';

export default function AssetPage({ asset, user }) {
  const [unlocked, setUnlocked] = useState(false);

  const handlePurchase = async () => {
    const res = await fetch('/api/purchase', {
      method: 'POST',
      body: JSON.stringify({
        userId: user.id,
        assetId: asset.id,
        tokenCost: asset.tokenCost
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await res.json();
    if (data.success) {
      setUnlocked(true);
      // Optionally update token balance in UI
    }
  };

  return (
    <>
      <GraphicPreview asset={asset} unlocked={unlocked} />
      {!unlocked && (
        <button onClick={handlePurchase}>
          Unlock for {asset.tokenCost} Tokens
        </button>
      )}
    </>
  );
}
