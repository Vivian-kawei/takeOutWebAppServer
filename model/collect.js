const mongoose = require('mongoose');

let collectSchema = new mongoose.Schema({
    user_id       : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    seller_id     : {type: mongoose.Schema.Types.ObjectId, ref: 'seller'}
});

mongoose.model('collect', collectSchema);