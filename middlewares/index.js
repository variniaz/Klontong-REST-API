const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { response } = require('../helpers/responses');

function verifyToken(reqToken) {
  const bearer = reqToken.split(' ');
  const token = bearer[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  return decoded;
}

module.exports = {
  login: async (req, res, next) => {
    try {
      const reqToken = req.headers['authorization'];
      if (!reqToken) {
        return res.status(401).json({
          status: false,
          message: "you're not authorized!",
          data: null,
        });
      }

      req.user = verifyToken(reqToken);

      const findUser = await User.findOne({
        where: { email: req.user.email },
      });

      // console.log(findUser.password);
      if (findUser.password == null) {
        return res.status(401).json({
          status: false,
          message: 'please set your password before using this app',
          data: null,
        });
      }

      next();
    } catch (err) {
      if (
        err.message == 'jwt malformed' ||
        err.message == 'jwt expired' ||
        err.message == 'invalid signature' ||
        err.message == 'invalid token'
      ) {
        return res.sendJwtError(err.message);
      }

      return res.status(500).json({
        status: false,
        message: err.message,
        data: null,
      });
    }
  },
};
