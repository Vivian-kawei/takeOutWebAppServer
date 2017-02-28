const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Collect = mongoose.model('collect');


//根据用户ID和商家ID添加商家收藏
router.post('/setUserCollect', function(req, res) {
    let user = req.session.user;
    let sellerid = req.body.sellerid;
    if (user) { 
        let userid = user._id;
        Collect.create({seller_id: sellerid, user_id: userid},function (err, result) {
            if (err) {
                res.json({
                    status: 404,
                    error: []
                });
            } else {
                res.json({
                    status: 200,
                    collect: result
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

//根据用户ID查询收藏的商家的关联查询
router.post('/getUserCollectByUserID', function(req, res) {
    let userid = req.body.userid;
    if (userid) {
        Collect.find({user_id: userid}).populate('seller_id').exec((err,collect) => {
            if (err) {
                res.json({
                    status: 404,
                    error: []
                });
            } else {
                res.json({
                    status: 200,
                    collect: collect
                });
            }
        })
    } else {
        res.json({
            status: 404,
            collect: []
        });
    }
});

//根据用户ID和商家ID查询商家是否被收藏
router.post('/getSellerIsCollectByUserIDAndSellerID', function(req, res) {
    let user = req.session.user;
    let sellerid = req.body.sellerid;
    if (user) { 
        let userid = user._id;
        Collect.find({user_id: userid, seller_id: sellerid}).exec((err,collect) => {
            if (err) {
                res.json({
                    status: 404,
                    error: []
                });
            } else {
                if (collect.length > 0){
                    res.json({
                        status: 200,
                        result: '已收藏'
                    });
                }else{
                    res.json({
                        status: 500,
                        result: '未收藏'
                    })
                }
            }
        })
    } else {
        res.json({
            status: 500,
            result: '未收藏'
        })
    }
});

//根据用户ID和商家ID删除当前的商家收藏
router.post('/removeCollectByUserIDAndSellerID', function(req, res) {
    let user = req.session.user;
    let sellerid = req.body.sellerid;
    if (user) { 
        let userid = user._id;
        Collect.remove({user_id: userid, seller_id: sellerid}).exec((err,collect) => {
            if (err) {
                res.json({
                    status: 404,
                    collect: []
                });
            } else {
                res.json({
                    status: 200,
                    collect: []
                });
            }
        })
    } else {
        res.json({
            status: 500,
            result: '未登录'
        })
    }
});
module.exports = router;
