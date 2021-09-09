const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    sender_name: {
        type: String,
        required: true
    },
    receiver_name: {
        type: String,
        required: true
    },
    transaction_amount: {
        type: Number,
        required: true,
        trim: true
    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    }
});

module.exports = mongoose.model("Transactions", transactionSchema);