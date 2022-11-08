const express = require('express');

const sequelize = require('sequelize');
const News = require('../model/news');

const router = express.Router();

const { Op } = sequelize;

router.post('/createNews', async (req, res) => {
  const { title, content, author } = req.body;
  const result = await News.create({
    title,
    content,
    author,
  });
  if (result.createdAt) {
    res.send({ code: 0, msg: '创建成功' });
    return;
  }
  res.send({ code: 1, msg: '创建失败' });
});

router.post('/updateNews', async (req, res) => {
  const {
    id, title, content, author, online,
  } = req.body;

  if (online) {
    const result = await News.update(
      {
        online: 2,
      },
      {
        where: { id },
      },
    );
    if (result[0]) {
      res.send({ code: 0, msg: '新闻已下线' });
      return;
    }
    res.send({ code: 1, msg: '下线新闻失败' });
    return;
  }

  const result = await News.update(
    {
      title,
      content,
      author,
    },
    {
      where: { id },
    },
  );
  if (result[0]) {
    res.send({ code: 0, msg: '更新成功' });
    return;
  }
  res.send({ code: 1, msg: '更新新闻失败' });
});

router.post('/getNewsDetail', async (req, res) => {
  const { id } = req.body;

  const { title, content, author } = await News.findOne({
    where: {
      id: Number(id),
    },
  });

  res.send({ code: 0, data: { title, content, author } });
});

router.post('/getNewsList', async (req, res) => {
  const {
    page, size, id, title, content, author,
  } = req.body;

  const where = {};
  const keys = ['id', 'content', 'title', 'author'];
  const values = [id, content, title, author];

  values.forEach((value, index) => {
    if (value) {
      where[keys[index]] = value;
    }
  });

  const { count: total, rows: newsList } = await News.findAndCountAll({
    where: {
      ...where,
      title: {
        [Op.like]: `%${title}%`,
      },
      content: {
        [Op.like]: `%${content}%`,
      },
      author: {
        [Op.like]: `%${author}%`,
      },
    },
    limit: size,
    offset: (page - 1) * size,
    order: [
      ['createdAt', 'desc'],
    ],
  });
  res.send({ code: 0, total, newsList });
});

module.exports = router;
