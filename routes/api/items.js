const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/items
router.get('/', itemsCtrl.index);
router.get('/:itemId', itemsCtrl.show);
// POST /api/items
router.post('/', itemsCtrl.create);


module.exports = router;