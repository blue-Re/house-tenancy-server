const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');
const House = require('../model/house');

const { Op } = sequelize;

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

module.exports = router;
