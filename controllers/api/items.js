const Item = require('../../models/item');

module.exports = {
    create,
    index,
    show,
    deleteItem,
    showMine,
}

async function create(req, res) {
    try {
        const item = await Item.create(req.body);
        res.json(item);
    } catch (e) {
        res.status(400).json(e);
    }
}

async function index(req, res) {
    const items = await Item.find({
        user: { $nin: [
            req.params.userId,
            ]},
        $and: [{isExchanging: false}]
        });
    res.json(items);
}

async function show(req, res) {
    const item = await Item.findById(req.params.itemId).populate('user').exec();;
    res.json(item);
}

async function deleteItem(req, res) {
    await Item.findByIdAndDelete(req.params.itemId);
    res.json('');
}

async function showMine(req, res) {
    const items = await Item.find({user: new Object({_id: req.params.userId})});
    res.json(items);
}