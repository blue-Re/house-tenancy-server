/* eslint-disable eqeqeq */
const express = require('express');
const { ownerMenuList, managerMenuList, tenantMenuList } = require('../config/menu');

const router = express.Router();

// const House = require('../model/house');
const User = require('../model/user');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/getMenuList', async (req, res) => {
  const { type } = req.query;
  /*
    1 : 房东
    2 : 租户
    3 ：管理员
  */
  switch (Number(type)) {
    case 1:
      res.send({ code: 0, menuList: ownerMenuList });
      return;
    case 2:
      res.send({ code: 0, menuList: tenantMenuList });
      return;
    case 3:
      res.send({ code: 0, menuList: managerMenuList });
      return;
    default:
      res.send({ code: 1, msg: '获取菜单列表错误' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password, type } = req.body;
  const result = await User.findAll({
    where: {
      username,
      type,
    },
    raw: true,
  });
  if (result.length) {
    res.send({
      code: 1,
      msg: '该类型的用户已注册，重试',
    });
    return;
  }
  await User.create({ username, password, type });
  res.send({
    code: 0,
    msg: '注册成功',
  });
});

router.post('/login', async (req, res) => {
  const { username, password, type } = req.body;

  const user = await User.findOne({
    where: {
      username,
      type,
    },
    raw: true,
  });

  if (
    user.username == username
    && user.password == password
    && user.type == type
  ) {
    const data = { ...user };
    Reflect.deleteProperty(data, 'password');
    res.send({ code: 0, msg: '登录成功！', data });
    return;
  }
  res.send({ code: 1, msg: '用户名或者密码错误' });
});

module.exports = router;
