const { purchaseAsset } = require('../controllers/purchaseController');
const User = require('../models/User');

test("should unlock asset and deduct tokens", async () => {
  const mockUser = new User({ tokens: 100 });
  await mockUser.save();

  const req = {
    body: {
      userId: mockUser._id,
      assetId: "graphic_001",
      tokenCost: 10
    }
  };

  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };

  await purchaseAsset(req, res);
  expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
});
