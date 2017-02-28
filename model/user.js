const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name       : Number,
    password   : String,
    avatar     : String
});

mongoose.model('user', userSchema);