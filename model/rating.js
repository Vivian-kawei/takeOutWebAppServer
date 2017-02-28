const mongoose = require('mongoose');

let ratingSchema = new mongoose.Schema({
    seller_id      : {type: mongoose.Schema.Types.ObjectId, ref: 'seller'},
    order_id       : String,
    user_id        : String,
    username       : String,
    rateTime       : Number,
    deliveryTime   : Number,
    score          : Number,
    rateType       : Number,
    text           : String,
    avatar         : String,
    recommend      : [String]
});

mongoose.model('rating', ratingSchema);