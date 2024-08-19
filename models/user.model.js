const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    telegramId: { type: Number, required: true, unique: true },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    registeredAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;