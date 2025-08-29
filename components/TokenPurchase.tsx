// components/TokenPurchase.tsx
import { initiateCheckout } from '@/utils/checkout';

export default function TokenPurchase({ userId }: { userId: string }) {
  const handlePurchase = () => {
    initiateCheckout(userId, 500, 100); // $5 for 100 tokens
  };

  return (
    <button onClick={handlePurchase} className="bg-blue-600 text-white px-4 py-2 rounded">
      Buy 100 Tokens – $5
    </button>
  );
}
