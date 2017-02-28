const mongoose = require('mongoose');

let foodSchema = new mongoose.Schema({
    name       : String,
    count      : Number,
    price      : Number
});

let orderSchema = new mongoose.Schema({
    seller_id      : {type: mongoose.Schema.Types.ObjectId, ref: 'seller'},
    user_id        : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    orderTime      : Number,
    foods          : [foodSchema],
    sumPrice       : Number,
    address        : String,
    status         : Number,
    deliveryTime   : Number
});

mongoose.model('order', orderSchema);