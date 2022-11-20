const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');

const User = require('../model/user');

const { Op } = sequelize;

router.post('/getUserList', async (req, res) => {
  const {
    page, size, id, username, type,
  } = req.body;

  const where = {};
  const keys = ['id', 'username', 'type'];
  const values = [id, username, type];

  values.forEach((value, index) => {
    if (value) {
      where[keys[index]] = value;
    }
  });

  const { count: total, rows: userList } = await User.findAndCountAll({
    raw: true,
    where: {
      ...where,
      username: {
        [Op.like]: `%${username || ''}%`,
      },
    },
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'desc'],
    ],
  });
  userList.forEach((user) => {
    Reflect.deleteProperty(user, 'password');
  });
  res.send({ code: 0, total, userList });
});

router.post('/deleteUser', async (req, res) => {
  const { id } = req.body;

  try {
    const result = await User.destroy({
      where: { id },
    });
    if (result) {
      res.send({ code: 0, msg: '操作成功！' });
      return;
    }
    res.send({ code: 1, msg: '操作失败！' });
  } catch (error) {
    res.send({ code: 1, msg: error.msg });
  }
});

module.exports = router;
