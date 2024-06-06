const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
    blocked: { type: Boolean, default: false },
    cartData: { type: Object },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
