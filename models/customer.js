const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    account_number: {
        type: Number,
        required: true,
        trim: true,
    },
    account_balance: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
        min: 0,
    }
});

module.exports = mongoose.model("Customer", customerSchema);