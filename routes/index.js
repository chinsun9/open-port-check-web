const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.render('index', { title: 'findip', ip: ip });
});

/* api */
router.all('/api', function (req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip: ip });
});

module.exports = router;
