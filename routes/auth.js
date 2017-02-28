const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('user');


// 是否已登录状态
router.post('/isLogin', function(req, res) {
    let user = req.session.user;
    if(user){
        res.json({
            status : 200,
            result : user
        });
    }else{
        let token = req.cookies['jwt'];
        if(token){
            jwt.verify(token, 'ljh', function(err, decoded) {
                if(!err){
                    req.session.user = user = decoded.user;
                    res.json({
                        status : 200,
                        result : user
                    });
                }else{
                    res.json({
                        status : 500,
                        result : "请先登录"
                    });
                }
            });
        }else{
            res.json({
                status : 500,
                result : "请先登录"
            });
        }
        
    }
});

// 登录用户操作
router.post('/doLogin', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // 验空
    if(username && password){
        // 是否符合规格（手机号）
        if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(username)){
            // 查询用户名相等的用户记录
            User.find({name: username}).exec((err,user) => {
                // 判断查询结果个数：小于一则用户不存在；大于一则不唯一，属于非法手段
                if(user.length === 1 ){
                    // 等于一时，对比传入密码与查询结果的密码是否符合，符合则登录；如果不符合，就是密码错误
                    user = user[0];
                    if(user.password === password) {
                        // 把验证成功用户信息存入session和cookie（jwt）
                        req.session.user = user; //session设置
                        //jwt
                        let expiry = new Date();
                        expiry.setDate(expiry.getDate() + 7);
                        let token = jwt.sign({
                            _id: user._id,
                            user: user,
                            exp: parseInt(expiry.getTime() / 1000) //秒 ，判断令牌的有效时间
                        },'ljh');
                        let cookieConfig = { httpOnly: true, expires: expiry }; // cookies的有效时间
                        res.cookie('jwt', token, cookieConfig); //cookise设置
                        res.json({
                            status: 200,
                            result: "登录成功"
                        });
                    } else {
                        res.json({
                            status: 500,
                            result: "密码不正确"
                        });
                    }
                } else {
                    res.json({
                        status: 500,
                        result: "用户名不存在"
                    });
                }
            })

        } else {
            res.json({
                status: 500,
                result: "请输入正确手机号"
            });
        }

            
    } else {
        res.json({
            status: 500,
            result: "填写信息不完整"
        });
    }
});

// 注册用户操作
router.post('/doRegister', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // 验空
    if(username && password){
        // 是否符合规格（手机号）
        if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(username)  && username.length === 11){
            // 等于零时，对比传入密码是否符合
            if(/^[a-zA-Z0-9]{6,10}$/.test(password)) {
                // 查询用户名的用户记录
                User.find({name: username}).exec((err,user) => {
                    // 判断查询结果个数：等于零则用户不存在；大于零则已存在，重新输入
                    if(user.length === 0 ){
                        let users = {
                            name       : username,
                            password   : password,
                            avatar     : "https://fuss10.elemecdn.com/7/6d/d01494d8cf5ad560a6d35f405b638jpeg.jpeg",
                            collect    : []
                        };
                        User.create(users,function (err, result) {
                            if (err) {
                                res.json({
                                    status: 200,
                                    error: err
                                });
                            } else {
                                res.json({
                                    status: 200,
                                    result: "注册成功"
                                });
                            }
                        });             
                    } else {
                        res.json({
                            status: 500,
                            result: "用户名已存在"
                        });
                    }
                });
            } else {
                res.json({
                    status: 500,
                    result: "请输入6~10位数字或字母的密码"
                });
            }
        } else {
            res.json({
                status: 500,
                result: "请输入正确手机号"
            });
        }
    } else {
        res.json({
            status: 500,
            result: "填写信息不完整"
        });
    }
    
});

// 退出登录操作
router.post('/exit', function(req, res) {
    try{
        delete req.session.user;
        req.cookies['jwt'] ? res.clearCookie("jwt", {path: '/'}) : null;
        res.json({
            status : 200,
            result : "退出成功"
        });
    }catch(e){
        res.json({
            status : 500,
            error : "内部错误"
        });
    }
});

module.exports = router;
