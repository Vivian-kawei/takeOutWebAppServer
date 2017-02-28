const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = mongoose.model('order');


//根据用户ID查询order和seller的关联查询
router.post('/getUserOrderAndSeller', function(req, res) {
    let userid = req.body.userid;
    if (userid) {
        Order.find({user_id: userid}).populate('seller_id').exec((err,order) => {
            console.log(err,order);
            res.json({
                status: 200,
                order: order
            });
        })
    } else {
        res.json({
            status: 404,
            order: []
        });
    }
});

//新增订单
router.post('/addOrder', function(req, res) {
    let order = req.body.order;
    Order.create(order,function (err, result) {
        if (err) {
            res.json({
                status: 404,
                error: []
            });
        } else {
            res.json({
                status: 200,
                order: order
            });
        }
    });
});

//根据订单ID设置订单状态
router.post('/setOrderStatus', function(req, res) {
    let order = req.body.order;
    Order.findByIdAndUpdate({_id: order._id}, order, function (err, order) {
        if (err) {
            res.json({
                status: 404,
                order: []
            });
        } else {
            res.json({
                status: 200,
                order: order
            });
        }
    });
});

//根据订单ID查询订单状态
router.post('/getOrderstatus', function(req, res) {
    let orderid = req.body.orderid;
    Order.find({_id: orderid}).exec((err,order) => {
        if (err) {
            res.json({
                status: 404,
                order: []
            });
        } else {
            res.json({
                status: 200,
                order: order
            });
        }
    });
});
module.exports = router;