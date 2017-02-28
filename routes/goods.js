const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Goods = mongoose.model('good');


//根据商家ID查询Goods的关联查询
router.all('/getSellerAndGoods', function(req, res) {
    let seller_id = req.query.seller_id;
    if (seller_id) {
        Goods.find({seller_id}).populate('seller_id').exec((err,goods) => {
            console.log(err,goods);
            res.json({
                status: 200,
                goods: goods
            });
        })
    } else {
        res.json({
            status: 404,
            goods: []
        });
    }
});

module.exports = router;
