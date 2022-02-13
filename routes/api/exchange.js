const express = require('express');
const router = express.Router();
const exchangeCtrl = require('../../controllers/api/exchange');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// POST /api/exchange
router.post('/', exchangeCtrl.create);

// Get /api/exchange
router.get('/:userId', exchangeCtrl.getAll);

// Put /api/exchange
router.put('/', exchangeCtrl.acceptExchange);

module.exports = router;