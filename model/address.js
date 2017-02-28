const mongoose = require('mongoose');

let addressSchema = new mongoose.Schema({
    user_id       : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    phone         : String,
    address       : String,
    sex           : String,
    name          : String
});

mongoose.model('address', addressSchema);