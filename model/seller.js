const mongoose = require('mongoose');

let supportSchema = new mongoose.Schema({
    type: String,
    description: String
});

let sellerSchema = new mongoose.Schema({
    name: String,
    description: String,
    deliveryTime: Number,
    serviceScore: Number,
    foodScore: Number,
    rankRate: Number,
    minPrice: Number,
    deliveryPrice: Number,
    ratingCount: Number,
    sellCount: Number,
    bulletin: String,
    supports: [supportSchema],
    avatar: [String],
    pics: [String],
    infos: String,
    sellerType: Number
});

mongoose.model('seller', sellerSchema);