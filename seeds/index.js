const mongoose = require('mongoose');
const Product = require('../models/product');
const hostel = require('./hostel')
const { descriptors: desc, places: place } = require('./details')
const details = require('./details')
mongoose.connect('mongodb://localhost:27017/collegedeal', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database successfully connected!");
})

function random(array) {
    return array[Math.floor(Math.random() * array.length)]
}




















