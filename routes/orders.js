const express = require('express');

const router = express.Router();

const sequelize = require('sequelize');
const Orders = require('../model/orders');

const { Op } = sequelize;

router.post('/getOrderList', async (req, res) => {
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
  const { count: total, rows: orderList } = await Orders.findAndCountAll({
    where: {
      ...where,
      tenantName: {
        [Op.like]: `%${where.tenantName || ''}%`,
      },
      ownerName: {
        [Op.like]: `%${where.ownerName || ''}%`,
      },
      houseTitle: {
        [Op.like]: `%${where.houseTitle || ''}%`,
      },
    },
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'desc'],
    ],
  });
  res.send({ code: 0, total, orderList });
});

router.post('/createOrder', async (req, res) => {
  const result = await Orders.create(req.body);

  if (result.createdAt) {
    res.send({ code: 0, result, msg: '创建订单成功！' });
    return;
  }

  res.send({ code: 1, result, msg: '创建订单失败！' });
});

router.post('/updateOrder', async (req, res) => {
  const {
    id, orderStatus, tenantId, tenantName, ownerId, ownerName, houseId, houseTitle,
  } = req.body;

  if (orderStatus) {
    const result = await Orders.update(
      {
        orderStatus: 2,
      },
      {
        where: { id },
      },
    );
    if (result[0]) {
      res.send({ code: 0, msg: '订单已结束' });
      return;
    }
    res.send({ code: 1, msg: '订单结束失败' });
    return;
  }

  const result = await Orders.update(
    {
      tenantId,
      tenantName,
      ownerId,
      ownerName,
      houseId,
      houseTitle,
      orderStatus: 1,
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

router.post('/getOrderDetail', async (req, res) => {
  const { id } = req.body;

  const {
    tenantId, tenantName, ownerId, ownerName, houseId, houseTitle,
  } = await Orders.findOne({
    where: {
      id: Number(id),
    },
  });

  res.send({
    code: 0,
    data: {
      tenantId, tenantName, ownerId, ownerName, houseId, houseTitle,
    },
  });
});
module.exports = router;
