const Schema = require('mongoose').Schema;

const itemSchema = new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
}, {
    timestamps: true
});

module.export = itemSchema;