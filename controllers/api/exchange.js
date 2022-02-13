const Exchange = require('../../models/exchange');
const Item = require('../../models/item');

module.exports = {
    create,
    getAll,
    acceptExchange,
}

async function create(req, res) {
    try {
        await Exchange.create(req.body);
    } catch (e) {
        res.status(400).json(e);
    }
}

async function getAll(req, res) {
    try {
        const exchanges = await Exchange.find({
            $or: [
                {giver: req.params.userId},
                {taker: req.params.userId}
            ],
            $and: [
                {isCompleted: false},
            ]
        })
        res.json(exchanges);
    } catch (e) {
        res.status(400).json(e);
    }
}

async function acceptExchange(req, res) {
    const giveItem = req.body.giveItem;
    const takeItem = req.body.takeItem;
    await Item.findByIdAndUpdate(giveItem._id, {user: takeItem.user}, 
        async function(err, result) {
            await Item.findByIdAndUpdate(takeItem._id, {user: giveItem.user}, async function(err, result) {
                await Exchange.findByIdAndUpdate(req.body.exchangeId, {isCompleted: true}).clone();
            }).clone();
        }).clone();
}