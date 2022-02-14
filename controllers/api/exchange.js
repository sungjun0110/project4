const Exchange = require('../../models/exchange');
const Item = require('../../models/item');

module.exports = {
    create,
    getAll,
    acceptExchange,
    deleteExchange,
    getAllCompleted,
}

async function create(req, res) {
    try {
        await Exchange.create(req.body, async function(err, newExchange) {
            await Item.findByIdAndUpdate(newExchange.give, {isExchanging: true}, async function(err, give) {
                await Item.findByIdAndUpdate(newExchange.take, {isExchanging: true},function(err, take) {
                    res.json(newExchange);
                }).clone();
            }).clone();
        });

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

async function getAllCompleted(req, res) {
    try {
        const exchanges = await Exchange.find({
            $or: [
                {giver: req.params.userId},
                {taker: req.params.userId}
            ],
            $and: [
                {isCompleted: true},
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
    await Item.findByIdAndUpdate(giveItem._id, {user: takeItem.user, isExchanging: false}, 
        async function(err, result) {
            await Item.findByIdAndUpdate(takeItem._id, {user: giveItem.user, isExchanging: false}, async function(err, result) {
                await Exchange.findByIdAndUpdate(req.body.exchangeId, {isCompleted: true}, function(err, exchange) {
                    res.json(exchange);
                }).clone();
            }).clone();
        }).clone();
}

async function deleteExchange(req, res) {
    await Exchange.findByIdAndDelete(req.params.exchangeId, async function(err, result) {
        await Item.findByIdAndUpdate(result.give, {isExchanging: false}, async function(err, item1) {
            await Item.findByIdAndUpdate(result.take, {isExchanging: false}, function (err, item2) {
                res.json(result);
            }).clone();
        }).clone();
    }).clone();
}