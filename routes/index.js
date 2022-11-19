/* eslint-disable eqeqeq */
const express = require('express');
const { ownerMenuList, managerMenuList, tenantMenuList } = require('../config/menu');
const { getToken } = require('../utils/token');

const router = express.Router();

const User = require('../model/user');
const Troubles = require('../model/troubles');

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
  const token = getToken(username);

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
    const data = { ...user, token };
    Reflect.deleteProperty(data, 'password');
    res.cookie('user', data, { maxAge: 60 * 60 * 24 * 1000 });
    res.send({
      code: 0, msg: '登录成功！', data,
    });
    return;
  }
  res.send({ code: 1, msg: '用户名或者密码错误' });
});

router.get('/reduceUserData', async (req, res) => {
  const { count, rows } = await User.findAndCountAll();
  const owner = [];
  const tenant = [];
  const manager = [];

  if (!count) {
    res.send({ code: 1, msg: '用户量统计数据获取失败！' });
    return;
  }

  rows.forEach((item) => {
    Reflect.deleteProperty(item, 'password');

    switch (item.type) {
      case 1:
        owner.push(item);
        break;
      case 2:
        tenant.push(item);
        break;
      case 3:
        manager.push(item);
        break;
      default:
    }
  });

  const data = [
    { name: '房东', value: owner.length },
    { name: '租户', value: tenant.length },
    { name: '管理员', value: manager.length },
  ];
  res.send({ code: 0, data });
});

router.get('/reduceTroubleData', async (req, res) => {
  const { count, rows } = await Troubles.findAndCountAll();

  if (!count) {
    res.send({ code: 1, msg: '故障统计信息为零或系统错误' });
    return;
  }

  res.send({ code: 0, rows });
});

module.exports = router;
