const mongoose = require('mongoose');

let searchSchema = new mongoose.Schema({
    seller_id     : {type: mongoose.Schema.Types.ObjectId, ref: 'seller'},
    query_name    : String, //商家名称或者食物名称
    query_image   : String, //商家图片或者食物图片
    query_type    : Number // 商家 0 ，食物 1
});

mongoose.model('search', searchSchema);