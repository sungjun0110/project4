const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/items
router.get('/all/:userId', itemsCtrl.index);
router.get('/:itemId', itemsCtrl.show);
router.get('/mine/:userId', itemsCtrl.showMine);
// POST /api/items
router.post('/', itemsCtrl.create);
// DELETE /api/items/
router.delete('/delete/:itemId', itemsCtrl.deleteItem);


module.exports = router;