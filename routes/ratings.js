const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ratings = mongoose.model('rating');


//根据商家ID查询ratings的关联查询
router.get('/getSellerRatings', function(req, res) {
    let seller_id = req.query.seller_id;
    if (seller_id) {
        Ratings.find({seller_id}).exec((err,ratings) => {
            console.log(err,ratings);
            res.json({
                status: 200,
                ratings: ratings
            });
        })
    } else {
        res.json({
            status: 404,
            ratings: []
        });
    }
});

//根据用户ID添加Rating
router.post('/addOrderRating', function(req, res) {
    let user = req.session.user;
    let rating = req.body.rating;
    if (user) { 
        let userid = user._id;
        Ratings.create(rating, function (err, result) {
            if (err) {
                res.json({
                    status: 404,
                    error: []
                });
            } else {
                res.json({
                    status: 200,
                    ratings: result
                });
            }
        });
    } else {
        res.json({
            status: 500,
            result: '请先登录'
        })
    }
});

//根据用户ID查询ratings的关联查询
router.get('/getUserRatingByUserID', function(req, res) {
    let user = req.session.user;
    let userid = user._id;
    if (user) {
        Ratings.find({user_id: userid}).populate('seller_id').exec((err,ratings) => {
            console.log(err,ratings);
            res.json({
                status: 200,
                ratings: ratings
            });
        })
    } else {
        res.json({
            status: 404,
            ratings: []
        });
    }
});

//根据用户ID和订单ID查询订单是否被评论
router.post('/getOrderIsRatedByUserIDAndOrderID', function(req, res) {
    let user = req.session.user;
    let orderid = req.body.orderid;
    if (user) { 
        let userid = user._id;
        Ratings.find({user_id: userid, order_id: orderid}).exec((err,ratings) => {
            if (err) {
                res.json({
                    status: 404,
                    error: []
                });
            } else {
                if (ratings.length > 0){
                    res.json({
                        status: 200,
                        result: '已评论'
                    });
                }else{
                    res.json({
                        status: 500,
                        result: '未评论'
                    })
                }
            }
        })
    } else {
        res.json({
            status: 500,
            result: '未评论'
        })
    }
});

module.exports = router;