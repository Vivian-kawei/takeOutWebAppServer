const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Search = mongoose.model('search');


//根据商家名称或商品名称关联查询
router.post('/search', function(req, res) {
  let q = req.body.q;
  let lastResult = {};
  if (q) {
    Search.find({query_name: new RegExp(q, 'g')}).populate('seller_id').exec(function (err, results) {
      if (err) {
          res.json({error: err});
      } else {
        results.forEach((result, index) => {

          if (!!result.query_image) {
            let seller_id = result.seller_id._id;
            if (!lastResult[seller_id]) {
              lastResult[seller_id] = {seller: null, foods: []};
            }
            if(result.query_type === 0) {
              lastResult[seller_id].seller = result.seller_id;
            }else {
              lastResult[seller_id].foods.push(result);
            }
          }

          result.query_name = result.query_name.replace(new RegExp(q, "g"), '<span style="color: red;">'+ q +'</span>')

        });

        res.json({results: lastResult});
      }
    });
  } else {
    res.json({error: '请输入关键字'});
  }
});

module.exports = router;
