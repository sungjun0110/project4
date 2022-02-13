const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
    give: {type: Schema.Types.ObjectId, ref: 'Give'},
    giver: {type: Schema.Types.ObjectId, ref: 'Giver'},
    take: {type: Schema.Types.ObjectId, ref: 'Take'},
    taker: {type: Schema.Types.ObjectId, ref: 'Taker'},
    isCompleted: {type: Boolean, default: false}
}, {
    timestamps: true,
})

module.exports = mongoose.model('Exchange', exchangeSchema);