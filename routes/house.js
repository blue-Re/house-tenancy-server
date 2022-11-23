const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');
const House = require('../model/house');

const { Op } = sequelize;

const { getRandomStr } = require('../utils/random');

router.post('/getHouseList', async (req, res) => {
  const {
    page, size, id, title,
  } = req.body;

  const where = {};
  const keys = ['id', 'title'];
  const values = [id, title];

  values.forEach((value, index) => {
    if (value) {
      where[keys[index]] = value;
    }
  });

  const { count: total, rows: houseList } = await House.findAndCountAll({
    where: {
      ...where,
      title: {
        [Op.like]: `%${title}%`,
      },
    },
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'desc'],
    ],
  });
  res.send({ code: 0, total, houseList });
});

router.post('/createHouse', async (req, res) => {
  Reflect.deleteProperty(req.body, 'id');
  const result = await House.create({
    ...req.body,
    houseCode: getRandomStr(),
  });
  if (result.createdAt) {
    res.send({ code: 0, msg: '创建成功' });
    return;
  }
  res.send({ code: 1, msg: '创建失败' });
});

router.post('/updateHouse', async (req, res) => {
  const { id } = req.body;
  Reflect.deleteProperty(req.body, 'id');
  const result = await House.update(
    {
      ...req.body,
    },
    {
      where: { id },
    },
  );

  if (result[0]) {
    res.send({ code: 0, msg: '更新成功' });
    return;
  }
  res.send({ code: 1, msg: '更新失败' });
});

router.post('/getHouseDetail', async (req, res) => {
  const { id } = req.body;

  const data = await House.findOne({
    where: {
      id: Number(id),
    },
  });

  res.send({ code: 0, data });
});

router.post('/deleteHouse', async (req, res) => {
  const { id } = req.body;

  try {
    const result = await House.destroy({
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
