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
  res.send({ code: 0, result });
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
  });
  res.send({ code: 0, total, newsList });
});

module.exports = router;
