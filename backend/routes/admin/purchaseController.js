const User = require('../models/User');

exports.purchaseAsset = async (req, res) => {
  const { userId, assetId, tokenCost } = req.body;
  const user = await User.findById(userId);

  if (user.tokens < tokenCost) return res.status(400).json({ error: 'Insufficient tokens' });

  user.tokens -= tokenCost;
  user.purchases.push({ assetId, unlocked: true, timestamp: new Date() });
  user.screenshotBlocked = false;

  await user.save();

  res.json({
    success: true,
    newTokenBalance: user.tokens,
    unlockedAssetUrl: `https://cdn.domain.com/assets/${assetId}_fullres.jpg`
  });
};
