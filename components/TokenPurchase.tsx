import { initiateCheckout } from '@/utils/checkout';

type Props = {
  userId: string;
};

export default function TokenPurchase({ userId }: Props) {
  const handlePurchase = () => {
    // Example: 100 tokens for $5
    initiateCheckout(userId, 5, 100).catch((err) => {
      // Optional: show a user notification
      console.error('Checkout failed:', err);
    });
  };

  return (
    <button
      onClick={handlePurchase}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Buy 100 Tokens 💳 $5
    </button>
  );
}
