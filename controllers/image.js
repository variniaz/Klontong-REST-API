require('dotenv').config();
const { Image } = require('../models');
const Validator = require('fastest-validator');
const V = new Validator();
const { Op } = require('sequelize');

module.exports = {
  findAll: async (req, res) => {
    try {
      const images = await Image.findAll({
        attributes: { exclude: ['password'] },
      });
      if (images.length === 0) {
        return res.sendNotFound('image not found');
      }

      res.sendJson(200, true, 'success find all data', images);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  show: async (req, res) => {
    try {
      const image = await Image.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!image) {
        return res.sendNotFound('id image not found');
      }

      return res.sendJson(200, true, 'success get data image', image);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const image_id = req.params.id;
      const { alt } = req.body;

      const image = await Image.findOne({ where: { id: image_id } });
      if (!image) {
        return res.sendNotFound('image not found');
      }

      const imageId = {
        where: {
          id: image_id,
        },
      };

      const updatedImage = await Image.update(
        {
          alt,
        },
        imageId
      );

      if (updatedImage == 0) {
        return res.sendNotFound('field not found');
      }
      return res.sendJson(200, true, 'success update image alt', updatedImage);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const image_id = req.params.id;

      const deleted = await Image.destroy({
        where: {
          id: image_id,
        },
      });

      if (!deleted) {
        return res.sendNotFound('id data image not found');
      }

      res.sendJson(200, true, 'success delete data image', deleted);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
};
