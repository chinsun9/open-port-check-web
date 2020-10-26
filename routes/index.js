const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  res.render('index', { title: 'Express', ip: ip });
});

module.exports = router;
