const express = require('express');

const sequelize = require('sequelize');
const Troubles = require('../model/troubles');

const router = express.Router();

const { Op } = sequelize;

router.post('/createTrouble', async (req, res) => {
  const {
    troubleTitle, troubleContent, houseId, houseTitle,
  } = req.body;
  const createUser = req.cookies.user.username;
  const result = await Troubles.create({
    troubleTitle,
    troubleContent,
    houseId,
    houseTitle,
    createUser,
  });

  if (result.updatedAt) {
    res.send({ code: 0, result, msg: '故障申报成功' });
    return;
  }
  res.send({ code: 1, msg: '故障申报失败' });
});

router.post('/updateTrouble', async (req, res) => {
  const {
    id, troubleTitle, troubleContent, troubleStatus, houseId, houseContent,
  } = req.body;

  if (troubleStatus) {
    const result = await Troubles.update(
      {
        troubleStatus: 2,
      },
      {
        where: { id },
      },
    );
    if (result[0]) {
      res.send({ code: 0, msg: '故障已修复' });
      return;
    }
    res.send({ code: 1, msg: '故障修复失败' });
    return;
  }

  const result = await Troubles.update(
    {
      troubleTitle,
      troubleContent,
      houseId,
      houseContent,
      troubleStatus: 1,
    },
    {
      where: { id },
    },
  );
  if (result[0]) {
    res.send({ code: 0, msg: '更新成功' });
    return;
  }
  res.send({ code: 1, msg: '更新故障信息失败' });
});

router.post('/getTroubleDetail', async (req, res) => {
  const { id } = req.body;

  const {
    troubleTitle, troubleContent, houseId, houseTitle,
  } = await Troubles.findOne({
    where: {
      id: Number(id),
    },
  });

  res.send({
    code: 0,
    data: {
      troubleTitle, troubleContent, houseId, houseTitle,
    },
  });
});

router.post('/getTroubleList', async (req, res) => {
  const listProperties = ['page', 'size', 'total'];
  const { page, size } = req.body;

  const where = {};
  const properties = Object.entries(req.body);

  properties.forEach((prop) => {
    const [key, value] = prop;
    if (!listProperties.includes(key) && value) {
      where[key] = value;
    }
  });
  const { count: total, rows: troubleList } = await Troubles.findAndCountAll({
    where: {
      ...where,
      troubleContent: {
        [Op.like]: `%${where.troubleContent || ''}%`,
      },
      troubleTitle: {
        [Op.like]: `%${where.troubleTitle || ''}%`,
      },
      houseTitle: {
        [Op.like]: `%${where.properties || ''}%`,
      },
    },
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'desc'],
    ],
  });
  res.send({ code: 0, total, troubleList });
});

module.exports = router;
