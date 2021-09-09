const express = require("express");
const { createCustomer, getAllCustomers, createTransaction, getSenderById, getReceiverById, getCustomer, getTransactions } = require("../controller/transaction");
const { check } = require('express-validator');
const router = express.Router();

// Params
router.param("senderId", getSenderById);
router.param("receiverId", getReceiverById);


// Actual Routes

// Create
router.post('/create/customer',  [
    check("name", "Please Enter Your Name").isLength({ min: 1 }),
    check("email", "Please Enter A Valid Email").isEmail(),
    check("account_balance", "Your Balance can not be negative" ).isInt({ gt: -1 }),
  ],createCustomer)

// Read
router.get('/customers', getAllCustomers);
router.get('/customer/sender/:senderId', getCustomer);
router.get('/transactions', getTransactions);

// Update
router.put('/transfer/:senderId/:receiverId', createTransaction);

module.exports = router;