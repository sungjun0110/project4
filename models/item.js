const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
    photos: {type: String},
}, {
    timestamps: true
});


module.exports = mongoose.model('Item', itemSchema);