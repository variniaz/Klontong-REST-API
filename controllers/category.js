require('dotenv').config();
const { Product, Category, User, Image } = require('../models');
const Validator = require('fastest-validator');
const V = new Validator();
const { Op } = require('sequelize');

module.exports = {
  create: async (req, res) => {
    try {
      const schema = {
        name: 'string|required',
      };

      const validator = V.validate(req.body, schema);
      if (validator.length) {
        return res.sendBadRequest('bad request schema');
      }

      const newCategory = await Category.create({
        ...req.body,
      });

      return res.sendDataCreated(
        'success create a new category',
        newCategory.dataValues
      );
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  index: async (req, res) => {
    try {
      const categories = await Category.findAll({
        order: [['id', 'DESC']],
      });
      if (categories.length === 0) {
        return res.sendNotFound('category not found.');
      }

      res.sendJson(200, true, 'success find all data', categories);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },

  showProductCategory: async (req, res) => {
    try {
      const category_id = req.params.id;

      const data = await Product.findAll({
        order: [['id', 'DESC']],
        include: [
          { model: Category, as: 'category' },
          { model: Image, as: 'image' },
        ],
        where: {
          category_id: category_id,
        },
      });

      res.sendJson(200, true, 'success get data all product', data);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const category_id = req.params.id;
      const { name } = req.body;

      const categoryId = {
        where: {
          id: category_id,
        },
      };

      const updated = await Category.update(
        {
          name,
        },
        categoryId
      );

      res.sendJson(200, true, 'success update category', updated);

      if (updated == 0) {
        return res.sendNotFound('id data category not found');
      }
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const category_id = req.params.id;

      const deleted = await Category.destroy({
        where: {
          id: category_id,
        },
      });

      if (!deleted) {
        return res.sendNotFound('id data category not found');
      }

      res.sendJson(200, true, 'success delete data category', deleted);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
};
