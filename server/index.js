const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const PaymentProcessor = require('../build/contracts/PaymentProcessor.json');
const { Payment,Item } = require('./db.js');
const { ethers } = require('ethers');

const app = express();

app.use(express.json());
app.use(cors())


app.get('/api/getPaymentId/:ItemId', async(req,res)=>{
    let itemId = req.params.ItemId;
    
    const paymentId = (Math.random() * 7265777566).toFixed(0) + Date.now();
    let payment = new Payment({
        id: paymentId,
        ItemID: itemId,
        paid: false
    })
    await payment.save();
    res.send(paymentId);
});


app.get('/api/getItem/:ItemId', async(req,res) =>{
    let itemId = req.params.ItemId;
    let item = await Item.findOne({id: itemId});
    res.send({Item: item});
});


app.put('/api/updatePayment/:id', async(req,res)=>{
    let paymentid =  req.params.id;
    const payment = await Payment.findOne({id: paymentid});
    if(payment){
        const item = await Item.findOne({id: payment.ItemID});
        payment.paid = true;
        await payment.save();
        res.send({
            url: item.url
        });
    }
});

app.post('/api/addItem', async(req,res) =>{
    let {Url,Owner,Prize} = req.body;
    let ID = Date.now() * 2;

    let item = new Item({
        id: ID,
        url: Url,
        owner: Owner,
        prize: Prize
    });
    await item.save();

    res.send({
       id: ID
    });
});

app.get('/api/getItems', async(req,res)=>{
    let item = await Item.find();
    res.send(item);
})



app.listen(5000,()=>{
    console.log("Listening to Port : 5000");
});


// const listenToEvents = async() =>{
//     const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/1de2c1c15d0c444f995d92341fc47b1c');
//     const network = 5777;

//     const paymentProcessor = new ethers.Contract(
//         PaymentProcessor.networks[network].address,
//         PaymentProcessor.abi,
//         provider
//     );
//     let paymentid;

//     paymentProcessor.on('PaymentDone', async(payer,amount,paymentID,Date)=>{
//         paymentid = paymentID;

//         console.log(`
//         Payer: ${payer}
//         Amount: ${amount}
//         PaymentID: ${paymentID}
//         Date: ${(new Date(Date.toNumber() * 1000)).toLocaleString()}`)
//     })

//     const payment = await Payment.findOne({id: paymentid});
//     if(payment){
//         payment.paid = true;
//         await payment.save();
//     }
// }

// listenToEvents();