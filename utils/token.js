const jwt = require('jsonwebtoken');

const secretKey = 'secretKey';

// 获取token
function getToken(payload) {
  const token = `house${jwt.sign({ payload }, secretKey, { expiresIn: 60 * 60 })}`;
  return token;
}

// 验证token
function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log('token 验证失败', err);
      return res.json({ code: '404', msg: 'token无效' });
    }
    console.log('verify decoded', decoded);
    next();
  });
}

module.exports = {
  getToken,
  verifyToken,
};
