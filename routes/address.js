const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Address = mongoose.model('address');


//根据用户ID查询Address的关联查询
router.post('/getUserAddress', function(req, res) {
    let userid = req.body.userid;
    if (userid) {
        Address.find({user_id: userid}).exec((err,address) => {
            console.log(err,address);
            res.json({
                status: 200,
                address: address
            });
        })
    } else {
        res.json({
            status: 404,
            address: []
        });
    }
});

//新增地址
router.post('/addAddress', function(req, res) {
    let address = req.body.address;
    Address.create(address,function (err, result) {
        if (err) {
            res.json({
                status: 404,
                error: []
            });
        } else {
            res.json({
                status: 200,
                address: address
            });
        }
    });
});

//根据地址ID更新地址
router.post('/updateAddress', function(req, res) {
    let address = req.body.address;
    Address.findByIdAndUpdate({_id: address._id}, address, function (err, address) {
        if (err) {
            res.json({
                status: 404,
                address: []
            });
        } else {
            res.json({
                status: 200,
                address: address
            });
        }
    });
});

//根据地址ID删除地址
router.post('/delectAddress', function(req, res) {
    let addressid = req.body.addressid;
    Address.remove({_id: addressid}, function (err) {
        if (err) {
            res.json({
                status: 404,
                address: []
            });
        } else {
            res.json({
                status: 200,
                address: []
            });
        }
    });
});
module.exports = router;
