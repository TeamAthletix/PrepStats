const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const tokenAmount = parseInt(session.metadata.tokenAmount);

    const user = await User.findById(userId);
    user.tokens += tokenAmount;
    await user.save();
  }

  res.status(200).json({ received: true });
};
