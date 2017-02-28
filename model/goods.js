const mongoose = require('mongoose');

let foodSchema = new mongoose.Schema({
    name: String,
    price: Number,
    oldPrice: Number,
    description: String,
    sellCount: Number,
    rating: Number,
    info: String,
    icon: String,
    image: String
});

let goodsSchema = new mongoose.Schema({
    seller_id: {type: mongoose.Schema.Types.ObjectId, ref: 'seller'},
    name: String,
    type: Number,
    foods: [foodSchema]
});

mongoose.model('good', goodsSchema);