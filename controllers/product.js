require('dotenv').config();
const { Product, Image, Category, User } = require('../models');
const Validator = require('fastest-validator');
const V = new Validator();
const { Op } = require('sequelize');

const mediaHelper = require('../helpers/fileUpload');

module.exports = {
  create: async (req, res) => {
    try {
      //   const schema = {
      //     category_id: 'number|required',
      //     sku: 'string|required',
      //     name: 'string|required',
      //     description: 'string',
      //     weight: 'number',
      //     width: 'number',
      //     length: 'number|required',
      //     height: 'number',
      //     price: 'number|required',
      //   };

      //   const validator = V.validate(req.body, schema);
      //   if (validator.length) {
      //     return res.sendBadRequest('bad request schema');
      //   }

      if (!req.files) {
        const newProduct = await Product.create({
          ...req.body,
          product_owner_id: req.user.id,
          image_id: null,
        });

        return res.sendDataCreated(
          'success create a new product',
          newProduct.dataValues
        );
      }
      const data = JSON.parse(req.body.data);
      const uploadFile = await mediaHelper.fileUpload(req.files);

      const newProduct = await Product.create({
        ...data,
        image_id: uploadFile[0].id,
      });

      return res.sendDataCreated(
        'success create a new product',
        newProduct.dataValues
      );
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  index: async (req, res) => {
    try {
      if (req.query.search) {
        const search = req.query.search;

        const searched = await Product.findAll({
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
          include: [
            { model: Category, attributes: ['name'], as: 'category' },
            { model: Image, attributes: ['url'], as: 'image', required: false },
          ],
        });

        const searchResult = searched.map((item) => {
          return {
            id: item.id,
            category_id: item.category_id,
            category_name: item.category.name,
            sku: item.sku,
            name: item.name,
            description: item.description,
            weight: item.weight,
            width: item.width,
            length: item.length,
            height: item.height,
            image: item.image ? item.image.url : null,
            price: item.price,
            product_owner_id: item.product_owner_id,
          };
        });

        return res.sendJson(200, true, 'success search data', searchResult);
      }

      if (req.query.page) {
        return new Promise(async (resolve, reject) => {
          try {
            const page = parseInt(req.query.page);
            const limit = 5;

            const startIndex = (page - 1) * limit;

            const result = await Product.findAndCountAll({
              limit: limit,
              offset: startIndex,
            });

            return resolve(
              res.sendJson(200, true, 'success get data all product', result)
            );
          } catch (err) {
            return reject(err);
          }
        });
      }

      const data = await Product.findAll({
        order: [['id', 'DESC']],
        include: [
          { model: Category, as: 'category' },
          { model: Image, as: 'image' },
        ],
      });

      const searchResult = data.map((item) => {
        return {
          id: item.id,
          category_id: item.category_id,
          category_name: item.category.name,
          sku: item.sku,
          name: item.name,
          description: item.description,
          weight: item.weight,
          width: item.width,
          length: item.length,
          height: item.height,
          image: item.image ? item.image.url : null,
          price: item.price,
          product_owner_id: item.product_owner_id,
        };
      });

      res.sendJson(200, true, 'success get data all product', searchResult);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  show: async (req, res) => {
    try {
      const product_id = req.params.id;

      const product = await Product.findOne({
        where: {
          id: product_id,
        },
        include: [
          { model: Category, attributes: ['name'], as: 'category' },
          { model: Image, attributes: ['url'], as: 'image', required: false },
        ],
      });

      if (!product) {
        return res.sendNotFound('id product not found');
      }
      const productResult = {
        id: product.id,
        category_id: product.category_id,
        category_name: product.category.name,
        sku: product.sku,
        name: product.name,
        description: product.description,
        weight: product.weight,
        width: product.width,
        length: product.length,
        height: product.height,
        image: product.image ? product.image.url : null,
        price: product.price,
        product_owner_id: product.product_owner_id,
      };

      return res.sendJson(200, true, 'success get data product', productResult);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const currentUser = req.user.id;
      const product_id = req.params.id;

      const checkProductOwner = await Product.findOne({
        where: {
          id: product_id,
        },
      });

      if (currentUser !== checkProductOwner.product_owner_id) {
        return res.sendNotFound("you're not allowed to edit this product");
      }

      const {
        category_id,
        sku,
        name,
        description,
        weight,
        width,
        length,
        height,
        image_id,
        price,
      } = req.body;

      const productId = {
        where: {
          id: product_id,
        },
      };

      const updated = await Product.update(
        {
          category_id,
          sku,
          name,
          description,
          weight,
          width,
          length,
          height,
          image_id,
          price,
        },
        productId
      );

      res.sendJson(200, true, 'success update product', updated);

      if (updated == 0) {
        return res.sendNotFound('id data product not found');
      }
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const currentUser = req.user.id;
      const product_id = req.params.id;

      const checkProductOwner = await Product.findOne({
        where: {
          id: product_id,
        },
      });

      if (currentUser !== checkProductOwner.product_owner_id) {
        return res.sendNotFound("you're not allowed to edit this product");
      }

      const deleted = await Product.destroy({
        where: {
          id: product_id,
        },
      });

      if (!deleted) {
        return res.sendNotFound('id data product not found');
      }

      res.sendJson(200, true, 'success delete data product', deleted);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
};
