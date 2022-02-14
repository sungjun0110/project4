const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    description: {type: String, required: true},
    photos: {type: String},
    condition: {type: String, required: true},
    isExchanging: {type: Boolean, default: false},
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);