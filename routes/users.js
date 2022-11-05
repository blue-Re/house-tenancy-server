const express = require('express');

const router = express.Router();

const User = require('../model/user');

router.post('/register', async (req, res) => {
  const { username, password, type } = req.body;
  const result = await User.findOne({
    username,
    type,
  });
  res.send(result);
  // res.send('respond with a resource');
});

module.exports = router;
