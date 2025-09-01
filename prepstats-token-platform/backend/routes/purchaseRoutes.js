const express = require('express');
const router = express.Router();
const { purchaseAsset } = require('../controllers/purchaseController');

router.post('/purchase', purchaseAsset);

module.exports = router;
