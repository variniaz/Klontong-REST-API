require('dotenv').config();
const { User } = require('../models');
const Validator = require('fastest-validator');
const V = new Validator();
const { Op } = require('sequelize');

module.exports = {
  findAll: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] },
      });
      if (users.length === 0) {
        return res.sendNotFound('user not found.');
      }

      res.sendJson(200, true, 'success find all data', users);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  showProfile: async (req, res) => {
    try {
      const user_id = req.user.id;

      const user = await User.findOne({
        where: {
          id: user_id,
        },
      });

      if (!user) {
        return res.sendNotFound('id user not found');
      }
      const showUser = {
        username: user.username,
        name: user.name,
        email: user.email,
      };

      return res.sendJson(200, true, 'success get data user', showUser);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  update: async (req, res) => {
    try {
      const currentUser = req.user;
      const { username, name, email, password } = req.body;

      const user = await User.findOne({ where: { id: currentUser.id } });
      if (!user) {
        return res.sendNotFound('user not found');
      }

      const userId = {
        where: {
          id: currentUser.id,
        },
      };

      const updatedUser = await User.update(
        {
          username,
          name,
          email,
          password,
        },
        userId
      );

      if (updatedUser == 0) {
        return res.sendNotFound('field not found');
      }
      return res.sendJson(200, true, 'success update user', updatedUser);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
  delete: async (req, res) => {
    try {
      const user_id = req.params.id;

      if (user_id !== req.user.id) {
        return res.sendBadRequest("you can't delete this user");
      }

      const deleted = await User.destroy({
        where: {
          id: user_id,
        },
      });

      if (!deleted) {
        return res.sendNotFound('id data user not found');
      }

      res.sendJson(200, true, 'success delete data user', deleted);
    } catch (err) {
      return res.sendServerError(err.message);
    }
  },
};
