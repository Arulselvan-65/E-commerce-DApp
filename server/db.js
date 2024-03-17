const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const autoIncrement = require('mongoose-auto-increment');

const app = express();

app.use(express.json());
app.use(cors())


mongoose.connect(
    'mongodb+srv://arul_08:Arul123@cluster0.57wnpn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);


const paymentSchema = new mongoose.Schema({
    id: String,
    ItemID: String,
    paid: Boolean
});

const itemSchema = new mongoose.Schema({
    id: String,
    url: String,
    owner: String,
    prize: String
})


const Payment = new mongoose.model('Payment',paymentSchema);
const Item = new mongoose.model('Item',itemSchema);


module.exports = {
    Payment,
    Item
};