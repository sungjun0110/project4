const Item = require('../../models/item');

module.exports = {
    create,
    index,
    show,
}

async function create(req, res) {
    try {
        console.log(req.body);
        const item = await Item.create(req.body);
        console.log(item);
    } catch (e) {
        res.status(400).json(e);
    }
}

async function index(req, res) {
    const items = await Item.find({});
    res.json(items);
}

async function show(req, res) {
    const item = await Item.findById(req.params.itemId);
    res.json(item);
}