const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    seller_name: String,
    title: String,
    image: String,
    number: String,
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Product', productSchema);