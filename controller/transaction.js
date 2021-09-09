const Customer = require('../models/customer');
const Transaction = require('../models/transaction');
const { validationResult } = require('express-validator');

// Load Chance
const Chance = require('chance')

// Instantiate Chance so it can be used
const chance = new Chance();

exports.getSenderById = (req, res, next, id) => {
    Customer.findById(id)
        .exec((err, sender) => {
            if (err || !sender) return res.status(400).json({ error: "No User Exist" });
            req.sender = sender;
            next();
        })
}

exports.getReceiverById = (req, res, next, id) => {
    Customer.findById(id)
        .exec((err, receiver) => {
            if (err || !receiver) return res.status(400).json({ error: "No User Exist" });
            req.receiver = receiver;
            next();
        })
}


// Create User

exports.createCustomer = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        });
    }

    Customer.findOne({ $or: [{ email: req.body.email }, { account_number: req.body.account_number }] })
        .exec((err, customer) => {
            if (err) return res.status(400).json({ error: "Something went wrong", err });
            if (customer) return res.status(400).json({ error: "User Already exists!" });

            // Using chance to create a random account number
            const account_number = chance.string({ length: 10, alpha: false, numeric: true });
            const { name, email, account_balance } = req.body;

            const _customer = new Customer({
                name,
                email,
                account_number: parseInt(account_number),
                account_balance: parseInt(account_balance),
            })

            _customer.save((err, data) => {
                if (err) return res.status(400).json({ error: "Failed To Add Customer!", err })
                if (data) return res.status(201).json({ message: "Customer Added Successully!", data })
            })

        })
}

// Read Data

exports.getAllCustomers = (req, res) => {
    Customer.find({})
        .exec((err, customerList) => {
            if (err) return res.status(400).json({ error: "Failed to load Customers List" });
            return res.status(200).json({ customerList })
        })
}

exports.getCustomer = (req, res) => {
    return res.status(200).json({ customer: req.sender })
}

exports.getTransactions = (req, res) => {
    Transaction.find({})
        .exec((err, transactionHistory) => {
            if (err) return res.status(400).json({ error: "Failed to load Transaction" });
            return res.status(200).json({ transactionHistory });
        })
}


// Transaction Logic
exports.createTransaction = (req, res) => {
    const transferAmount = parseInt(req.body.transferAmount);
    let updatedBalanceForSender = req.sender.account_balance - transferAmount;
    let updatedBalanceForReceiver = req.receiver.account_balance + transferAmount;

    Customer.findByIdAndUpdate(
        { _id: req.sender._id },
        { account_balance: updatedBalanceForSender },
        { new: true, useFindAndModify: false },
        (err, updatedSender) => {
            if (err) return res.status(400).json({ error: "Transaction Failed!" })
        })

    Customer.findByIdAndUpdate(
        { _id: req.receiver._id },
        { account_balance: updatedBalanceForReceiver },
        { new: true, useFindAndModify: false },
        (err, updatedReceiver) => {
            if (err) return res.status(400).json({ error: "Transaction Failed!" })
        })

    const _transact = new Transaction({
        sender_name: req.sender.name,
        receiver_name: req.receiver.name,
        transaction_amount: transferAmount
    })

    _transact.save((err, transaction) => {
        if(err) return res.status(400).json({ error: "Failed To Save Transaction Data!" })
        return res.status(200).json({ message: "Transaction Completed!" });
    })
}