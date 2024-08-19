const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertSchema = new Schema({
    chatId: { type: Number, required: true },
    token: { type: String, required: true, },
    threshold: { type: Number, required: true, },
    createdAt: { type: Date, default: Date.now, }
});

module.exports = mongoose.model('Alert', AlertSchema);